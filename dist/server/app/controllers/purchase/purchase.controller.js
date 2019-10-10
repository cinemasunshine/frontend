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
 * 購入
 */
const COA = require("@motionpicture/coa-service");
const mvtkReserve = require("@motionpicture/mvtk-reserve-service");
const debug = require("debug");
const base_controller_1 = require("../base/base.controller");
const log = debug('sskts-frontend:purchase');
/**
 * 座席ステータス取得
 * @function getSeatState
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function getSeatState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('getSeatState');
        try {
            const args = req.query;
            const result = yield COA.services.reserve.stateReserveSeat(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getSeatState = getSeatState;
/**
 * ムビチケチケットコード取得
 * @function mvtkTicketcode
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function mvtkTicketcode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('mvtkTicketcode');
        try {
            const args = req.body;
            const result = yield COA.services.master.mvtkTicketcode(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.mvtkTicketcode = mvtkTicketcode;
/**
 * ムビチケ照会
 * @function mvtkPurchaseNumberAuth
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function mvtkPurchaseNumberAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('mvtkPurchaseNumberAuth');
        try {
            const args = req.body;
            const result = yield mvtkReserve.services.auth.purchaseNumberAuth.purchaseNumberAuth(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.mvtkPurchaseNumberAuth = mvtkPurchaseNumberAuth;
/**
 * ムビチケ座席指定情報連携
 * @function mvtksSatInfoSync
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function mvtksSatInfoSync(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('mvtksSatInfoSync');
        try {
            const args = req.body;
            const result = yield mvtkReserve.services.seat.seatInfoSync.seatInfoSync(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.mvtksSatInfoSync = mvtksSatInfoSync;
