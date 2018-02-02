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
 * 購入
 */
const COA = require("@motionpicture/coa-service");
const mvtkReserve = require("@motionpicture/mvtk-reserve-service");
const sasaki = require("@motionpicture/sskts-api-nodejs-client");
const debug = require("debug");
const moment = require("moment");
const base_controller_1 = require("../base/base.controller");
const log = debug('SSKTS:purchase');
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
 * 取引開始
 * @function transactionStart
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function transactionStart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('transactionStart');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            args.expires = moment(args.expires).toDate();
            const result = yield new sasaki.service.transaction.PlaceOrder(options).start(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.transactionStart = transactionStart;
/**
 * 座席登録
 * @function createSeatReservation
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function createSeatReservation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('createSeatReservation');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            const result = yield new sasaki.service.transaction.PlaceOrder(options).createSeatReservationAuthorization(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.createSeatReservation = createSeatReservation;
/**
 * 座席更新
 * @function changeSeatReservation
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function changeSeatReservation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('changeSeatReservation');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            const result = yield new sasaki.service.transaction.PlaceOrder(options).changeSeatReservationOffers(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.changeSeatReservation = changeSeatReservation;
/**
 * 座席削除
 * @function cancelSeatReservation
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function cancelSeatReservation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('cancelSeatReservation');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            const result = yield new sasaki.service.transaction.PlaceOrder(options).cancelSeatReservationAuthorization(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.cancelSeatReservation = cancelSeatReservation;
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
 * ムビチケ登録
 * @function createMvtkAuthorization
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function createMvtkAuthorization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('createMvtkAuthorization');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            const result = yield new sasaki.service.transaction.PlaceOrder(options).createMvtkAuthorization(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.createMvtkAuthorization = createMvtkAuthorization;
/**
 * ムビチケ削除
 * @function cancelMvtkAuthorization
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function cancelMvtkAuthorization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('cancelMvtkAuthorization');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            const result = yield new sasaki.service.transaction.PlaceOrder(options).cancelMvtkAuthorization(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.cancelMvtkAuthorization = cancelMvtkAuthorization;
/**
 * 購入者情報登録
 * @function setCustomerContact
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function setCustomerContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('setCustomerContact');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            const result = yield new sasaki.service.transaction.PlaceOrder(options).setCustomerContact(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.setCustomerContact = setCustomerContact;
/**
 * クレジットカード登録
 * @function createCreditCardAuthorization
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function createCreditCardAuthorization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('createCreditCardAuthorization');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            const result = yield new sasaki.service.transaction.PlaceOrder(options).createCreditCardAuthorization(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.createCreditCardAuthorization = createCreditCardAuthorization;
/**
 * クレジットカード削除
 * @function cancelCreditCardAuthorization
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function cancelCreditCardAuthorization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('cancelCreditCardAuthorization');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            const result = yield new sasaki.service.transaction.PlaceOrder(options).cancelCreditCardAuthorization(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.cancelCreditCardAuthorization = cancelCreditCardAuthorization;
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
/**
 * 購入確定
 * @function setCustomerContact
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function transactionConfirm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('transactionConfirm');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            const result = yield new sasaki.service.transaction.PlaceOrder(options).confirm(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.transactionConfirm = transactionConfirm;
/**
 * メール送信
 * @function sendEmailNotification
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function sendEmailNotification(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('transactionConfirm');
        try {
            const options = base_controller_1.getOptions(req);
            const args = req.body;
            const result = yield sasaki.service.transaction.placeOrder(options).sendEmailNotification(args);
            res.json(result);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.sendEmailNotification = sendEmailNotification;
/**
 * スケジュールリスト取得
 * @memberof Purchase.PerformancesModule
 * @function getSchedule
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
function getSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = base_controller_1.getOptions(req);
            const args = {
                startFrom: req.query.startFrom,
                startThrough: req.query.startThrough
            };
            const theaters = yield new sasaki.service.Organization(options).searchMovieTheaters();
            const screeningEvents = yield new sasaki.service.Event(options).searchIndividualScreeningEvent(args);
            const result = {
                theaters: theaters,
                screeningEvents: screeningEvents
            };
            res.json({ result: result });
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getSchedule = getSchedule;
