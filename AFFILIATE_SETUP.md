# 収益導線の設定

`config.js` に各サービスのアフィリエイトURLを設定すると、右側の予約・周辺情報パネルに反映されます。

```js
window.MAP_SEARCH_CONFIG = {
  API_PROXY_ENABLED: false,
  API_BASE_URL: "",
  GOOGLE_PLACES_API_KEY: "",
  HOTPEPPER_API_KEY: "リクルートAPIキー",
  VALUECOMMERCE_SID: "バリューコマースSID",
  VALUECOMMERCE_PID: "バリューコマースPID",
  VALUECOMMERCE_URL_TEMPLATE: "",
  RAKUTEN_TRAVEL_API_VERSION: "20260731",
  RAKUTEN_APPLICATION_ID: "楽天アプリID",
  RAKUTEN_ACCESS_KEY: "楽天アクセスキー",
  RAKUTEN_AFFILIATE_ID: "楽天アフィリエイトID",
  HOTEL_AFFILIATE_URL: "ホテル予約の提携URL",
  PARKING_AFFILIATE_URL: "駐車場予約の提携URL",
  TAXI_AFFILIATE_URL: "タクシー・移動系の提携URL",
  BEAUTY_AFFILIATE_URL: "美容予約の提携URL",
};
```

本番では `API_PROXY_ENABLED` を `true` にし、APIキーはサーバー側の環境変数に置きます。

同一ドメインの `/api/...` を使う場合:

```js
API_PROXY_ENABLED: true,
API_BASE_URL: "",
```

別ドメインのAPIへ逃がす場合:

```js
API_PROXY_ENABLED: true,
API_BASE_URL: "https://api.example.com",
```

提携URLには以下の置換タグを使えます。

- `{name}`: 選択中のお店・施設名
- `{city}`: 市町村
- `{category}`: ジャンル名
- `{lat}`: 緯度
- `{lng}`: 経度

例:

```js
HOTEL_AFFILIATE_URL: "https://example.com/hotel?area={city}&keyword={name}"
```

未設定の場合は、通常のGoogle検索やGoogle Maps検索にフォールバックします。

## 収益リンクの接続場所

目的地を選んだ後の右側パネルには、以下の順番でリンクが出ます。

| 表示 | 設定キー | 主な用途 |
| --- | --- | --- |
| ネット予約へ進む | ホットペッパーAPIの店舗URL + バリューコマース | 飲食予約 |
| クーポンを見る | ホットペッパーAPIの店舗URL + バリューコマース | クーポン・空席確認 |
| 近くの駐車場 | `PARKING_AFFILIATE_URL` | 駐車場予約 |
| 近くのホテル | `HOTEL_AFFILIATE_URL` または楽天トラベルAPI | 宿泊予約 |
| タクシー・移動 | `TAXI_AFFILIATE_URL` | 移動系 |
| 美容予約 | `BEAUTY_AFFILIATE_URL` | 美容サロン予約 |

設定例:

```js
PARKING_AFFILIATE_URL: "https://example.com/parking?area={city}&keyword={name}",
TAXI_AFFILIATE_URL: "https://example.com/taxi?area={city}",
BEAUTY_AFFILIATE_URL: "https://example.com/beauty?area={city}&keyword={category}",
```

`VALUECOMMERCE_URL_TEMPLATE` を使う場合は、最終遷移先を `{url}` に入れてラップします。

```js
VALUECOMMERCE_URL_TEMPLATE: "https://example.com/track?u={url}"
```

## 楽天トラベルAPI

ホテル予約は楽天トラベルキーワード検索APIに対応しています。

`API_BASE_URL` を使わないMVP確認では、`RAKUTEN_APPLICATION_ID` と `RAKUTEN_ACCESS_KEY` を設定すると、目的地を選んだ後の右側パネルに楽天トラベルのホテル候補が表示されます。

`RAKUTEN_AFFILIATE_ID` を設定すると、楽天APIの返却URLがアフィリエイトURLになります。

楽天トラベルAPIの公式仕様では、現行版 `20260731` において `applicationId` と `accessKey` が必須で、`affiliateId` は任意です。

`RAKUTEN_TRAVEL_API_VERSION` は通常 `20260731` のままで運用します。

## Google Places API

飲食店以外のカフェ、作業場所、美容、クリニック、観光スポットは、本番では `api/places.js` 経由で Google Places API (New) に接続します。

環境変数:

```text
GOOGLE_PLACES_API_KEY=
```

フロント側の `GOOGLE_PLACES_API_KEY` はMVP実験用の予備項目です。本番では空にして、サーバー側だけにキーを置きます。
