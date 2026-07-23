# Next Revenue Setup

実IDを入れる段階で迷わないための接続順。

## Priority

1. ホットペッパーAPIキー
2. Google Places APIキー
3. バリューコマースのSID/PIDまたは専用リンクテンプレート
4. 楽天トラベルAPIのApplication ID / Access Key / Affiliate ID
5. 駐車場予約の提携URL
6. タクシー・移動系の提携URL
7. 美容予約の提携URL

## Frontend MVP

`config.js` に直接入れると、ローカルのHTML表示で確認できます。

```js
window.MAP_SEARCH_CONFIG = {
  API_PROXY_ENABLED: false,
  API_BASE_URL: "",
  GOOGLE_PLACES_API_KEY: "",
  HOTPEPPER_API_KEY: "",
  VALUECOMMERCE_SID: "",
  VALUECOMMERCE_PID: "",
  VALUECOMMERCE_URL_TEMPLATE: "",
  RAKUTEN_TRAVEL_API_VERSION: "20260731",
  RAKUTEN_APPLICATION_ID: "",
  RAKUTEN_ACCESS_KEY: "",
  RAKUTEN_AFFILIATE_ID: "",
  HOTEL_AFFILIATE_URL: "",
  PARKING_AFFILIATE_URL: "",
  TAXI_AFFILIATE_URL: "",
  BEAUTY_AFFILIATE_URL: "",
};
```

## Production

本番ではAPIキーをフロントに置かず、`.env` またはホスティング先の環境変数に置きます。

```text
HOTPEPPER_API_KEY=
GOOGLE_PLACES_API_KEY=
RAKUTEN_TRAVEL_API_VERSION=20260731
RAKUTEN_APPLICATION_ID=
RAKUTEN_ACCESS_KEY=
RAKUTEN_AFFILIATE_ID=
```

`config.js` は以下のようにします。

```js
API_PROXY_ENABLED: true,
API_BASE_URL: "",
GOOGLE_PLACES_API_KEY: "",
HOTPEPPER_API_KEY: "",
RAKUTEN_APPLICATION_ID: "",
RAKUTEN_ACCESS_KEY: "",
```

同一ドメインに `/api/hotpepper`、`/api/places`、`/api/rakuten-travel` を置く場合、`API_PROXY_ENABLED` を `true` にし、`API_BASE_URL` は空のままで動きます。

別ドメインのAPIへ逃がす場合だけ `API_BASE_URL` に `https://api.example.com` のように設定します。
