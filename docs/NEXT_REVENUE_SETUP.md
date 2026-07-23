# Next Revenue Setup

実IDを入れる段階で迷わないための接続順。

## Priority

1. ホットペッパーAPIキー
2. バリューコマースのSID/PIDまたは専用リンクテンプレート
3. 楽天トラベルAPIのApplication ID / Access Key / Affiliate ID
4. 駐車場予約の提携URL
5. タクシー・移動系の提携URL
6. 美容予約の提携URL

## Frontend MVP

`config.js` に直接入れると、ローカルのHTML表示で確認できます。

```js
window.MAP_SEARCH_CONFIG = {
  API_BASE_URL: "",
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
RAKUTEN_TRAVEL_API_VERSION=20260731
RAKUTEN_APPLICATION_ID=
RAKUTEN_ACCESS_KEY=
RAKUTEN_AFFILIATE_ID=
```

`config.js` は以下のようにします。

```js
API_BASE_URL: "",
HOTPEPPER_API_KEY: "",
RAKUTEN_APPLICATION_ID: "",
RAKUTEN_ACCESS_KEY: "",
```

同一ドメインに `/api/hotpepper` と `/api/rakuten-travel` を置く場合、`API_BASE_URL` は空のままで動きます。

別ドメインのAPIへ逃がす場合だけ `API_BASE_URL` に `https://api.example.com` のように設定します。
