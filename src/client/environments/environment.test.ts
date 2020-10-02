import { DEVELOPMENT_MEMBER_TICKET, DEVELOPMENT_POINT_TICKET } from './ticket';

export const environment = {
    production: false,
    PORTAL_SITE_URL: 'http://ssk-portal2018-frontend-win-test.azurewebsites.net',
    APP_SITE_URL: 'https://sskts-ticket-test.azurewebsites.net',
    API_ENDPOINT: '',
    FRONTEND_ENDPOINT: 'https://sskts-frontend-test.azurewebsites.net',
    ENTRANCE_SERVER_URL: 'https://d24x7394fq3aqi.cloudfront.net',

    COGNITO_REGION: 'ap-northeast-1', // identity poolのリージョンを指定する
    COGNITO_IDENTITY_POOL_ID: 'ap-northeast-1:b153d3f1-5e67-468e-8c69-ab938cf3d21e', // identity poolのID(AWS consoleで確認)
    COGNITO_USER_POOL_ID: '',
    COGNITO_CLIENT_ID: '',
    TOKEN_ISSUER: '',

    POINT_TICKET: DEVELOPMENT_POINT_TICKET,
    USE_MG_TICKET: true,

    ANALYTICS_ID: 'UA-99018492-2',

    MEMBER_TICKET: DEVELOPMENT_MEMBER_TICKET, // 毎週木曜1,100円鑑賞の購入枚数上限は1枚だけ

    TRANSACTION_TIME: '10', // 取引時間（分）
    SALES_END_TIME_VALUE: '10', // 販売終了時間の値（上映開始時間から相対）
    SALES_END_TIME_UNIT: 'minutes', // 販売終了時間の単位（上映開始時間から相対）
    WINDOW_TIME_FROM_VALUE: '0', // 窓口表示開始の値（上映開始時間から相対）
    WINDOW_TIME_FROM_UNIT: 'minutes', // 窓口表示開始の単位（上映開始時間から相対）
    WINDOW_TIME_THROUGH_VALUE: '10', // 窓口表示終了の値（上映開始時間から相対）
    WINDOW_TIME_THROUGH_UNIT: 'minutes' // 窓口表示終了の単位（上映開始時間から相対）
};
