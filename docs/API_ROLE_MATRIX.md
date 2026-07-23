# API Role Matrix

全国展開では、1つのAPIに全機能を寄せず、検索意図ごとに役割を分ける。

## Core APIs

| 役割 | API | 主な用途 | 収益導線 |
| --- | --- | --- | --- |
| 店舗・施設検索 | Google Places API (New) | 店舗名、住所、評価、写真、Place ID、周辺検索 | 店舗詳細、ルート、公式情報への遷移 |
| 地図表示 | Leaflet + OpenStreetMap / Google Maps | 地図表示、ピン表示、現在地、ルート導線 | 目的地選択後の予約・宿泊・駐車場 |
| 飲食予約 | ホットペッパー グルメAPI | 飲食店検索、予約URL、クーポン、ジャンル | 飲食予約、クーポン |
| 宿泊予約 | 楽天トラベルAPI | 目的地周辺の宿泊候補、料金、評価、宿泊URL | 楽天アフィリエイト |
| 店舗公式管理 | Google Business Profile API | 権限のある店舗情報、投稿、口コミ、Place ID関連付け | 提携店舗の公式情報強化 |
| 周辺サービス | 各社アフィリエイトURL | 駐車場、タクシー、美容、レンタカーなど | 目的地別の追加収益 |

## Google Places API

使う場面:

- 全国の店舗・施設検索
- Google上の評価・住所・写真・営業時間の補完
- Place IDを軸に店舗詳細ページを作る

注意:

- 検索結果を保存・再利用する場合はGoogle Maps Platformの利用規約に従う。
- 表示フィールドはFieldMaskで必要最小限にする。
- 口コミ本文は扱い方に注意し、過度な再掲載を避ける。

実装:

- サーバー側: `api/places.js`
- 使用API: Text Search (New)
- エンドポイント: `POST https://places.googleapis.com/v1/places:searchText`
- 必須ヘッダー: `X-Goog-Api-Key`, `X-Goog-FieldMask`
- 現在のFieldMask: `id`, `displayName`, `formattedAddress`, `location`, `rating`, `googleMapsUri`, `primaryTypeDisplayName`, `businessStatus`
- 参照: https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places/searchText

## Google Business Profile API

使う場面:

- 自分または提携店舗のビジネスプロフィール管理
- 公式営業時間、投稿、写真、口コミ返信
- 店舗ロケーションとPlace IDの関連付け

注意:

- 権限のない全国店舗データを自由取得するAPIではない。
- Places APIとは役割を分ける。

MVP段階ではGBPのAPI呼び出しは入れず、提携店舗向けの管理機能として設計する。

## Hot Pepper API

使う場面:

- 飲食店ジャンルの予約導線
- クーポン・予算・個室・禁煙などの比較要素

注意:

- 対象は飲食店中心。
- 全国展開時は都道府県/中エリア/小エリアのマスタを活用する。

## Rakuten Travel API

使う場面:

- 目的地選択後の宿泊ニーズ
- 観光地、飲食店、駅周辺からホテル予約へ送客

設定:

- `RAKUTEN_TRAVEL_API_VERSION`: `20260731`
- `RAKUTEN_APPLICATION_ID`: 楽天アプリID
- `RAKUTEN_ACCESS_KEY`: 楽天アクセスキー
- `RAKUTEN_AFFILIATE_ID`: 楽天アフィリエイトID

## Expansion Rule

1. 店舗/施設を探す段階では、広告を前面に出しすぎない。
2. 目的地選択後に、予約・宿泊・駐車場・移動を出す。
3. エリアページはSEO/AIO/LLMO向けに静的化する。
4. 店舗詳細ページはPlace IDを主キーにする。
5. 公式提携店舗はGBP連携で情報の信頼性を上げる。
