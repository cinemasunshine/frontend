import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
/**
 * 認証セッション
 * @interface IAuth2Session
 */
export interface IAuth2Session {
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
    /**
     * クライアントID
     */
    clientId: string;
}

/**
 * 認証モデル
 * @class Auth2Model
 */
export class Auth2Model {
    /**
     * 状態（固定値）
     */
    private static STATE = 'STATE';
    /**
     * 検証コード（固定値）
     */
    private static CODE_VERIFIER = 'CODE_VERIFIER';
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
    constructor(args: { clientId?: string; session: IAuth2Session | any }) {
        // const resourceServerUrl = <string>process.env.RESOURCE_SERVER_URL;
        this.scopes = [
            // 'phone',
            // 'openid',
            // 'email',
            // 'aws.cognito.signin.user.admin',
            // 'profile',
            // `${resourceServerUrl}/transactions`,
            // `${resourceServerUrl}/events.read-only`,
            // `${resourceServerUrl}/organizations.read-only`,
            // `${resourceServerUrl}/orders.read-only`,
            // `${resourceServerUrl}/places.read-only`,
            // `${resourceServerUrl}/people.contacts`,
            // `${resourceServerUrl}/people.creditCards`,
            // `${resourceServerUrl}/people.ownershipInfos.read-only`
        ];
        const clientId = (args.clientId === undefined && args.session !== undefined)
            ? args.session.clientId : args.clientId;
        this.credentials = (args.session === undefined) ? undefined : args.session.credentials;
        const clientList: { id: string; secret: string; }[] = JSON.parse((<string>process.env.CLIENT_OAUTH2_LIST));
        const findResult = clientList.find(client => client.id === clientId);
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
    public create(): sasaki.auth.OAuth2 {
        const auth = new sasaki.auth.OAuth2({
            domain: (<string>process.env.OAUTH2_SERVER_DOMAIN),
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            redirectUri: (<string>process.env.AUTH_REDIRECT_URI),
            logoutUri: (<string>process.env.AUTH_LOGUOT_URI),
            state: this.state,
            scopes: <any>this.scopes.join(' ')
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
    public save(session: any): void {
        const authSession: IAuth2Session = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier,
            clientId: this.clientId
        };
        session.auth = authSession;
    }
}
