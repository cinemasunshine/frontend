"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const path = require("path");
const authorize_controller_1 = require("../controllers/authorize/authorize.controller");
const api_1 = require("./api");
function defaultSetting(req, res, next) {
    res.locals.NODE_ENV = process.env.NODE_ENV;
    res.locals.PORTAL_SITE_URL = process.env.PORTAL_SITE_URL;
    res.locals.APP_SITE_URL = process.env.APP_SITE_URL;
    res.locals.isApp = (req.session.awsCognitoIdentityId !== undefined);
    next();
}
exports.default = (app) => {
    app.set('layout', 'layouts/layout');
    app.use(defaultSetting);
    // API
    app.use('/api/purchase', api_1.purchaseRouter);
    app.use('/api/master', api_1.masterRouter);
    app.use('/api/authorize', api_1.authorizeRouter);
    app.get('/api/config', (_req, res) => {
        res.json({ scheduleApiEndpoint: process.env.SCHEDULE_API_ENDPOINT });
    });
    app.get('/api/serverTime', (_req, res) => {
        res.json({ date: moment().toISOString() });
    });
    // 照会
    app.get('/inquiry/login', (req, res) => {
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
    app.get('/signIn', authorize_controller_1.signInRedirect);
    // 購入
    app.get('/purchase/transaction', (req, res) => {
        const params = Object.keys(req.query).map((key) => `${key}=${req.query[key]}`).join('&');
        res.redirect(`/?${params}`);
    });
    // root
    app.get('/', (_req, res) => {
        res.sendFile(path.resolve(`${__dirname}/../../../client/${process.env.NODE_ENV}/index.html`));
    });
    // Not Found
    app.use((_req, res) => {
        res.status(404);
        res.render('notfound/index');
    });
    app.use((err, _req, res) => {
        res.status(422);
        res.locals.error = err;
        res.render('error/index');
    });
};
