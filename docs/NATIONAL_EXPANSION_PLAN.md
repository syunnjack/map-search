# National Expansion Plan

静岡MVPを全国展開するためのページ構造、データ構造、収益導線の計画。

## URL Structure

| ページ種別 | URL例 | 目的 |
| --- | --- | --- |
| 都道府県トップ | `/shizuoka/` | 静岡県内の主要エリアとジャンル一覧 |
| 市区町村トップ | `/shizuoka/hamamatsu/` | 浜松市内のジャンル別検索 |
| ジャンルページ | `/shizuoka/hamamatsu/izakaya/` | 浜松市の居酒屋検索 |
| 目的地ページ | `/place/{placeId}/` | 店舗・施設の詳細、予約、ルート |
| ルートページ | `/route/{from}/{to}/` | 現在地・駅・観光地から目的地への導線 |
| 周辺サービス | `/nearby/parking/shizuoka/hamamatsu/` | 駐車場、ホテル、タクシーなど |

## Data Hierarchy

```text
Country
  Prefecture
    Municipality
      Area / Station
        Genre
          Place
            Routes
            Affiliate Actions
            SEO/AIO/LLMO Metadata
```

## Page Generation Priority

1. 静岡県
2. 愛知県
3. 東京都
4. 大阪府
5. 福岡県
6. 全国主要観光地
7. 全国主要駅

## Initial Genre Priority

1. 居酒屋
2. 焼肉
3. カフェ
4. 海鮮・ランチ
5. ホテル
6. 駐車場
7. 美容サロン
8. クリニック
9. コワーキング
10. 観光スポット

## SEO / AIO / LLMO Requirements

各ページに以下を持たせる。

- 固有の`title`
- 固有の`description`
- エリアとジャンルの説明
- 店舗/施設一覧
- 地図とピン
- 目的地選択後のルート
- 予約・宿泊・駐車場・移動の収益導線
- FAQ
- `LocalBusiness` / `Restaurant` / `Hotel` / `Place` 構造化データ
- llms.txt向けのページ説明

## Google Business Profile Strategy

GBPは以下に使う。

- 提携店舗の公式情報管理
- 店舗とPlace IDの関連付け
- 口コミ管理
- 投稿・写真の更新
- 店舗詳細ページの信頼性向上

全国の無関係店舗データ取得には使わず、Places APIや各予約APIと分担する。

## Revenue Timing

ユーザー行動に合わせる。

1. 検索前: エリア/ジャンル選択のみ
2. 検索後: 一覧と地図ピン
3. 目的地選択後: 予約、クーポン、ホテル、駐車場、タクシー
4. ルート確認後: 駐車場、ホテル、タクシー、レンタカー
5. 詳細確認後: 公式情報、口コミ、予約

## MVP To Nationwide Checklist

- [ ] 楽天トラベルAPIを現行版に更新
- [ ] APIロールマトリクスを固定
- [x] 都道府県データをJSON化
- [x] 市区町村データをJSON化
- [x] ジャンルマスタをJSON化
- [x] 静岡ページをテンプレート化
- [x] 愛知県に横展開
- [x] Google Places API連携をサーバー側に移す
- [ ] GBP連携は提携店舗向け管理機能として設計
- [x] GBP連携は提携店舗向け管理機能として設計
- [ ] GitHub Pages / Vercel / Sites の公開導線を決める
