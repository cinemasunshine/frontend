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
 * Util.UtilModuleテスト
 *
 * @ignore
 */
const assert = require("assert");
const moment = require("moment");
const sinon = require("sinon");
const UtilModule = require("../../../../app/modules/Util/UtilModule");
describe('Util.UtilModule', () => {
    it('setLocals 正常', () => {
        const req = {
            cookies: {}
        };
        const res = {
            locals: {}
        };
        const next = sinon.spy();
        UtilModule.setLocals(req, res, next);
        assert(next.calledOnce);
    });
    it('isApp 正常 アプリ', () => {
        const req = {
            session: {
                awsCognitoIdentityId: '11111111'
            }
        };
        const isApp = UtilModule.isApp(req);
        assert.strictEqual(isApp, true);
    });
    it('isApp 正常 アプリでない', () => {
        const req = {};
        const isApp = UtilModule.isApp(req);
        assert.strictEqual(isApp, false);
    });
    it('timeFormat 正常', () => {
        const date = new Date();
        date.setHours(1);
        date.setMinutes(1);
        const str = UtilModule.timeFormat(date, moment().format('YYYYMMDD'));
        assert.equal(str, '01:01');
    });
    it('escapeHtml 正常', () => __awaiter(this, void 0, void 0, function* () {
        const str = UtilModule.escapeHtml('<script>alert(123)</script>');
        assert.equal(str, '&lt;script&gt;alert(123)&lt;/script&gt;');
    }));
    it('formatPrice 正常', () => __awaiter(this, void 0, void 0, function* () {
        const num = 10000;
        const price = UtilModule.formatPrice(num);
        assert.equal(price, '10,000');
    }));
    it('bace64Encode 正常', () => __awaiter(this, void 0, void 0, function* () {
        const str = UtilModule.bace64Encode('テスト');
        assert.equal(str, '44OG44K544OI');
    }));
    it('base64Decode 正常', () => __awaiter(this, void 0, void 0, function* () {
        const str = UtilModule.base64Decode('44OG44K544OI');
        assert.equal(str, 'テスト');
    }));
    it('getEmailTemplate 正常', () => __awaiter(this, void 0, void 0, function* () {
        const res = {
            render: sinon.spy()
        };
        const file = '';
        const locals = {};
        yield UtilModule.getEmailTemplate(res, file, locals);
        assert(res.render.calledOnce);
    }));
});