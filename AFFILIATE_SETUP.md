# 収益導線の設定

`config.js` に各サービスのアフィリエイトURLを設定すると、右側の予約・周辺情報パネルに反映されます。

```js
window.MAP_SEARCH_CONFIG = {
  API_BASE_URL: "",
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

本番では `API_BASE_URL` に同一ドメインまたはサーバーレスAPIのURLを設定し、APIキーはサーバー側の環境変数に置きます。

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

## 楽天トラベルAPI

ホテル予約は楽天トラベルキーワード検索APIに対応しています。

`API_BASE_URL` を使わないMVP確認では、`RAKUTEN_APPLICATION_ID` と `RAKUTEN_ACCESS_KEY` を設定すると、目的地を選んだ後の右側パネルに楽天トラベルのホテル候補が表示されます。

`RAKUTEN_AFFILIATE_ID` を設定すると、楽天APIの返却URLがアフィリエイトURLになります。

楽天トラベルAPIの公式仕様では、現行版 `20260731` において `applicationId` と `accessKey` が必須で、`affiliateId` は任意です。

`RAKUTEN_TRAVEL_API_VERSION` は通常 `20260731` のままで運用します。
