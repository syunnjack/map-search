const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const placesDir = path.join(root, "data", "places");
const regions = JSON.parse(fs.readFileSync(path.join(root, "data", "region-schema.json"), "utf8"));
const genres = JSON.parse(fs.readFileSync(path.join(root, "data", "genre-schema.json"), "utf8")).genres;
const prefectureIds = new Set(regions.prefectures.map((prefecture) => prefecture.id));
const genreIds = new Set(genres.map((genre) => genre.id));
const cityNamesByPrefecture = new Map(regions.prefectures.map((prefecture) => [
  prefecture.id,
  new Set(prefecture.municipalities.map((city) => city.name)),
]));
const requiredFields = ["id", "provider", "name", "prefecture", "municipality", "genre", "lat", "lng", "updatedAt"];

function walkJson(directory, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory()) walkJson(fullPath, files);
    if (item.isFile() && item.name.endsWith(".json")) files.push(fullPath);
  }
  return files;
}

const errors = [];
const ids = new Map();
const files = walkJson(placesDir);

files.forEach((file) => {
  const relative = path.relative(root, file);
  const payload = JSON.parse(fs.readFileSync(file, "utf8"));
  const places = Array.isArray(payload) ? payload : [payload];
  places.forEach((place, index) => {
    const label = `${relative}[${index}]`;
    requiredFields.forEach((field) => {
      if (place[field] === undefined || place[field] === null || place[field] === "") {
        errors.push(`${label} is missing ${field}`);
      }
    });
    if (place.id) {
      if (ids.has(place.id)) errors.push(`${label} duplicates id ${place.id} from ${ids.get(place.id)}`);
      ids.set(place.id, label);
    }
    if (place.prefecture && !prefectureIds.has(place.prefecture)) {
      errors.push(`${label} has unknown prefecture ${place.prefecture}`);
    }
    if (place.genre && !genreIds.has(place.genre)) {
      errors.push(`${label} has unknown genre ${place.genre}`);
    }
    if (place.prefecture && place.municipality && !cityNamesByPrefecture.get(place.prefecture)?.has(place.municipality)) {
      errors.push(`${label} has unknown municipality ${place.municipality} for ${place.prefecture}`);
    }
    if (!Number.isFinite(Number(place.lat)) || !Number.isFinite(Number(place.lng))) {
      errors.push(`${label} has invalid coordinates`);
    }
  });
});

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`validated ${ids.size} place records in ${files.length} files`);
