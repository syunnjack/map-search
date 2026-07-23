# Deployment

公開先は、静的SEOページと `/api/...` のサーバーレス関数を同時に扱えるVercelを第一候補にする。

## Why Vercel

- 静的HTMLをそのまま公開できる。
- `api/hotpepper.js`, `api/places.js`, `api/rakuten-travel.js` をサーバーレス関数として扱える。
- APIキーを環境変数に置ける。
- 生成済みの都道府県・市区町村・ジャンルページをそのままSEO入口にできる。

## Build Command

```text
npm run build
```

## Output

静的HTMLをルートに置いているため、出力ディレクトリ指定は不要。

## Environment Variables

```text
HOTPEPPER_API_KEY=
GOOGLE_PLACES_API_KEY=
RAKUTEN_TRAVEL_API_VERSION=20260731
RAKUTEN_APPLICATION_ID=
RAKUTEN_ACCESS_KEY=
RAKUTEN_AFFILIATE_ID=
```

## Production Config

公開時は `config.production.js` の値を `config.js` に反映する。

```js
API_PROXY_ENABLED: true,
API_BASE_URL: "",
HOTPEPPER_API_KEY: "",
GOOGLE_PLACES_API_KEY: "",
RAKUTEN_APPLICATION_ID: "",
RAKUTEN_ACCESS_KEY: "",
```

フロントにはAPIキーを置かず、Vercelの環境変数から `/api/...` が各APIへ接続する。

PowerShellで反映する場合:

```powershell
Copy-Item .\config.production.js .\config.js -Force
```

## Deploy Steps

```powershell
npm run build
vercel
vercel --prod
```

初回だけVercelログインとプロジェクト紐付けが必要。
