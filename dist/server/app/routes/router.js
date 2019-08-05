"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const path = require("path");
const authorize_controller_1 = require("../controllers/authorize/authorize.controller");
const mail_controller_1 = require("../controllers/mail/mail.controller");
const authorize_1 = require("./authorize");
const inquiry_1 = require("./inquiry");
const master_1 = require("./master");
const method_1 = require("./method");
const purchase_1 = require("./purchase");
function defaultSetting(req, res, next) {
    res.locals.NODE_ENV = process.env.NODE_ENV;
    res.locals.PORTAL_SITE_URL = process.env.PORTAL_SITE_URL;
    res.locals.APP_SITE_URL = process.env.APP_SITE_URL;
    res.locals.isApp = (req.session.awsCognitoIdentityId !== undefined);
    next();
}
function purchaseTransaction(req, res, _next) {
    const params = Object.keys(req.query).map((key) => `${key}=${req.query[key]}`).join('&');
    res.redirect(`/?${params}`);
}
function root(_req, res, _next) {
    res.sendFile(path.resolve(`${__dirname}/../../../client/${process.env.NODE_ENV}/index.html`));
}
function notfound(_req, res, _next) {
    res.render('notfound/index');
}
function error(err, _req, res, _next) {
    res.locals.error = err;
    res.render('error/index');
}
exports.default = (app) => {
    app.set('layout', 'layouts/layout');
    app.use(defaultSetting);
    app.use('/api/purchase', purchase_1.default);
    app.use('/api/master', master_1.default);
    app.use('/api/authorize', authorize_1.default);
    app.post('/api/mail/template', mail_controller_1.getTemplate);
    app.get('/api/serverTime', (_req, res) => { res.json({ date: moment().toISOString() }); });
    app.use('/inquiry', inquiry_1.default);
    app.use('/method', method_1.default);
    app.get('/purchase/transaction', purchaseTransaction);
    app.get('/signIn', authorize_controller_1.signInRedirect);
    app.get('/', root);
    app.use(notfound);
    app.use(error);
};
