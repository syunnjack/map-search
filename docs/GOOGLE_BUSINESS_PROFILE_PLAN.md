# Google Business Profile Plan

Google Business Profileは、全国の店舗情報を自由取得する用途ではなく、提携店舗の公式情報管理に使う。

## Role

| 項目 | 使い方 |
| --- | --- |
| 店舗検索 | Google Places API |
| 店舗の公式情報 | Google Business Profile API |
| 口コミ返信 | GBP連携後の店舗管理機能 |
| 投稿・写真更新 | 提携店舗向け管理画面 |
| Place ID関連付け | Places APIの店舗詳細とGBP管理対象店舗を紐付け |

## MVP Scope

今は以下までに留める。

- Places APIで検索候補を取得
- Place IDを店舗詳細ページの主キー候補にする
- 提携店舗のみGBP連携対象にする
- GBP OAuth、権限管理、口コミ返信は管理画面フェーズで実装する

## Future Data Flow

```text
User Search
  -> Places API
  -> Place detail page
  -> Affiliate actions
  -> Partner shop claim
  -> GBP OAuth
  -> Official info / review reply / posts
```

## Safety

- 権限のない店舗のGBP情報を取得しない。
- 口コミ本文の再掲載は規約と表示ポリシーを確認して最小限にする。
- Place ID、公式URL、営業時間、予約URLの整合性を優先する。
