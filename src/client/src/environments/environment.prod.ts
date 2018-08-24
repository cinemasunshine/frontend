import { PRODUCTION_POINT_TICKET } from './ticket';

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

    SASAKI_API_ENDPOINT: 'https://sskts-api-production.azurewebsites.net',
    TOKEN_ISSUER: '',

    POINT_TICKET: PRODUCTION_POINT_TICKET,

    ANALYTICS_ID: 'UA-8383230-1'
};
