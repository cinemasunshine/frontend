"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * マスターデータ
 */
const COA = require("@motionpicture/coa-service");
const sasaki = require("@motionpicture/sskts-api-nodejs-client");
const debug = require("debug");
const moment = require("moment");
const base_controller_1 = require("../base/base.controller");
const log = debug('SSKTS:master');
/**
 * 劇場一覧取得
 * @function getTheaters
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function getTheaters(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            log('getTheaters');
            const options = base_controller_1.getOptions(req);
            const result = yield new sasaki.service.Organization(options).searchMovieTheaters();
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getTheaters = getTheaters;
/**
 * 劇場取得
 * @function getTheater
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function getTheater(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            log('getTheaters');
            const options = base_controller_1.getOptions(req);
            const args = req.query;
            const result = yield new sasaki.service.Organization(options).findMovieTheaterByBranchCode(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getTheater = getTheater;
/**
 * スケジュール取得
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function getSchedules(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            log('getSchedules');
            const options = base_controller_1.getOptions(req);
            const args = req.query;
            if (args.startFrom !== undefined) {
                args.startFrom = moment(req.query.startFrom).toDate();
            }
            if (args.startThrough !== undefined) {
                args.startThrough = moment(req.query.startThrough).toDate();
            }
            const result = yield new sasaki.service.Event(options).searchIndividualScreeningEvent(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getSchedules = getSchedules;
/**
 * イベント情報取得
 * @function getEvent
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function getEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            log('getEvent');
            const options = base_controller_1.getOptions(req);
            const args = req.query;
            const result = yield new sasaki.service.Event(options).findIndividualScreeningEvent(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getEvent = getEvent;
/**
 * 券種一覧取得
 * @function getSalesTickets
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function getSalesTickets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            log('getSalesTickets');
            const args = req.query;
            const result = yield COA.services.reserve.salesTicket(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getSalesTickets = getSalesTickets;
