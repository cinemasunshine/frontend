"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sasaki = require("@motionpicture/sskts-api-nodejs-client");
/**
 * 認証モデル
 * @class Auth2Model
 */
class Auth2Model {
    /**
     * @constructor
     * @param {any} session
     */
    constructor(args) {
        const resourceServerUrl = process.env.RESOURCE_SERVER_URL;
        this.scopes = [
            'phone',
            'openid',
            'email',
            'aws.cognito.signin.user.admin',
            'profile',
            `${resourceServerUrl}/transactions`,
            `${resourceServerUrl}/events.read-only`,
            `${resourceServerUrl}/organizations.read-only`,
            `${resourceServerUrl}/orders.read-only`,
            `${resourceServerUrl}/places.read-only`,
            `${resourceServerUrl}/people.contacts`,
            `${resourceServerUrl}/people.creditCards`,
            `${resourceServerUrl}/people.ownershipInfos.read-only`
        ];
        this.clientId = (args.clientId === undefined) ? args.session.clientId : args.clientId;
        this.credentials = (args.session === undefined) ? undefined : args.session.credentials;
        const clientList = JSON.parse(process.env.CLIENT_OAUTH2_LIST);
        const findResult = clientList.find(client => client.id === this.clientId);
        this.clientId = (findResult === undefined) ? clientList[0].id : findResult.id;
        this.clientSecret = (findResult === undefined) ? clientList[0].secret : findResult.secret;
        this.state = Auth2Model.STATE;
        this.codeVerifier = Auth2Model.CODE_VERIFIER;
    }
    /**
     * 認証クラス作成
     * @memberof Auth2Model
     * @method create
     * @returns {sasaki.auth.ClientCredentials}
     */
    create() {
        const auth = new sasaki.auth.OAuth2({
            domain: process.env.OAUTH2_SERVER_DOMAIN,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            redirectUri: process.env.AUTH_REDIRECT_URI,
            logoutUri: process.env.AUTH_LOGUOT_URI,
            state: this.state,
            scopes: this.scopes.join(' ')
        });
        if (this.credentials !== undefined) {
            auth.setCredentials(this.credentials);
        }
        return auth;
    }
    /**
     * セッションへ保存
     * @memberof Auth2Model
     * @method save
     * @returns {Object}
     */
    save(session) {
        const authSession = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier,
            clientId: this.clientId
        };
        session.auth = authSession;
    }
}
/**
 * 状態（固定値）
 */
Auth2Model.STATE = 'STATE';
/**
 * 検証コード（固定値）
 */
Auth2Model.CODE_VERIFIER = 'CODE_VERIFIER';
exports.Auth2Model = Auth2Model;
