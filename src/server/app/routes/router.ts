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
    app.use('/api/inquiry', inquiryRouter);
    app.get('/', (_, res) => {
        res.sendFile(`${__dirname}/../dist/client/${process.env.NODE_ENV}/index.html`);
    });
    app.get('*', (_, res) => {
        res.redirect('/');
    });
};
