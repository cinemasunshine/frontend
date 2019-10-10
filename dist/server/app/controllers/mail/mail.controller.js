"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * mail
 */
const debug = require("debug");
const ejs = require("ejs");
const libphonenumber = require("libphonenumber-js");
const momentTimezone = require("moment-timezone");
const base_controller_1 = require("../base/base.controller");
const log = debug('frontend:mail');
function getTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('getTemplate');
        try {
            const view = req.body.view;
            const template = yield ejs.render(view, Object.assign(Object.assign({}, req.body), { layout: false, moment: momentTimezone, formatTelephone }), { async: true });
            res.json({ template });
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getTemplate = getTemplate;
/**
 * 電話番号変換
 */
function formatTelephone(telephone, format) {
    if (telephone === undefined) {
        return '';
    }
    const parseNumber = libphonenumber.parse(telephone, 'JP');
    format = (format === undefined) ? 'International' : format;
    return libphonenumber.format(parseNumber, format).replace(/\s/g, '');
}
exports.formatTelephone = formatTelephone;
