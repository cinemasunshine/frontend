# Features


# Usage

## Environment variables

| Name                                | Required | Value            | Purpose                                 |
|-------------------------------------|----------|------------------|-----------------------------------------|
| `NODE_ENV`                          | true     |                  | 環境名                                  |
| `NPM_TOKEN`                         | true     |                  | npm トークン                            |
| `REDIS_HOST`                        | true     |                  | REDISホスト                             |
| `REDIS_PORT`                        | true     |                  | REDISポート                             |
| `REDIS_KEY`                         | true     |                  | REDISキー                               |
| `SSKTS_API_ENDPOINT`                | true     |                  | SSKTS API エンドポイント                 |
| `COA_ENDPOINT`                      | true     |                  | COA API エンドポイント                   |
| `COA_REFRESH_TOKEN`                 | true     |                  | COA API リフレッシュトークン              |
| `MVTK_RESERVE_ENDPOINT`             | true     |                  | ムビチケ API エンドポイント               |
| `CLIENT_LIST`                       | true     |                  | JSON形式 [{id: 'xxx', secret: 'xxx'}]   |
| `CLIENT_OAUTH2_LIST`                | true     |                  | JSON形式 [{id: 'xxx', secret: 'xxx'}]   |
| `AUTHORIZE_SERVER_DOMAIN`           | true     |                  | 認可サーバードメイン                      |
| `OAUTH2_SERVER_DOMAIN`              | true     |                  | OAUTH2認可サーバードメイン                |
| `RESOURCE_SERVER_URL`               | true     |                  | リソースサーバーURL                      |
| `AUTH_REDIRECT_URI`                 | true     |                  | サインインリダイレクトURL                 |
| `AUTH_LOGUOT_URI`                   | true     |                  | サインアウトリダイレクトURL               |
| `PORTAL_SITE_URL`                   | true     |                  | ポータルサイトURL                        |
| `APP_SITE_URL`                      | true     |                  | スマホアプリURL                          |
| `SSKTS_ALLOWED_IPS`                 | false    |                  | IP制限IPリスト(カンマ区切り)              |
| `SSKTS_BASIC_AUTH_NAME`             | false    |                  | ベーシック認証ID                         |
| `SSKTS_BASIC_AUTH_PASS`             | false    |                  | ベーシック認証PASS                       |
| `WHITELIST`                         | false    |                  | XHR、iframeリクエスト許可(カンマ区切り)   |
| `HIDE_THEATERS`                     | false    |                  | スケジュール取得API非表示劇場(カンマ区切り)   |
| `CHANGE_API_TIME`                   | false    |                  | API切り替え期間(from, through)   |
| `CHANGE_API_THEATERS`               | false    |                  | API切り替え劇場branchCode(カンマ区切り)   |
| `SSKTS_API_ENDPOINT_2`              | false    |                  | スケジュール取得API非表示劇場(カンマ区切り)   |
| `DEBUG`                             | false    | sskts-frontend:* | デバッグ                                |
| `SCHEDULE_API_ENDPOINT`             | true     |                  | スケジュールAPIエンドポイント             |

## Azure Environment variables

| Name                                | Required | Value            | Purpose                                 |
|-------------------------------------|----------|------------------|-----------------------------------------|
| `WEBSITE_NODE_DEFAULT_VERSION`      | true     |                  | node.jsバージョン                        |
| `WEBSITE_TIME_ZONE`                 | true     |                  | タイムゾーン設定(Tokyo Standard Time)     |


# Build

ビルドは以下で実行できます。

```shell
npm run build
```

# Tests

構文チェックは以下で実行できます。

```shell
npm run check
```

<!-- UIテストは以下で実行できます。

```shell
npm ui-test
``` -->

<!-- # JsDoc

```shell
npm run jsdoc
```

`jsdocを作成できます。./docsに出力されます。 -->
