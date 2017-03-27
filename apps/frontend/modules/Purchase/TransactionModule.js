/**
 * 取引
 * @namespace Purchase.TransactionModule
 */
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
const debug = require("debug");
const moment = require("moment");
const MP = require("../../../../libs/MP");
const PurchaseSession = require("../../models/Purchase/PurchaseModel");
const debugLog = debug('SSKTS ');
/**
 * 取引開始
 * @memberOf Purchase.TransactionModule
 * @function start
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<any>}
 */
// tslint:disable-next-line:variable-name
function start(req, res, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.session || !req.body.id)
            return res.json({ redirect: null, err: req.__('common.error.property') });
        const purchaseModel = new PurchaseSession.PurchaseModel(req.session.purchase);
        try {
            if (purchaseModel.transactionMP && purchaseModel.reserveSeats) {
                //重複確認へ
                return res.json({ redirect: `/purchase/${req.body.id}/overlap`, err: null });
            }
            // 取引開始
            const minutes = 30;
            purchaseModel.expired = moment().add('minutes', minutes).unix();
            purchaseModel.transactionMP = yield MP.transactionStart({
                expires_at: purchaseModel.expired
            });
            debugLog('MP取引開始', purchaseModel.transactionMP.attributes.owners);
            delete req.session.purchase;
            delete req.session.mvtk;
            delete req.session.complete;
            //セッション更新
            req.session.purchase = purchaseModel.toSession();
            //座席選択へ
            return res.json({ redirect: `/purchase/seat/${req.body.id}/`, err: null });
        }
        catch (err) {
            return res.json({ redirect: null, err: err.message });
        }
    });
}
exports.start = start;
