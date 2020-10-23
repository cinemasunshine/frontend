/**
 * ルーティング
 */
import { Application, NextFunction, Request, Response } from 'express';
import * as moment from 'moment';
import * as path from 'path';
import { signInRedirect } from '../controllers/authorize/authorize.controller';
import { authorizeRouter, masterRouter, purchaseRouter } from './api';

function defaultSetting(req: Request, res: Response, next: NextFunction) {
    res.locals.NODE_ENV = process.env.NODE_ENV;
    res.locals.PORTAL_SITE_URL = process.env.PORTAL_SITE_URL;
    res.locals.APP_SITE_URL = process.env.APP_SITE_URL;
    res.locals.isApp = ((<Express.Session>req.session).awsCognitoIdentityId !== undefined);
    next();
}

export default (app: Application) => {
    app.set('layout', 'layouts/layout');
    app.use(defaultSetting);
    // API
    app.use('/api/purchase', purchaseRouter);
    app.use('/api/master', masterRouter);
    app.use('/api/authorize', authorizeRouter);
    app.get('/api/config', (_req, res) => {
        res.json({ scheduleApiEndpoint: process.env.SCHEDULE_API_ENDPOINT });
    });
    app.get('/api/serverTime', (_req, res) => {
        res.json({ date: moment().toISOString() });
    });

    // 照会
    app.get('/inquiry/login', (req: Request, res: Response) => {
        if (req.query.reserve === undefined) {
            res.redirect(`/#/inquiry/${req.query.theater}/login`);
            return;
        }
        res.redirect(`/#/inquiry/${req.query.theater}/${req.query.reserve}/login`);
    });
    // 発券方法説明
    app.get('/method/ticketing', (_req, res) => {
        res.render('method/ticketing');
    });
    // サインイン
    app.get('/signIn', signInRedirect);
    // 購入
    app.get('/purchase/transaction', (req: Request, res: Response) => {
        const params = Object.keys(req.query).map((key) => `${key}=${req.query[key]}`).join('&');
        res.redirect(`/?${params}`);
    });
    // root
    app.get('/', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/${process.env.NODE_ENV}/index.html`));
    });
    // Not Found
    app.use((_req: Request, res: Response) => {
        res.status(404);
        res.render('notfound/index');
    });
    app.use((err: Error, _req: Request, res: Response) => {
        res.status(422);
        res.locals.error = err;
        res.render('error/index');
    });
};
