"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const PurchaseController_1 = require("./PurchaseController");
const PurchaseSession = require("../../models/Purchase/PurchaseModel");
const COA = require("@motionpicture/coa-service");
const MP = require("../../../../libs/MP");
class ConfirmController extends PurchaseController_1.default {
    index() {
        if (!this.purchaseModel.checkAccess(PurchaseSession.PurchaseModel.CONFIRM_STATE))
            return this.next(new Error('無効なアクセスです'));
        this.res.locals['gmoTokenObject'] = (this.purchaseModel.gmo) ? this.purchaseModel.gmo : null;
        this.res.locals['input'] = this.purchaseModel.input;
        this.res.locals['performance'] = this.purchaseModel.performance;
        this.res.locals['reserveSeats'] = this.purchaseModel.reserveSeats;
        this.res.locals['reserveTickets'] = this.purchaseModel.reserveTickets;
        this.res.locals['step'] = PurchaseSession.PurchaseModel.CONFIRM_STATE;
        this.res.locals['price'] = this.purchaseModel.getReserveAmount();
        if (!this.req.session)
            return this.next(new Error('session is undefined'));
        this.req.session['purchase'] = this.purchaseModel.formatToSession();
        this.res.render('purchase/confirm');
    }
    updateReserve() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.purchaseModel.performance)
                throw new Error('purchaseModel.performance is undefined');
            if (!this.purchaseModel.reserveSeats)
                throw new Error('purchaseModel.reserveSeats is undefined');
            if (!this.purchaseModel.input)
                throw new Error('purchaseModel.input is undefined');
            if (!this.purchaseModel.owner)
                throw new Error('purchaseModel.owner is undefined');
            if (!this.purchaseModel.transactionMP)
                throw Error('purchaseModel.transactionMP is undefined');
            let performance = this.purchaseModel.performance;
            let reserveSeats = this.purchaseModel.reserveSeats;
            let input = this.purchaseModel.input;
            this.purchaseModel.updateReserve = yield COA.updateReserveInterface.call({
                theater_code: performance.attributes.theater._id,
                date_jouei: performance.attributes.day,
                title_code: performance.attributes.film.coa_title_code,
                title_branch_num: performance.attributes.film.coa_title_branch_num,
                time_begin: performance.attributes.time_start,
                tmp_reserve_num: String(reserveSeats.tmp_reserve_num),
                reserve_name: input.last_name_hira + input.first_name_hira,
                reserve_name_jkana: input.last_name_hira + input.first_name_hira,
                tel_num: input.tel_num,
                mail_addr: input.mail_addr,
                reserve_amount: this.purchaseModel.getReserveAmount(),
                list_ticket: this.purchaseModel.getTicketList(),
            });
            this.logger.debug('COA本予約', this.purchaseModel.updateReserve);
            yield MP.ownersAnonymous.call({
                owner: this.purchaseModel.owner,
                name_first: input.first_name_hira,
                name_last: input.last_name_hira,
                tel: input.tel_num,
                email: input.mail_addr,
            });
            this.logger.debug('MP購入者情報登録');
            yield MP.transactionClose.call({
                transaction: this.purchaseModel.transactionMP,
            });
            this.logger.debug('MP取引成立');
        });
    }
    purchase() {
        this.updateReserve().then(() => {
            if (!this.req.session)
                throw new Error('session is undefined');
            this.req.session['updateReserve'];
            delete this.req.session['purchase'];
            this.res.json({
                err: null,
                result: this.req.session['updateReserve']
            });
        }, (err) => {
            this.res.json({
                err: err,
                result: null
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfirmController;