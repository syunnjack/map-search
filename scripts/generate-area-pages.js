const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const regions = JSON.parse(fs.readFileSync(path.join(root, "data", "region-schema.json"), "utf8"));
const genres = JSON.parse(fs.readFileSync(path.join(root, "data", "genre-schema.json"), "utf8")).genres;
const siteUrl = "https://map-search.example";

const activeGenreIds = ["izakaya", "cafe_food", "yakiniku", "hotel", "parking", "beauty", "clinic", "spot"];
const activeGenres = genres.filter((genre) => activeGenreIds.includes(genre.id));

function writeFile(relativePath, content) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function layout({ title, description, canonicalPath, label, h1, lead, body, jsonLd, depth }) {
  const prefix = "../".repeat(depth);
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${siteUrl}${canonicalPath}" />
    <link rel="stylesheet" href="${prefix}styles.css" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  </head>
  <body>
    <header class="header">
      <a class="logo" href="${prefix}index.html"><span>MS</span>map-search</a>
      <nav class="nav" aria-label="主要メニュー">
        <a href="${prefix}index.html#map-service">地図で探す</a>
        <a href="${prefix}shizuoka/">静岡県</a>
        <a href="${prefix}aichi/">愛知県</a>
        <a href="${prefix}tokyo/">東京都</a>
      </nav>
    </header>
    <main>
      <section class="article-hero">
        <p class="label">${escapeHtml(label)}</p>
        <h1>${escapeHtml(h1)}</h1>
        <p class="lead">${escapeHtml(lead)}</p>
      </section>
      ${body}
    </main>
  </body>
</html>
`;
}

function card(title, text, href, num = "Map") {
  return `<article class="card"><span class="num">${escapeHtml(num)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p><a class="button secondary-light" href="${escapeHtml(href)}">地図で探す</a></article>`;
}

function prefecturePage(prefecture) {
  const cityCards = prefecture.municipalities.map((city) => (
    card(city.name, `${city.name}の飲食店、施設、宿泊、移動先を地図から探せます。`, `./${city.slug}/`, city.name.replace(/市$|区$/, ""))
  )).join("");
  const genreCards = activeGenres.map((genre) => (
    card(genre.label, `${prefecture.name}の${genre.label}を一覧と地図で探します。`, `../index.html?prefecture=${prefecture.id}&genre=${genre.id}#map-service`, genre.label.slice(0, 2))
  )).join("");

  return layout({
    title: `${prefecture.name}のお店・施設を地図で探す | map-search`,
    description: `${prefecture.name}の市区町村とジャンルから、お店・施設・予約先・周辺サービスを地図で探せます。`,
    canonicalPath: `/${prefecture.slug}/`,
    label: `${prefecture.name} Map Search`,
    h1: `${prefecture.name}のお店・施設を地図で探す`,
    lead: "市区町村とジャンルを選んで、一覧と地図のピンから目的地を見つけられます。",
    depth: 1,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${prefecture.name}のお店・施設を地図で探す`,
      about: { "@type": "Place", name: prefecture.name },
    },
    body: `
      <section class="section">
        <div class="section-head"><p class="label">Genre Shortcuts</p><h2>ジャンルから探す</h2></div>
        <div class="cards four">${genreCards}</div>
      </section>
      <section class="section section-soft">
        <div class="section-head"><p class="label">Areas</p><h2>市区町村から探す</h2></div>
        <div class="cards four">${cityCards}</div>
      </section>
    `,
  });
}

function municipalityPage(prefecture, city) {
  const genreCards = activeGenres.map((genre) => (
    card(genre.label, `${city.name}の${genre.label}を一覧と地図で探します。`, `./${genre.slug}/`, genre.label.slice(0, 2))
  )).join("");

  return layout({
    title: `${city.name}のお店・施設を地図で探す | map-search`,
    description: `${city.name}の居酒屋、カフェ、焼肉、ホテル、駐車場、美容、クリニック、観光スポットを地図で探せます。`,
    canonicalPath: `/${prefecture.slug}/${city.slug}/`,
    label: `${city.name} Local Search`,
    h1: `${city.name}のお店・施設を地図で探す`,
    lead: `${prefecture.name}${city.name}の目的地を、ジャンル別の一覧と地図ピンから選べます。`,
    depth: 2,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${city.name}のお店・施設を地図で探す`,
      about: { "@type": "Place", name: city.name },
      isPartOf: { "@type": "WebSite", name: "map-search", url: siteUrl },
    },
    body: `
      <section class="section">
        <div class="section-head"><p class="label">Genre Shortcuts</p><h2>${escapeHtml(city.name)}のジャンル</h2></div>
        <div class="cards four">${genreCards}</div>
      </section>
    `,
  });
}

function genrePage(prefecture, city, genre) {
  const href = `../../../index.html?prefecture=${prefecture.id}&city=${encodeURIComponent(city.name)}&genre=${genre.id}#map-service`;

  return layout({
    title: `${city.name}の${genre.label}を地図で探す | map-search`,
    description: `${city.name}の${genre.label}を一覧と地図ピンで探し、予約、ルート、ホテル、駐車場などの周辺サービスへ進めます。`,
    canonicalPath: `/${prefecture.slug}/${city.slug}/${genre.slug}/`,
    label: `${city.name} ${genre.label}`,
    h1: `${city.name}の${genre.label}を地図で探す`,
    lead: "検索結果の一覧と地図ピンから目的地を選び、現在地からのルートや周辺サービスを確認できます。",
    depth: 3,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${city.name}の${genre.label}`,
      about: { "@type": "Place", name: city.name },
      mainEntity: { "@type": "ItemList", name: `${city.name} ${genre.label}` },
    },
    body: `
      <section class="section">
        <div class="diagnosis-box wide">
          <p class="label">Open Map</p>
          <h2>${escapeHtml(city.name)}の${escapeHtml(genre.label)}検索を開く</h2>
          <p class="muted">MVP検索画面で、一覧・地図ピン・ルート・予約リンクを確認できます。</p>
          <div class="actions"><a class="button primary" href="${escapeHtml(href)}">地図検索を開く</a></div>
        </div>
      </section>
      <section class="section section-soft">
        <div class="cards three">
          <article class="card"><span class="num">一覧</span><h3>候補を比較</h3><p>エリアとジャンルに合う候補を一覧で確認できます。</p></article>
          <article class="card"><span class="num">地図</span><h3>ピンで選択</h3><p>目的地を地図上で選び、位置関係を見ながら判断できます。</p></article>
          <article class="card"><span class="num">予約</span><h3>周辺サービスへ</h3><p>予約、ホテル、駐車場、移動サービスへ進めます。</p></article>
        </div>
      </section>
    `,
  });
}

const sitemapUrls = ["/"];

regions.prefectures.forEach((prefecture) => {
  writeFile(path.join(prefecture.slug, "index.html"), prefecturePage(prefecture));
  sitemapUrls.push(`/${prefecture.slug}/`);

  prefecture.municipalities.forEach((city) => {
    writeFile(path.join(prefecture.slug, city.slug, "index.html"), municipalityPage(prefecture, city));
    sitemapUrls.push(`/${prefecture.slug}/${city.slug}/`);

    activeGenres.forEach((genre) => {
      writeFile(path.join(prefecture.slug, city.slug, genre.slug, "index.html"), genrePage(prefecture, city, genre));
      sitemapUrls.push(`/${prefecture.slug}/${city.slug}/${genre.slug}/`);
    });
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url>
    <loc>${siteUrl}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>
`;

writeFile("sitemap.xml", sitemap);

console.log(`Generated ${sitemapUrls.length - 1} area pages and sitemap.xml`);
