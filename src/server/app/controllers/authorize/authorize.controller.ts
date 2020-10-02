/**
 * authorize
 */
import { FlgMember } from '@motionpicture/coa-service/lib/factory/master';
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment-timezone';
import { AuthModel } from '../../models/auth/auth.model';
import { Auth2Model } from '../../models/auth2/auth2.model';
import { errorProsess } from '../base/base.controller';
const log = debug('sskts-frontend:authorize');

export function getEndpoint(req: Request) {
    if (process.env.CHANGE_API_TIME !== undefined
        && process.env.CHANGE_API_TIME !== ''
        && process.env.CHANGE_API_THEATERS !== undefined
        && process.env.CHANGE_API_THEATERS !== '') {
        log('CHANGE_API');
        const changeApiTime = process.env.CHANGE_API_TIME.trim().split(',');
        const now = moment().tz('Asia/Tokyo').unix();
        const start = moment(changeApiTime[0]).tz('Asia/Tokyo').unix();
        const end = moment(changeApiTime[1]).tz('Asia/Tokyo').unix();
        const theaters = process.env.CHANGE_API_THEATERS.trim().split(',');
        const findResult = theaters.find(t => t === req.body.branchCode);
        log('CHANGE_API_TIME',
            moment().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm'),
            moment(changeApiTime[0]).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm'),
            moment(changeApiTime[1]).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm'));
        log('CHANGE_API_THEATERS', theaters, findResult);
        if (findResult !== undefined && start < now && end > now) {
            log('SSKTS_API_ENDPOINT_2');
            return <string>process.env.SSKTS_API_ENDPOINT_2;
        }
    }

    return <string>process.env.SSKTS_API_ENDPOINT;
}

export async function getCredentials(req: Request, res: Response) {
    log('getCredentials', req.body);
    try {
        let authModel;
        let userName;
        const endpoint = getEndpoint(req);
        const clientId = req.body.clientId;
        if (req.body.member === FlgMember.NonMember) {
            authModel = new AuthModel(clientId);
        } else if (req.body.member === FlgMember.Member) {
            authModel = new Auth2Model({ clientId, session: (<Express.Session>req.session).auth });
        } else {
            throw new Error('member does not macth MemberType');
        }
        const options = {
            endpoint,
            auth: authModel.create()
        };
        const accessToken = await options.auth.getAccessToken();
        if (req.body.member === FlgMember.Member) {
            userName = options.auth.verifyIdToken(<any>{}).getUsername();
        }
        const projectId = <string>process.env.PROJECT_ID;

        res.json({
            credentials: { accessToken: accessToken, expiryDate: options.auth.credentials.expiry_date },
            clientId: options.auth.options.clientId,
            endpoint,
            userName,
            projectId
        });
    } catch (err) {
        errorProsess(res, err);
    }
}


/**
 * サインイン処理
 * @param {Request} req
 * @param {Response} res
 */
export async function signIn(req: Request, res: Response) {
    log('signIn', req.body.clientId);
    if (req.session === undefined) {
        res.status(400);
        res.json();
        return;
    }
    delete req.session.auth;
    const clientId = req.body.clientId;
    const authModel = new Auth2Model({ clientId, session: req.session.auth });
    authModel.save(req.session);
    const auth = authModel.create();
    const authUrl = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier
    });
    res.json({
        url: authUrl
    });
}

/**
 * サインインリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function signInRedirect(req: Request, res: Response, next: NextFunction) {
    log('signInRedirect', req.query);
    try {
        if (req.session === undefined) {
            throw new Error('session is undefined');
        }

        const authModel = new Auth2Model({ session: req.session.auth });
        if (req.query.state !== authModel.state) {
            throw (new Error(`state not matched ${req.query.state} !== ${authModel.state}`));
        }
        const auth = authModel.create();
        const credentials = await auth.getToken(
            req.query.code,
            <string>authModel.codeVerifier
        );
        // log('credentials published', credentials);

        authModel.credentials = credentials;
        authModel.save(req.session);

        auth.setCredentials(credentials);
        res.redirect('/#/auth/signin');
    } catch (err) {
        next(err);
    }
}
