const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://map-search.example";
const regions = JSON.parse(fs.readFileSync(path.join(root, "data", "region-schema.json"), "utf8"));
const genres = JSON.parse(fs.readFileSync(path.join(root, "data", "genre-schema.json"), "utf8")).genres;
const placesDir = path.join(root, "data", "places");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function readPlaces() {
  if (!fs.existsSync(placesDir)) return [];
  return fs.readdirSync(placesDir)
    .filter((file) => file.endsWith(".json"))
    .flatMap((file) => {
      const payload = JSON.parse(fs.readFileSync(path.join(placesDir, file), "utf8"));
      return Array.isArray(payload) ? payload : [payload];
    });
}

function prefectureLabel(id) {
  return regions.prefectures.find((prefecture) => prefecture.id === id)?.name || id;
}

function genreLabel(id) {
  return genres.find((genre) => genre.id === id)?.label || id;
}

function directionsUrl(place) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${place.lat},${place.lng}`)}&travelmode=walking`;
}

function mapUrl(place) {
  const query = place.address || `${place.lat},${place.lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function searchUrl(place, genre) {
  return `../../index.html?prefecture=${encodeURIComponent(place.prefecture)}&city=${encodeURIComponent(place.municipality)}&genre=${encodeURIComponent(place.genre)}#map-service`;
}

function hotelFallbackUrl(place) {
  return `https://www.google.com/search?q=${encodeURIComponent(`楽天トラベル ${place.municipality} ホテル`)}`;
}

function jsonLd(place) {
  const type = ["izakaya", "cafe_food", "yakiniku", "cafe"].includes(place.genre) ? "Restaurant" : "LocalBusiness";
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    name: place.name,
    address: place.address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: place.lat,
      longitude: place.lng,
    },
    url: `${siteUrl}/place/${place.id}/`,
    sameAs: place.sourceUrl,
  };
  if (place.rating) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: place.rating,
      reviewCount: 1,
    };
  }
  return data;
}

