/**
 * ルーティング
 */
import * as express from 'express';
import purchaseRouter from './purchase';
import masterRouter from './master';
import inquiryRouter from './inquiry';
import methodRouter from './method';

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
    app.use('/inquiry', inquiryRouter);
    app.use('/method', methodRouter);
    app.get('/', (_, res) => {
        res.locals.env = process.env.NODE_ENV;
        res.render('purchase/index');
    });
    app.get('*', (_, res) => {
        res.redirect('/');
    });
};
