const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const regions = JSON.parse(fs.readFileSync(path.join(root, "data", "region-schema.json"), "utf8"));
const genres = JSON.parse(fs.readFileSync(path.join(root, "data", "genre-schema.json"), "utf8")).genres;
const defaultOutput = path.join(root, "data", "places", "hotpepper-generated.json");
const hotpepperEndpoint = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function showHelp() {
  console.log(`Usage:
  node scripts/import-hotpepper-places.js --input hotpepper.json --prefecture shizuoka --city 静岡市 --genre izakaya
  node scripts/import-hotpepper-places.js --api --prefecture shizuoka --city 静岡市 --genre izakaya --count 20

Options:
  --input       Hot Pepper API JSON response file
  --api         Fetch from Hot Pepper API using HOTPEPPER_API_KEY
  --prefecture  Prefecture ID in data/region-schema.json
  --city        Municipality name
  --genre       Site genre ID such as izakaya, cafe_food, yakiniku
  --count       API fetch count, default 20
  --out         Output JSON path, default data/places/hotpepper-generated.json
  --dry-run     Show import count without writing files
`);
}

function slugify(value) {
  return String(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9ぁ-んァ-ヶ一-龠]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function ensurePrefecture(id) {
  const prefecture = regions.prefectures.find((item) => item.id === id);
  if (!prefecture) throw new Error(`Unknown prefecture: ${id}`);
  return prefecture;
}

function ensureCity(prefecture, cityName) {
  if (!cityName || cityName === "all") return prefecture.municipalities[0]?.name || prefecture.name;
  const city = prefecture.municipalities.find((item) => item.name === cityName);
  if (!city) throw new Error(`Unknown city for ${prefecture.id}: ${cityName}`);
  return city.name;
}

function ensureGenre(id) {
  const genre = genres.find((item) => item.id === id);
  if (!genre) throw new Error(`Unknown genre: ${id}`);
  return genre;
}

function hotpepperGenreCode(siteGenreId) {
  return {
    izakaya: "G001",
    cafe_food: "G014",
    yakiniku: "G008",
  }[siteGenreId] || "";
}

function affiliateUrl(url) {
  const template = process.env.VALUECOMMERCE_URL_TEMPLATE || "";
  if (!template || !url) return url || "";
  return template.replaceAll("{url}", encodeURIComponent(url));
}

function shopToPlace(shop, context) {
  const shopUrl = shop.urls?.pc || shop.coupon_urls?.pc || "";
  const photo = shop.photo?.pc?.l || shop.photo?.pc?.m || shop.logo_image || "";
  const genreName = shop.genre?.name || context.genre.label;
  const tags = [
    shop.station_name ? `${shop.station_name}駅` : "",
    shop.budget?.average || "",
    shop.wifi === "あり" ? "Wi-Fi" : "",
    shop.private_room === "あり" ? "個室" : "",
    shop.card === "利用可" ? "カード可" : "",
    shop.non_smoking && shop.non_smoking !== "なし" ? "禁煙席" : "",
  ].filter(Boolean);
  const id = `hotpepper-${shop.id || slugify(shop.name)}`;

  return {
    id,
    placeId: shop.id || id,
    provider: "hotpepper",
    name: shop.name,
    prefecture: context.prefecture.id,
    municipality: context.city,
    genre: context.genre.id,
    lat: Number(shop.lat),
    lng: Number(shop.lng),
    address: shop.address || `${context.prefecture.name}${context.city}`,
    rating: "HP",
    sourceUrl: affiliateUrl(shopUrl),
    reservationUrl: affiliateUrl(shopUrl),
    updatedAt: new Date().toISOString().slice(0, 10),
    price: shop.budget?.average || "予算情報あり",
    tags,
    description: shop.catch || shop.genre?.catch || shop.access || "ホットペッパー掲載店です。",
    offer: shop.ktai_coupon === "0" || shop.coupon_urls?.pc ? "クーポンあり" : "予約ページあり",
    image: photo,
    access: shop.access || "",
    open: shop.open || "",
    close: shop.close || "",
    categoryLabel: genreName,
  };
}

function readShopsFromPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results?.shop)) return payload.results.shop;
  if (Array.isArray(payload?.shop)) return payload.shop;
  throw new Error("Input JSON does not contain Hot Pepper shops");
}

async function fetchHotpepperShops(context, count) {
  const apiKey = process.env.HOTPEPPER_API_KEY;
  if (!apiKey) throw new Error("HOTPEPPER_API_KEY is required when using --api");
  const params = new URLSearchParams({
    key: apiKey,
    format: "json",
    count: String(count || 20),
    keyword: context.city,
  });
  const genreCode = hotpepperGenreCode(context.genre.id);
  if (genreCode) params.set("genre", genreCode);
  const response = await fetch(`${hotpepperEndpoint}?${params.toString()}`);
  if (!response.ok) throw new Error(`Hot Pepper API failed: ${response.status}`);
  const payload = await response.json();
  return readShopsFromPayload(payload);
}

function mergePlaces(existing, incoming) {
  const map = new Map();
  existing.forEach((place) => map.set(place.id, place));
  incoming.forEach((place) => map.set(place.id, place));
  return [...map.values()].sort((a, b) => a.id.localeCompare(b.id));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) {
    showHelp();
    return;
  }

  const prefecture = ensurePrefecture(args.prefecture || "shizuoka");
  const city = ensureCity(prefecture, args.city || prefecture.municipalities[0]?.name);
  const genre = ensureGenre(args.genre || "izakaya");
  const output = path.resolve(root, args.out || defaultOutput);
  const context = { prefecture, city, genre };

  let shops;
  if (args.api) {
    shops = await fetchHotpepperShops(context, Number(args.count || 20));
  } else {
    if (!args.input) throw new Error("--input is required unless --api is used");
    const payload = JSON.parse(fs.readFileSync(path.resolve(root, args.input), "utf8"));
    shops = readShopsFromPayload(payload);
  }

  const incoming = shops
    .map((shop) => shopToPlace(shop, context))
    .filter((place) => place.name && Number.isFinite(place.lat) && Number.isFinite(place.lng));
  if (args["dry-run"]) {
    console.log(`Ready to import ${incoming.length} Hot Pepper places for ${prefecture.name} ${city} ${genre.label}`);
    return;
  }

  const existing = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output, "utf8")) : [];
  const merged = mergePlaces(Array.isArray(existing) ? existing : [existing], incoming);

  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  console.log(`Imported ${incoming.length} Hot Pepper places into ${path.relative(root, output)}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = {
  affiliateUrl,
  ensureCity,
  ensureGenre,
  ensurePrefecture,
  fetchHotpepperShops,
  hotpepperGenreCode,
  mergePlaces,
  parseArgs,
  readShopsFromPayload,
  shopToPlace,
  slugify,
};
