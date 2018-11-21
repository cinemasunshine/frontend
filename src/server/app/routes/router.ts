/**
 * ルーティング
 */
import { Application, NextFunction, Request, Response } from 'express';
import * as path from 'path';
import { signInRedirect } from '../controllers/authorize/authorize.controller';
import { getSchedule } from '../controllers/purchase/purchase.controller';
import authorizeRouter from './authorize';
import inquiryRouter from './inquiry';
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

function purchaseTransaction(req: Request, res: Response, _next: NextFunction) {
    const params = Object.keys(req.query).map((key) => `${key}=${req.query[key]}`).join('&');
    res.redirect(`/?${params}`);
}

function root(_req: Request, res: Response, _next: NextFunction) {
    const fileName = (process.env.NODE_ENV === 'production') ? 'production.html' : 'index.html';
    res.sendFile(path.resolve(`${__dirname}/../../../client/${process.env.NODE_ENV}/${fileName}`));
}

function notfound(_req: Request, res: Response, _next: NextFunction) {
    res.render('notfound/index');
}

function error(err: Error, _req: Request, res: Response, _next: NextFunction) {
    res.locals.error = err;
    res.render('error/index');
}

export default (app: Application) => {
    app.set('layout', 'layouts/layout');
    app.use(defaultSetting);
    app.use('/api/purchase', purchaseRouter);
    app.use('/api/master', masterRouter);
    app.use('/api/authorize', authorizeRouter);
    app.use('/inquiry', inquiryRouter);
    app.use('/method', methodRouter);
    app.get('/purchase/performances/getSchedule', getSchedule);
    app.get('/purchase/transaction', purchaseTransaction);
    app.get('/signIn', signInRedirect);
    app.get('/', root);
    app.use(notfound);
    app.use(error);
};
