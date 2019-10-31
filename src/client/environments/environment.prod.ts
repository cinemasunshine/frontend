import { PRODUCTION_MEMBER_TICKET, PRODUCTION_POINT_TICKET } from './ticket';

export const environment = {
    production: true,
    PORTAL_SITE_URL: 'http://www.cinemasunshine.co.jp',
    APP_SITE_URL: 'https://smpapp.ticket-cinemasunshine.com',
    API_ENDPOINT: '',
    FRONTEND_ENDPOINT: 'https://ticket-cinemasunshine.com',
    ENTRANCE_SERVER_URL: 'https://entrance.ticket-cinemasunshine.com',
    MVTK_COMPANY_CODE: 'SSK000',

    COGNITO_REGION: 'ap-northeast-1', // identity poolのリージョンを指定する
    COGNITO_IDENTITY_POOL_ID: 'ap-northeast-1:a8dd7a2a-020c-43d4-9e9f-e49159e89382', // identity poolのID(AWS consoleで確認)
    COGNITO_USER_POOL_ID: '',
    COGNITO_CLIENT_ID: '',
    TOKEN_ISSUER: '',

    POINT_TICKET: PRODUCTION_POINT_TICKET,

    ANALYTICS_ID: 'UA-8383230-1',

    MEMBER_TICKET: PRODUCTION_MEMBER_TICKET, // 毎週木曜1,100円鑑賞の購入枚数上限は1枚だけ

    TRANSACTION_TIME: '10', // 取引時間（分）
    SALES_END_TIME_VALUE: '10', // 販売終了時間の値（上映開始時間から相対）
    SALES_END_TIME_UNIT: 'minutes', // 販売終了時間の単位（上映開始時間から相対）

    SCHEDULE_API_URL: 'https://sskts-xmlcontroller-production.azurewebsites.net'
};
