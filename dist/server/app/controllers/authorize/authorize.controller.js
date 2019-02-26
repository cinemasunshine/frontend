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
 * authorize
 */
const reserve_1 = require("@motionpicture/coa-service/lib/services/reserve");
const debug = require("debug");
const moment = require("moment-timezone");
const auth_model_1 = require("../../models/auth/auth.model");
const auth2_model_1 = require("../../models/auth2/auth2.model");
const base_controller_1 = require("../base/base.controller");
const log = debug('sskts-frontend:authorize');
function getEndpoint(req) {
    if (process.env.CHANGE_API_TIME !== undefined
        && process.env.CHANGE_API_TIME !== ''
        && process.env.CHANGE_API_THEATERS !== undefined
        && process.env.CHANGE_API_THEATERS !== '') {
        log('CHANGE_API');
        const changeApiTime = process.env.CHANGE_API_TIME.trim().split(',');
        const now = moment().tz('Asia/Tokyo').unix();
        const start = moment(changeApiTime[0]).tz('Asia/Tokyo').unix();
        const end = moment(changeApiTime[1]).tz('Asia/Tokyo').unix();
        const theaters = process.env.CHANGE_API_THEATERS.trim().split(',');
        const findResult = theaters.find(t => t === req.body.branchCode);
        log('CHANGE_API_TIME', moment().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm'), moment(changeApiTime[0]).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm'), moment(changeApiTime[1]).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm'));
        log('CHANGE_API_THEATERS', theaters, findResult);
        if (findResult !== undefined && start < now && end > now) {
            log('SSKTS_API_ENDPOINT_2');
            return process.env.SSKTS_API_ENDPOINT_2;
        }
    }
    return process.env.SSKTS_API_ENDPOINT;
}
exports.getEndpoint = getEndpoint;
function getCredentials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('getCredentials', req.body);
        try {
            let authModel;
            const endpoint = getEndpoint(req);
            const clientId = req.body.clientId;
            if (req.body.member === reserve_1.FlgMember.NonMember) {
                authModel = new auth_model_1.AuthModel(clientId);
            }
            else if (req.body.member === reserve_1.FlgMember.Member) {
                authModel = new auth2_model_1.Auth2Model({ clientId, session: req.session.auth });
            }
            else {
                throw new Error('member does not macth MemberType');
            }
            const options = {
                endpoint,
                auth: authModel.create()
            };
            const accessToken = yield options.auth.getAccessToken();
            const credentials = {
                accessToken: accessToken
            };
            res.json({
                credentials,
                clientId: options.auth.options.clientId,
                endpoint
            });
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getCredentials = getCredentials;
/**
 * サインイン処理
 * @param {Request} req
 * @param {Response} res
 */
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('signIn', req.body.clientId);
        if (req.session === undefined || req.body.clientId === undefined) {
            res.status(400);
            res.json();
            return;
        }
        delete req.session.auth;
        const clientId = req.body.clientId;
        const authModel = new auth2_model_1.Auth2Model({ clientId, session: req.session.auth });
        authModel.save(req.session);
        const auth = authModel.create();
        const authUrl = auth.generateAuthUrl({
            scopes: authModel.scopes,
            state: authModel.state,
            codeVerifier: authModel.codeVerifier
        });
        res.json({
            url: authUrl
        });
    });
}
exports.signIn = signIn;
/**
 * サインインリダイレクト処理
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function signInRedirect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        log('signInRedirect', req.query);
        try {
            if (req.session === undefined) {
                throw new Error('session is undefined');
            }
            const authModel = new auth2_model_1.Auth2Model({ session: req.session.auth });
            if (req.query.state !== authModel.state) {
                throw (new Error(`state not matched ${req.query.state} !== ${authModel.state}`));
            }
            const auth = authModel.create();
            const credentials = yield auth.getToken(req.query.code, authModel.codeVerifier);
            // log('credentials published', credentials);
            authModel.credentials = credentials;
            authModel.save(req.session);
            auth.setCredentials(credentials);
            res.redirect('/#/auth/signin');
        }
        catch (err) {
            next(err);
        }
    });
}
exports.signInRedirect = signInRedirect;
