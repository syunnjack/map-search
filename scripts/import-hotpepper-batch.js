const fs = require("fs");
const path = require("path");
const {
  ensureGenre,
  ensurePrefecture,
  fetchHotpepperShops,
  mergePlaces,
  parseArgs,
  shopToPlace,
  slugify,
} = require("./import-hotpepper-places");

const root = path.resolve(__dirname, "..");
const regions = JSON.parse(fs.readFileSync(path.join(root, "data", "region-schema.json"), "utf8"));
const defaultGenres = ["izakaya", "cafe_food", "yakiniku"];

function showHelp() {
  console.log(`Usage:
  node scripts/import-hotpepper-batch.js --prefecture shizuoka --genres izakaya,cafe_food,yakiniku --count 20

Options:
  --prefecture  Prefecture ID, default shizuoka
  --cities      Comma separated municipality names, default all in prefecture
  --genres      Comma separated genre IDs, default izakaya,cafe_food,yakiniku
  --count       API fetch count per city and genre, default 20
  --out-dir     Output directory, default data/places/hotpepper
  --dry-run     Print target matrix without calling API or writing files
`);
}

function outputName(prefectureId, cityName, genreId) {
  return `${prefectureId}-${slugify(cityName)}-${genreId}.json`;
}

function splitCsv(value, fallback) {
  if (!value) return fallback;
  return String(value).split(",").map((item) => item.trim()).filter(Boolean);
}

function uniqueByName(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

async function importTarget({ prefecture, cityName, genre, count, outDir }) {
  const context = { prefecture, city: cityName, genre };
  const shops = await fetchHotpepperShops(context, count);
  const incoming = shops
    .map((shop) => shopToPlace(shop, context))
    .filter((place) => place.name && Number.isFinite(place.lat) && Number.isFinite(place.lng));
  const output = path.join(outDir, outputName(prefecture.id, cityName, genre.id));
  const existing = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output, "utf8")) : [];
  const merged = mergePlaces(Array.isArray(existing) ? existing : [existing], incoming);

  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  return {
    file: path.relative(root, output),
    fetched: shops.length,
    imported: incoming.length,
    total: merged.length,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) {
    showHelp();
    return;
  }

  const prefecture = ensurePrefecture(args.prefecture || "shizuoka");
  const region = regions.prefectures.find((item) => item.id === prefecture.id);
  const selectedCities = uniqueByName(splitCsv(args.cities, region.municipalities.map((city) => city.name)).map((name) => ({ name })));
  const selectedGenres = splitCsv(args.genres, defaultGenres).map(ensureGenre);
  const count = Number(args.count || 20);
  const outDir = path.resolve(root, args["out-dir"] || path.join("data", "places", "hotpepper"));
  const targets = selectedCities.flatMap((city) => selectedGenres.map((genre) => ({
    prefecture,
    cityName: city.name,
    genre,
    count,
    outDir,
  })));

  if (args["dry-run"]) {
    console.log(`Hot Pepper batch targets: ${targets.length}`);
    targets.forEach((target) => {
      console.log(`- ${prefecture.name} ${target.cityName} ${target.genre.label} -> ${path.relative(root, path.join(outDir, outputName(prefecture.id, target.cityName, target.genre.id)))}`);
    });
    return;
  }

  const results = [];
  for (const target of targets) {
    const result = await importTarget(target);
    results.push(result);
    console.log(`Imported ${result.imported}/${result.fetched} -> ${result.file} (${result.total} total)`);
  }

  const imported = results.reduce((total, result) => total + result.imported, 0);
  const total = results.reduce((sum, result) => sum + result.total, 0);
  console.log(`Batch complete: ${results.length} files, ${imported} imported, ${total} total saved places`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
