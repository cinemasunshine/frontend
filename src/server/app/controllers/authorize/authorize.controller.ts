/**
 * authorize
 */
import { FlgMember } from '@motionpicture/coa-service/lib/services/reserve';
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { AuthModel } from '../../models/auth/auth.model';
import { Auth2Model } from '../../models/auth2/auth2.model';
import { errorProsess } from '../base/base.controller';
const log = debug('sskts-frontend:authorize');

export async function getCredentials(req: Request, res: Response) {
    log('getCredentials');
    try {
        let authModel;
        const clientId = req.body.clientId;
        if (req.body.member === FlgMember.NonMember) {
            authModel = new AuthModel(clientId);
        } else if (req.body.member === FlgMember.Member) {
            authModel = new Auth2Model({ clientId, session: (<Express.Session>req.session).auth });
        } else {
            throw new Error('member does not macth MemberType');
        }
        const options = {
            endpoint: (<string>process.env.SSKTS_API_ENDPOINT),
            auth: authModel.create()
        };
        const accessToken = await options.auth.getAccessToken();
        const credentials = {
            accessToken: accessToken
        };

        res.json({
            credentials,
            clientId: options.auth.options.clientId
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
    if (req.session === undefined || req.body.clientId === undefined) {
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
