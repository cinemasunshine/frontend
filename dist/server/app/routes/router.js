"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const purchase_1 = require("./purchase");
const master_1 = require("./master");
const inquiry_1 = require("./inquiry");
const method_1 = require("./method");
const purchase_controller_1 = require("../controllers/purchase/purchase.controller");
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
    app.use('/inquiry', inquiry_1.default);
    app.use('/method', method_1.default);
    app.get('/purchase/performances/getSchedule', purchase_controller_1.getSchedule);
    app.get('/', (_, res) => {
        res.locals.env = process.env.NODE_ENV;
        res.render('purchase/index');
    });
    app.get('*', (_, res) => {
        res.redirect('/');
    });
};
