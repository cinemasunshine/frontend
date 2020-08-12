import * as cinerino from '@cinerino/sdk';
import * as debug from 'debug';
const log = debug('sskts-frontend:AuthModel');

/**
 * 認証セッション
 * @interface IAuthSession
 */
export interface IAuthSession {
    /**
     * 状態
     */
    state: string;
    /**
     * スコープ
     */
    scopes: string[];
    /**
     * 資格情報
     */
    credentials?: any;
    /**
     * コード検証
     */
    codeVerifier?: string;
}

/**
 * 認証モデル
 * @class AuthModel
 */
export class AuthModel {
    /**
     * 状態
     */
    public state: string;
    /**
     * スコープ
     */
    public scopes: string[];
    /**
     * 資格情報
     */
    public credentials?: any;
    /**
     * コード検証
     */
    public codeVerifier?: string;
    /**
     * クライアントID
     */
    private clientId: string;
    /**
     * クライアントシークレット
     */
    private clientSecret: string;

    /**
     * @constructor
     * @param {any} session
     */
    constructor(clientId?: string) {
        this.state = 'STATE';
        // const resourceServerUrl = <string>process.env.RESOURCE_SERVER_URL;
        this.scopes = [
            // `${resourceServerUrl}/transactions`,
            // `${resourceServerUrl}/events.read-only`,
            // `${resourceServerUrl}/organizations.read-only`,
            // `${resourceServerUrl}/orders.read-only`,
            // `${resourceServerUrl}/places.read-only`
        ];

        const clientList: { id: string; secret: string; }[] = JSON.parse((<string>process.env.CLIENT_LIST));
        const findResult = clientList.find(client => client.id === clientId);
        this.clientId = (findResult === undefined) ? clientList[0].id : findResult.id;
        this.clientSecret = (findResult === undefined) ? clientList[0].secret : findResult.secret;
        log(this.clientId);
    }

    /**
     * 認証クラス作成
     * @memberof AuthModel
     * @method create
     * @returns {cinerino.auth.ClientCredentials}
     */
    public create(): cinerino.auth.ClientCredentials {
        return new cinerino.auth.ClientCredentials({
            domain: (<string>process.env.AUTHORIZE_SERVER_DOMAIN),
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
    public save(session: any): void {
        const authSession: IAuthSession = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier
        };
        session.auth = authSession;
    }
}
