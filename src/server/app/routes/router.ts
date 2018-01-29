/**
 * ルーティング
 */
import * as express from 'express';
import purchaseRouter from './purchase';
import masterRouter from './master';
import inquiryRouter from './inquiry';

export default (app: express.Application) => {
    app.use('/api/purchase', purchaseRouter);
    app.use('/api/master', masterRouter);
    app.use('/inquiry', inquiryRouter);
    app.get('/', (_, res) => {
        res.locals.env = process.env.NODE_ENV;
        res.render('purchase/index');
    });
    app.get('*', (_, res) => {
        res.redirect('/');
    });
};
