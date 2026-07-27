# Hot Pepper Place Import

ホットペッパーAPIで取得した店舗を `data/places/*.json` に保存し、店舗詳細ページとして生成するための手順です。

## 取得済みJSONから取り込む

Hot Pepper APIのレスポンスJSONを保存している場合:

```powershell
node scripts/import-hotpepper-places.js `
  --input .\tmp\hotpepper-shizuoka-izakaya.json `
  --prefecture shizuoka `
  --city 静岡市 `
  --genre izakaya `
  --out .\data\places\hotpepper-shizuoka-izakaya.json
```

その後、詳細ページを生成します。

```powershell
npm run build
```

## APIから直接取り込む

PowerShellでAPIキーを環境変数に入れて実行します。

```powershell
$env:HOTPEPPER_API_KEY="リクルートAPIキー"
$env:VALUECOMMERCE_URL_TEMPLATE="バリューコマースのURLテンプレート"

node scripts/import-hotpepper-places.js `
  --api `
  --prefecture shizuoka `
  --city 静岡市 `
  --genre izakaya `
  --count 20 `
  --out .\data\places\hotpepper-shizuoka-izakaya.json

npm run build
```

`VALUECOMMERCE_URL_TEMPLATE` は任意です。設定すると、ホットペッパーの店舗URLを `{url}` に入れてラップします。

```powershell
$env:VALUECOMMERCE_URL_TEMPLATE="https://example.com/track?u={url}"
```

## 対応ジャンル

現時点でHot Pepper APIのジャンルコードに変換する対象:

- `izakaya`: 居酒屋
- `cafe_food`: カフェ・スイーツ
- `yakiniku`: 焼肉・ホルモン

## 生成されるページ

取り込んだ店舗は以下のURL形式で生成されます。

```text
/place/hotpepper-{shop.id}/
```

ページ内には以下を表示します。

- 予約情報
- 住所、予算、評価
- 写真
- アクセス、営業時間、定休日
- 現在地からのルート
- 周辺ホテル
- 周辺駐車場
- 同じエリア・ジャンルの一覧
