import { DEVELOPMENT_MEMBER_TICKET, DEVELOPMENT_POINT_TICKET } from './ticket';

export const environment = {
    production: false,
    PORTAL_SITE_URL: '/#/purchase/schedule',
    APP_SITE_URL: 'https://localhost:3333',
    API_ENDPOINT: 'https://localhost',
    FRONTEND_ENDPOINT: 'https://sskts-frontend-development.azurewebsites.net',
    ENTRANCE_SERVER_URL: 'https://d2n1h4enbzumbc.cloudfront.net',
    MVTK_COMPANY_CODE: 'SSK000',
    MG_COMPANY_CODE: 'SSK000',

    COGNITO_REGION: 'ap-northeast-1', // identity poolのリージョンを指定する
    COGNITO_IDENTITY_POOL_ID: 'ap-northeast-1:6a67f523-93c3-4766-b96f-6552f21abd8d', // identity poolのID(AWS consoleで確認)
    COGNITO_USER_POOL_ID: '',
    COGNITO_CLIENT_ID: '',
    TOKEN_ISSUER: '',

    POINT_TICKET: DEVELOPMENT_POINT_TICKET,

    ANALYTICS_ID: 'UA-99018492-2',

    MEMBER_TICKET: DEVELOPMENT_MEMBER_TICKET, // 毎週木曜1,100円鑑賞の購入枚数上限は1枚だけ

    TRANSACTION_TIME: '240', // 取引時間（分）
    SALES_END_TIME_VALUE: '10', // 販売終了時間の値（上映開始時間から相対）
    SALES_END_TIME_UNIT: 'minutes', // 販売終了時間の単位（上映開始時間から相対）
    WINDOW_TIME_FROM_VALUE: '0', // 窓口表示開始の値（上映開始時間から相対）
    WINDOW_TIME_FROM_UNIT: 'minutes', // 窓口表示開始の単位（上映開始時間から相対）
    WINDOW_TIME_THROUGH_VALUE: '10', // 窓口表示終了の値（上映開始時間から相対）
    WINDOW_TIME_THROUGH_UNIT: 'minutes' // 窓口表示終了の単位（上映開始時間から相対）
};
