"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sasaki = require("@motionpicture/sskts-api-nodejs-client");
const debug = require("debug");
const log = debug('sskts-frontend:AuthModel');
/**
 * 認証モデル
 * @class AuthModel
 */
class AuthModel {
    /**
     * @constructor
     * @param {any} session
     */
    constructor(clientId) {
        this.state = 'STATE';
        // const resourceServerUrl = <string>process.env.RESOURCE_SERVER_URL;
        this.scopes = [
        // `${resourceServerUrl}/transactions`,
        // `${resourceServerUrl}/events.read-only`,
        // `${resourceServerUrl}/organizations.read-only`,
        // `${resourceServerUrl}/orders.read-only`,
        // `${resourceServerUrl}/places.read-only`
        ];
        const clientList = JSON.parse(process.env.CLIENT_LIST);
        const findResult = clientList.find(client => client.id === clientId);
        this.clientId = (findResult === undefined) ? clientList[0].id : findResult.id;
        this.clientSecret = (findResult === undefined) ? clientList[0].secret : findResult.secret;
        log(this.clientId);
    }
    /**
     * 認証クラス作成
     * @memberof AuthModel
     * @method create
     * @returns {sasaki.auth.ClientCredentials}
     */
    create() {
        return new sasaki.auth.ClientCredentials({
            domain: process.env.AUTHORIZE_SERVER_DOMAIN,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            state: this.state,
            scopes: this.scopes
        });
    }
    /**
     * セッションへ保存
     * @memberof AuthModel
     * @method save
     * @returns {Object}
     */
    save(session) {
        const authSession = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier
        };
        session.auth = authSession;
    }
}
exports.AuthModel = AuthModel;
