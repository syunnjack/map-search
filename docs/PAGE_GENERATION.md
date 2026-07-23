# Page Generation

都道府県、市区町村、ジャンルページは `data/region-schema.json` と `data/genre-schema.json` から生成する。

## Command

```powershell
node scripts/generate-area-pages.js
```

検証までまとめて実行する場合:

```powershell
npm run build
```

## Generated Pages

現在のデータでは以下を生成する。

- 都道府県トップ: `/shizuoka/`, `/aichi/`, `/tokyo/`
- 市区町村トップ: `/{prefecture}/{municipality}/`
- ジャンルページ: `/{prefecture}/{municipality}/{genre}/`
- `sitemap.xml`

## Search Handoff

生成ページのボタンは、MVP検索画面へ以下の形式で渡す。

```text
index.html?prefecture=aichi&city=名古屋市&genre=izakaya#map-service
```

`script.js` 側はURLパラメータを読み取り、都道府県、市区町村、ジャンルのセレクトへ反映する。

## Adding A Prefecture

1. `data/region-schema.json` に都道府県を追加する。
2. `script.js` の `regions` に同じ都道府県を追加する。
3. 必要ならMVP用の `samplePlaces` を数件追加する。
4. `node scripts/generate-area-pages.js` を実行する。
5. `sitemap.xml` と生成ページを確認する。

## Next Improvement

次の段階では `script.js` の `regions` もJSONから読み込む構成へ寄せる。そうすると、都道府県追加時の二重管理を減らせる。

## Validation

`scripts/validate-site.js` は以下を確認する。

- 生成HTMLの検索画面ハンドオフURLに不正な都道府県がない
- 不正な市区町村がない
- 不正なジャンルがない
- `sitemap.xml` に生成対象URLが入っている
