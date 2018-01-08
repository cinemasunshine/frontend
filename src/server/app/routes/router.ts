/**
 * ルーティング
 */
import * as express from 'express';
import apiRouter from './api';

export default (app: express.Application) => {
    app.use('/api', apiRouter);
    app.get('/', (_, res) => {
        res.sendFile(`${__dirname}/../dist/client/${process.env.NODE_ENV}/index.html`);
    });
    app.get('*', (_, res) => {
        res.redirect('/');
    });
};
