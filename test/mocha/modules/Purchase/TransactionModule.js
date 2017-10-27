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
 * Purchase.TransactionModuleテスト
 */
const sasaki = require("@motionpicture/sskts-api-nodejs-client");
const assert = require("assert");
const moment = require("moment");
const sinon = require("sinon");
const TransactionModule = require("../../../../app/modules/Purchase/TransactionModule");
describe('Purchase.TransactionModule', () => {
    it('start 正常', () => __awaiter(this, void 0, void 0, function* () {
        const event = sinon.stub(sasaki.service, 'event').returns({
            findIndividualScreeningEvent: () => {
                return Promise.resolve({
                    coaInfo: {
                        theaterCode: '',
                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD')
                    },
                    startDate: moment().add(1, 'days').toDate()
                });
            }
        });
        const organization = sinon.stub(sasaki.service, 'organization').returns({
            findMovieTheaterByBranchCode: () => {
                return Promise.resolve({
                    id: ''
                });
            }
        });
        const placeOrder = sinon.stub(sasaki.service.transaction, 'placeOrder').returns({
            start: () => {
                return Promise.resolve({});
            }
        });
        const req = {
            session: {},
            body: {
                performanceId: ''
            }
        };
        const res = {
            json: sinon.spy()
        };
        yield TransactionModule.start(req, res);
        assert(res.json.calledOnce);
        assert.notStrictEqual(res.json.args[0][0].redirect, null);
        assert.strictEqual(res.json.args[0][0].contents, null);
        event.restore();
        organization.restore();
        placeOrder.restore();
    }));
    it('start 正常 重複確認へ', () => __awaiter(this, void 0, void 0, function* () {
        const event = sinon.stub(sasaki.service, 'event').returns({
            findIndividualScreeningEvent: () => {
                return Promise.resolve({
                    coaInfo: {
                        theaterCode: '',
                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD')
                    },
                    startDate: moment().add(1, 'days').toDate()
                });
            }
        });
        const req = {
            session: {
                purchase: {
                    transaction: {},
                    seatReservationAuthorization: {}
                }
            },
            body: {
                performanceId: ''
            }
        };
        const res = {
            json: sinon.spy()
        };
        yield TransactionModule.start(req, res);
        assert(res.json.calledOnce);
        assert.notStrictEqual(res.json.args[0][0].redirect, null);
        assert.strictEqual(res.json.args[0][0].contents, null);
        event.restore();
    }));
    it('start エラー セッションなし', () => __awaiter(this, void 0, void 0, function* () {
        const req = {
            session: undefined
        };
        const res = {
            json: sinon.spy()
        };
        yield TransactionModule.start(req, res);
        assert(res.json.calledOnce);
        assert.strictEqual(res.json.args[0][0].redirect, null);
        assert.notStrictEqual(res.json.args[0][0].contents, null);
    }));
    it('start エラー セッションなし', () => __awaiter(this, void 0, void 0, function* () {
        const event = sinon.stub(sasaki.service, 'event').returns({
            findIndividualScreeningEvent: () => {
                return Promise.resolve(null);
            }
        });
        const req = {
            session: {},
            body: {
                performanceId: ''
            }
        };
        const res = {
            json: sinon.spy()
        };
        yield TransactionModule.start(req, res);
        assert(res.json.calledOnce);
        assert.strictEqual(res.json.args[0][0].redirect, null);
        assert.notStrictEqual(res.json.args[0][0].contents, null);
        event.restore();
    }));
    it('start エラー APIエラー', () => __awaiter(this, void 0, void 0, function* () {
        const event = sinon.stub(sasaki.service, 'event').returns({
            findIndividualScreeningEvent: () => {
                return Promise.reject({});
            }
        });
        const req = {
            session: {},
            body: {
                performanceId: ''
            }
        };
        const res = {
            json: sinon.spy()
        };
        yield TransactionModule.start(req, res);
        assert(res.json.calledOnce);
        assert.strictEqual(res.json.args[0][0].redirect, null);
        assert.notStrictEqual(res.json.args[0][0].contents, null);
        event.restore();
    }));
    it('start エラー 開始可能日前', () => __awaiter(this, void 0, void 0, function* () {
        const event = sinon.stub(sasaki.service, 'event').returns({
            findIndividualScreeningEvent: () => {
                return Promise.resolve({
                    coaInfo: {
                        theaterCode: '',
                        rsvStartDate: moment().add(1, 'days').format('YYYYMMDD')
                    }
                });
            }
        });
        const req = {
            session: {},
            body: {
                performanceId: ''
            }
        };
        const res = {
            json: sinon.spy()
        };
        yield TransactionModule.start(req, res);
        assert(res.json.calledOnce);
        assert.strictEqual(res.json.args[0][0].redirect, null);
        assert.notStrictEqual(res.json.args[0][0].contents, null);
        event.restore();
    }));
    it('start エラー 終了可能日後', () => __awaiter(this, void 0, void 0, function* () {
        const event = sinon.stub(sasaki.service, 'event').returns({
            findIndividualScreeningEvent: () => {
                return Promise.resolve({
                    coaInfo: {
                        theaterCode: '',
                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD')
                    },
                    startDate: moment().subtract(1, 'hours').toDate()
                });
            }
        });
        const req = {
            session: {},
            body: {
                performanceId: ''
            }
        };
        const res = {
            json: sinon.spy()
        };
        yield TransactionModule.start(req, res);
        assert(res.json.calledOnce);
        assert.strictEqual(res.json.args[0][0].redirect, null);
        assert.notStrictEqual(res.json.args[0][0].contents, null);
        event.restore();
    }));
    it('start エラー 対象劇場なし', () => __awaiter(this, void 0, void 0, function* () {
        const event = sinon.stub(sasaki.service, 'event').returns({
            findIndividualScreeningEvent: () => {
                return Promise.resolve({
                    coaInfo: {
                        theaterCode: '',
                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD')
                    },
                    startDate: moment().add(1, 'hours').toDate()
                });
            }
        });
        const organization = sinon.stub(sasaki.service, 'organization').returns({
            findMovieTheaterByBranchCode: () => {
                return Promise.resolve(null);
            }
        });
        const req = {
            session: {},
            body: {
                performanceId: ''
            }
        };
        const res = {
            json: sinon.spy()
        };
        yield TransactionModule.start(req, res);
        event.restore();
        organization.restore();
        assert(res.json.calledOnce);
        assert.strictEqual(res.json.args[0][0].redirect, null);
        assert.notStrictEqual(res.json.args[0][0].contents, null);
    }));
});
