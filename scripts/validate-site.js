const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const regions = JSON.parse(fs.readFileSync(path.join(root, "data", "region-schema.json"), "utf8"));
const genres = JSON.parse(fs.readFileSync(path.join(root, "data", "genre-schema.json"), "utf8")).genres;
const validPrefectures = new Set(regions.prefectures.map((prefecture) => prefecture.id));
const validGenres = new Set(["hotpepper", "cafe", "work", ...genres.map((genre) => genre.id)]);
const validCities = new Set();

regions.prefectures.forEach((prefecture) => {
  prefecture.municipalities.forEach((city) => validCities.add(city.name));
});

function walk(directory, files = []) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", ".agents", ".codex", "work", "outputs", "node_modules"].includes(item.name)) continue;
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory()) walk(fullPath, files);
    if (item.isFile() && item.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function decodeHtmlUrl(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

const htmlFiles = walk(root);
const errors = [];

htmlFiles.forEach((filePath) => {
  const html = fs.readFileSync(filePath, "utf8");
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => decodeHtmlUrl(match[1]));
  hrefs.forEach((href) => {
    if (!href.includes("index.html?")) return;
    const query = href.split("?")[1]?.split("#")[0] || "";
    const params = new URLSearchParams(query);
    const prefecture = params.get("prefecture");
    const city = params.get("city");
    const genre = params.get("genre");
    if (prefecture && !validPrefectures.has(prefecture)) {
      errors.push(`${path.relative(root, filePath)} has invalid prefecture: ${prefecture}`);
    }
    if (city && !validCities.has(city)) {
      errors.push(`${path.relative(root, filePath)} has invalid city: ${city}`);
    }
    if (genre && !validGenres.has(genre)) {
      errors.push(`${path.relative(root, filePath)} has invalid genre: ${genre}`);
    }
  });
});

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedMinimum = 1 + regions.prefectures.reduce((total, prefecture) => {
  return total + 1 + prefecture.municipalities.length + prefecture.municipalities.length * 8;
}, 0);

if (sitemapUrls.length < expectedMinimum) {
  errors.push(`sitemap has ${sitemapUrls.length} urls; expected at least ${expectedMinimum}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`validated ${htmlFiles.length} html files and ${sitemapUrls.length} sitemap urls`);
