/**
 * ルーティング
 */
import * as express from 'express';
import { getSchedule } from '../controllers/purchase/purchase.controller';
import authorizeRouter from './authorize';
import inquiryRouter from './inquiry';
import masterRouter from './master';
import methodRouter from './method';
import purchaseRouter from './purchase';

export default (app: express.Application) => {
    app.set('layout', 'layouts/layout');
    app.use((req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        res.locals.PORTAL_SITE_URL = process.env.PORTAL_SITE_URL;
        res.locals.APP_SITE_URL = process.env.APP_SITE_URL;
        res.locals.isApp = ((<Express.Session>req.session).awsCognitoIdentityId !== undefined);
        next();
    });
    app.use('/api/purchase', purchaseRouter);
    app.use('/api/master', masterRouter);
    app.use('/api/authorize', authorizeRouter);
    app.use('/inquiry', inquiryRouter);
    app.use('/method', methodRouter);
    app.get('/purchase/performances/getSchedule', getSchedule);
    app.get('/purchase/transaction', (req, res) => {
        let params = `performanceId=${req.query.performanceId}&passportToken=${req.query.passportToken}`;
        if (req.query.identityId !== undefined) {
            params += `&identityId=${req.query.identityId}`;
        }
        res.redirect(`/?${params}`);
    });
    app.get('/', (_, res) => {
        res.locals.env = process.env.NODE_ENV;
        res.render('purchase/index', { layout: false });
    });
    app.get('*', (_, res) => {
        res.redirect('/');
    });
};
