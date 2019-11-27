/**
 * ルーティング
 */
import { Application, NextFunction, Request, Response } from 'express';
import * as moment from 'moment';
import * as path from 'path';
import { signInRedirect } from '../controllers/authorize/authorize.controller';
import { getTemplate } from '../controllers/mail/mail.controller';
import authorizeRouter from './authorize';
import masterRouter from './master';
import methodRouter from './method';
import purchaseRouter from './purchase';

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
    app.use('/api/purchase', purchaseRouter);
    app.use('/api/master', masterRouter);
    app.use('/api/authorize', authorizeRouter);
    app.post('/api/mail/template', getTemplate);
    app.get('/api/config', (_req, res) => { res.json({ scheduleApiEndpoint: process.env.SCHEDULE_API_ENDPOINT }); });
    app.get('/api/serverTime', (_req, res) => { res.json({ date: moment().toISOString() }); });
    app.get('/inquiry/login', (req: Request, res: Response) => {
        if (req.query.reserve === undefined) {
            res.redirect(`/#/inquiry/${req.query.theater}/login`);
            return;
        }
        res.redirect(`/#/inquiry/${req.query.theater}/${req.query.reserve}/login`);
    });
    app.use('/method', methodRouter);
    app.get('/signIn', signInRedirect);
    app.get('/purchase/transaction', (req: Request, res: Response) => {
        const params = Object.keys(req.query).map((key) => `${key}=${req.query[key]}`).join('&');
        res.redirect(`/?${params}`);
    });
    app.get('/', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/${process.env.NODE_ENV}/index.html`));
    });
    app.use((_req: Request, res: Response) => {
        res.render('notfound/index');
    });
    app.use((err: Error, _req: Request, res: Response) => {
        res.locals.error = err;
        res.render('error/index');
    });
};
