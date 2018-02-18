export const environment = {
    production: true,
    PORTAL_SITE_URL: 'http://www.cinemasunshine.co.jp',
    APP_SITE_URL: 'https://smpapp.ticket-cinemasunshine.com',
    API_ENDPOINT: 'https://ticket-cinemasunshine.com',
    ENTRANCE_SERVER_URL: '	https://entrance.ticket-cinemasunshine.com',
    MVTK_COMPANY_CODE: 'SSK000',

    COGNITO_REGION: 'ap-northeast-1', // identity poolのリージョンを指定する
    COGNITO_IDENTITY_POOL_ID: 'ap-northeast-1:6a67f523-93c3-4766-b96f-6552f21abd8d', // identity poolのID(AWS consoleで確認)
    COGNITO_USER_POOL_ID: '',
    COGNITO_CLIENT_ID: '',

    AUTHORIZE_SERVER_DOMAIN: 'sskts-production.auth.ap-northeast-1.amazoncognito.com',
    RESOURCE_SERVER_URL: 'https://sskts-api-production.azurewebsites.net',
    SASAKI_API_ENDPOINT: 'https://sskts-api-production.azurewebsites.net',
    TOKEN_ISSUER: '',

    ANALYTICS_ID: 'UA-8383230-1'
};
