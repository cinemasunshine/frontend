"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const purchase_controller_1 = require("../controllers/purchase/purchase.controller");
const authorize_1 = require("./authorize");
const inquiry_1 = require("./inquiry");
const master_1 = require("./master");
const method_1 = require("./method");
const purchase_1 = require("./purchase");
exports.default = (app) => {
    app.set('layout', 'layouts/layout');
    app.use((req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        res.locals.PORTAL_SITE_URL = process.env.PORTAL_SITE_URL;
        res.locals.APP_SITE_URL = process.env.APP_SITE_URL;
        res.locals.isApp = (req.session.awsCognitoIdentityId !== undefined);
        next();
    });
    app.use('/api/purchase', purchase_1.default);
    app.use('/api/master', master_1.default);
    app.use('/api/authorize', authorize_1.default);
    app.use('/inquiry', inquiry_1.default);
    app.use('/method', method_1.default);
    app.get('/purchase/performances/getSchedule', purchase_controller_1.getSchedule);
    app.get('/purchase/transaction', (req, res, _next) => {
        let params = `performanceId=${req.query.performanceId}`;
        params += `&passportToken=${req.query.passportToken}`;
        if (req.query.identityId !== undefined) {
            params += `&identityId=${req.query.identityId}`;
        }
        if (req.query.native !== undefined) {
            params += `&native=${req.query.native}`;
        }
        if (req.query.member !== undefined) {
            params += `&member=${req.query.member}`;
        }
        if (req.query.accessToken !== undefined) {
            params += `&accessToken=${req.query.accessToken}`;
        }
        res.redirect(`/?${params}`);
    });
    app.get('/', (_req, res, _next) => {
        res.locals.GMO_ENDPOINT = process.env.GMO_ENDPOINT;
        res.render('purchase/index', { layout: false });
    });
    app.use((_req, res, _next) => {
        res.render('notfound/index');
    });
    app.use((err, _req, res, _next) => {
        res.locals.error = err;
        res.render('error/index');
    });
};
