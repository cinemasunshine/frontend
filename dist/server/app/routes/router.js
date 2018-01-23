"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const purchase_1 = require("./purchase");
const master_1 = require("./master");
const inquiry_1 = require("./inquiry");
exports.default = (app) => {
    app.use('/api/purchase', purchase_1.default);
    app.use('/api/master', master_1.default);
    app.use('/api/inquiry', inquiry_1.default);
    app.get('/', (_, res) => {
        res.locals.env = process.env.NODE_ENV;
        res.render('index');
    });
    app.get('*', (_, res) => {
        res.redirect('/');
    });
};
