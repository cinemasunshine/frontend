"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
exports.default = (app) => {
    app.use('/api', api_1.default);
    app.get('*', (_, res) => {
        res.sendFile(`${__dirname}/../dist/client/index.html`);
    });
};
