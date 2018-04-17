export const environment = {
    production: false,
    PORTAL_SITE_URL: 'http://devssktsportal.azurewebsites.net',
    APP_SITE_URL: 'https://sskts-ticket-development.azurewebsites.net',
    API_ENDPOINT: '',
    FRONTEND_ENDPOINT: 'https://sskts-frontend-development.azurewebsites.net',
    ENTRANCE_SERVER_URL: 'https://d2n1h4enbzumbc.cloudfront.net',
    MVTK_COMPANY_CODE: 'SSK000',

    COGNITO_REGION: 'ap-northeast-1', // identity poolのリージョンを指定する
    COGNITO_IDENTITY_POOL_ID: 'ap-northeast-1:6a67f523-93c3-4766-b96f-6552f21abd8d', // identity poolのID(AWS consoleで確認)
    COGNITO_USER_POOL_ID: '',
    COGNITO_CLIENT_ID: '',

    SASAKI_API_ENDPOINT: 'https://sskts-api-development.azurewebsites.net',
    TOKEN_ISSUER: '',

    ANALYTICS_ID: 'UA-99018492-2'
};
