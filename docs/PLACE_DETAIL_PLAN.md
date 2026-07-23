# Place Detail Plan

次の収益化強化は、Place IDを軸に店舗・施設詳細ページを作ること。

## URL

```text
/place/{provider}-{placeId}/
```

例:

```text
/place/google-ChIJ-example/
```

## Why

- Google Places API、ホットペッパーAPI、提携店舗データを1つの詳細ページに集約できる。
- 店舗名検索、エリア検索、ジャンル検索から同じ目的地ページへ送れる。
- 予約、ホテル、駐車場、タクシー、美容などの収益導線を目的地単位で最適化できる。
- GBP連携済み店舗では、公式情報の信頼性を上げられる。

## Data

基本形は `data/place-schema.json` に定義する。

主キー候補:

- `provider`
- `placeId`
- `id`

## Page Sections

1. 店舗・施設名
2. 住所・地図・現在地からのルート
3. 予約・公式URL
4. 周辺ホテル
5. 周辺駐車場
6. タクシー・移動
7. 口コミ・評価の概要
8. GBP連携済みの場合の公式情報

## Implementation Order

1. Places API検索結果に `placeId` を保持する。
2. `data/places/*.json` に提携またはキャッシュ対象の店舗を保存する。
3. `scripts/generate-place-pages.js` を追加する。
4. `/place/{id}/index.html` を生成する。
5. 検索結果の詳細ボタンを詳細ページへつなぐ。
