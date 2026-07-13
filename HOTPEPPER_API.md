# ホットペッパーAPI設定

このMVPは、ホットペッパー グルメサーチAPIに対応しています。

## 設定方法

`config.js` の `HOTPEPPER_API_KEY` に、リクルートWEBサービスで取得したAPIキーを入れます。

```js
window.MAP_SEARCH_CONFIG = {
  HOTPEPPER_API_KEY: "取得したAPIキー",
  VALUECOMMERCE_SID: "あなたのsid",
  VALUECOMMERCE_PID: "あなたのpid",
  VALUECOMMERCE_URL_TEMPLATE: "",
};
```

## バリューコマースリンク

`VALUECOMMERCE_SID` と `VALUECOMMERCE_PID` を設定すると、ホットペッパーの店舗URLを以下の形式でラップします。

```text
https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=...&pid=...&vc_url=...
```

もし管理画面で取得したリンク形式が異なる場合は、`VALUECOMMERCE_URL_TEMPLATE` に `{url}` を含むテンプレートを入れてください。

```js
VALUECOMMERCE_URL_TEMPLATE: "https://example.com/track?u={url}"
```

## 使っているAPI

- グルメサーチAPI
- エンドポイント: `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/`
- 主なパラメータ: `key`, `lat`, `lng`, `range`, `genre`, `format=json`, `count`

公式リファレンス: https://webservice.recruit.co.jp/doc/hotpepper/reference.html

## 注意

フロントエンドにAPIキーを置く構成はMVP確認用です。本番ではAPIキー保護のため、サーバーまたはサーバーレス関数経由で呼び出してください。