function renderPlacePage(place) {
  const prefecture = prefectureLabel(place.prefecture);
  const genre = genreLabel(place.genre);
  const tags = (place.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  const title = `${place.name}の予約・行き方・周辺情報 | map-search`;
  const description = `${prefecture}${place.municipality}の${place.name}について、予約、現在地からの道案内、周辺ホテルや駐車場をまとめて確認できます。`;
  const reserveTarget = place.reservationUrl && place.reservationUrl.startsWith("#") ? "_self" : "_blank";

  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${siteUrl}/place/${escapeHtml(place.id)}/" />
    <link rel="stylesheet" href="../../styles.css" />
    <script src="../../config.js"></script>
    <script src="../../analytics.js"></script>
    <script src="../../place-detail.js" defer></script>
    <script type="application/ld+json">${JSON.stringify(jsonLd(place))}</script>
  </head>
  <body>
    <header class="header">
      <a class="logo" href="../../index.html"><span>MS</span>map-search</a>
      <nav class="nav" aria-label="主要メニュー">
        <a href="../../index.html#map-service">地図で探す</a>
        <a href="../../shizuoka/">静岡県</a>
        <a href="../../aichi/">愛知県</a>
        <a href="../../tokyo/">東京都</a>
      </nav>
    </header>
    <main data-place-detail data-city="${escapeHtml(place.municipality)}" data-hotel-url="${escapeHtml(hotelFallbackUrl(place))}">
      <section class="article-hero place-detail-hero">
        <p class="label">${escapeHtml(prefecture)} / ${escapeHtml(place.municipality)} / ${escapeHtml(genre)}</p>
        <h1>${escapeHtml(place.name)}</h1>
        <p class="lead">${escapeHtml(place.description || description)}</p>
        <div class="tag-row">${tags}</div>
      </section>
      <section class="content-section split-section">
        <div>
          <h2>予約と基本情報</h2>
          <p>${escapeHtml(place.offer || "予約情報と公式情報を確認できます。")}</p>
          <div class="info-list">
            <p><strong>住所</strong><br>${escapeHtml(place.address || `${prefecture}${place.municipality}`)}</p>
            <p><strong>評価</strong><br>★${escapeHtml(place.rating || "-")}</p>
            <p><strong>目安</strong><br>${escapeHtml(place.price || "現地情報を確認")}</p>
          </div>
          <div class="modal-actions">
            <a class="button primary" href="${escapeHtml(place.reservationUrl || place.sourceUrl || "#")}" target="${reserveTarget}" rel="noopener" data-track="reservation_click" data-place-id="${escapeHtml(place.id)}" data-category="${escapeHtml(place.genre)}">予約情報を見る</a>
            <a class="button secondary-light" href="${escapeHtml(place.sourceUrl || mapUrl(place))}" target="_blank" rel="noopener" data-track="source_click" data-place-id="${escapeHtml(place.id)}" data-category="${escapeHtml(place.genre)}">公式・掲載情報</a>
          </div>
        </div>
        <div>
          <h2>現在地から行く</h2>
          <p>地図アプリで現在地からのルートと所要時間を確認できます。</p>
          <div class="modal-actions">
            <a class="button primary" href="${escapeHtml(directionsUrl(place))}" target="_blank" rel="noopener" data-track="route_click" data-place-id="${escapeHtml(place.id)}" data-category="${escapeHtml(place.genre)}">ルートを開く</a>
            <a class="button secondary-light" href="${escapeHtml(mapUrl(place))}" target="_blank" rel="noopener" data-track="map_click" data-place-id="${escapeHtml(place.id)}" data-category="${escapeHtml(place.genre)}">地図で見る</a>
          </div>
        </div>
      </section>
      <section class="content-section">
        <h2>周辺サービス</h2>
        <div class="card-grid">
          <article class="card"><span class="num">Hotel</span><h3>近くのホテル</h3><p>目的地周辺の宿泊先を比較して、移動時間を短くできます。</p><div data-detail-hotels></div><a class="button secondary-light" href="../../index.html?prefecture=${escapeHtml(place.prefecture)}&city=${encodeURIComponent(place.municipality)}&genre=hotel#map-service" data-track="hotel_map_click" data-place-id="${escapeHtml(place.id)}" data-category="${escapeHtml(place.genre)}">地図でホテルを探す</a></article>
          <article class="card"><span class="num">Park</span><h3>近くの駐車場</h3><p>車で向かう場合に、目的地周辺の駐車場を先に確認できます。</p><a class="button secondary-light" href="../../index.html?prefecture=${escapeHtml(place.prefecture)}&city=${encodeURIComponent(place.municipality)}&genre=parking#map-service" data-track="parking_click" data-place-id="${escapeHtml(place.id)}" data-category="${escapeHtml(place.genre)}">駐車場を探す</a></article>
          <article class="card"><span class="num">Area</span><h3>同じ条件で探す</h3><p>${escapeHtml(place.municipality)}の${escapeHtml(genre)}を一覧と地図で探せます。</p><a class="button secondary-light" href="${escapeHtml(searchUrl(place, genre))}" data-track="related_search_click" data-place-id="${escapeHtml(place.id)}" data-category="${escapeHtml(place.genre)}">一覧に戻る</a></article>
        </div>
      </section>
    </main>
  </body>
</html>
`;
}

function updateSitemap(places) {
  const sitemapPath = path.join(root, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) return;
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/map-search\.example\/place\/[^<]+<\/loc>[\s\S]*?<\/url>/g, "");
  const entries = places.map((place) => `  <url>
    <loc>${siteUrl}/place/${place.id}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join("\n");
  sitemap = sitemap.replace("</urlset>", `${entries ? `\n${entries}\n` : ""}</urlset>`);
  fs.writeFileSync(sitemapPath, sitemap, "utf8");
}

const places = readPlaces();
places.forEach((place) => {
  const outputPath = path.join(root, "place", place.id, "index.html");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderPlacePage(place), "utf8");
});
updateSitemap(places);

console.log(`Generated ${places.length} place pages`);
