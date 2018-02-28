export const environment = {
    production: false,
    PORTAL_SITE_URL: 'http://testssktsportal.azurewebsites.net',
    APP_SITE_URL: 'https://sskts-ticket-test.azurewebsites.net',
    API_ENDPOINT: '',
    FRONTEND_ENDPOINT: 'https://sskts-frontend-test.azurewebsites.net',
    ENTRANCE_SERVER_URL: 'https://d24x7394fq3aqi.cloudfront.net',
    MVTK_COMPANY_CODE: 'SSK000',

    COGNITO_REGION: 'ap-northeast-1', // identity poolのリージョンを指定する
    COGNITO_IDENTITY_POOL_ID: 'ap-northeast-1:b153d3f1-5e67-468e-8c69-ab938cf3d21e', // identity poolのID(AWS consoleで確認)
    COGNITO_USER_POOL_ID: '',
    COGNITO_CLIENT_ID: '',

    AUTHORIZE_SERVER_DOMAIN: 'sskts-test.auth.ap-northeast-1.amazoncognito.com',
    RESOURCE_SERVER_URL: 'https://sskts-api-test.azurewebsites.net',
    SASAKI_API_ENDPOINT: 'https://sskts-api-test.azurewebsites.net',
    TOKEN_ISSUER: '',

    ANALYTICS_ID: 'UA-99018492-2'
};