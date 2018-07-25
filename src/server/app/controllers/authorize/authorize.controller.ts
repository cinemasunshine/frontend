/**
 * authorize
 */
import { FlgMember } from '@motionpicture/coa-service/lib/services/reserve';
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { AuthModel } from '../../models/auth/auth.model';
import { Auth2Model } from '../../models/auth2/auth2.model';
import { MocoinAuth2Model } from '../../models/mocoin-auth2/mocoin-auth2.model';
import { errorProsess } from '../base/base.controller';
const log = debug('sskts-frontend:authorize');

export async function getCredentials(req: Request, res: Response) {
    log('getCredentials');
    try {
        let authModel;
        if (req.query.member === FlgMember.NonMember) {
            authModel = new AuthModel();
        } else if (req.query.member === FlgMember.Member) {
            authModel = new Auth2Model((<Express.Session>req.session).auth);
        } else {
            throw new Error('member does not macth MemberType');
        }
        log('getCredentials MemberType', req.query.member);
        const options = {
            endpoint: (<string>process.env.SSKTS_API_ENDPOINT),
            auth: authModel.create()
        };
        const accessToken = await options.auth.getAccessToken();
        const credentials = {
            accessToken: accessToken
        };

        res.json(credentials);
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
    log('signIn');
    if (req.session === undefined) {
        throw new Error('session is undefined');
    }
    delete req.session.auth;
    const authModel = new Auth2Model(req.session.auth);
    const auth = authModel.create();
    const authUrl = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier
    });
    delete req.session.auth;
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
    log('signInRedirect');
    try {
        if (req.session === undefined) {
            throw new Error('session is undefined');
        }
        const authModel = new Auth2Model(req.session.auth);
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

/**
 * エンタメコイン サインイン処理
 * @param {Request} req
 * @param {Response} res
 */
export async function mocoinSignIn(req: Request, res: Response) {
    log('mocoinSignIn');
    if (req.session === undefined) {
        throw new Error('session is undefined');
    }
    delete req.session.mocoin;
    const authModel = new MocoinAuth2Model(req.session.mocoin);
    const auth = authModel.create();
    const authUrl = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier
    });
    delete req.session.mocoin;
    res.json({
        url: authUrl
    });
}

/**
 * エンタメコイン サインインリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function mocoinSignInRedirect(req: Request, res: Response, next: NextFunction) {
    log('mocoinSignInRedirect');
    try {
        if (req.session === undefined) {
            throw new Error('session is undefined');
        }
        const authModel = new MocoinAuth2Model(req.session.mocoin);
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
        res.redirect('/#/mocoin/signin');
    } catch (err) {
        next(err);
    }
}
