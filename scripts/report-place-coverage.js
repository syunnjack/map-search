const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const placesDir = path.join(root, "data", "places");
const regions = JSON.parse(fs.readFileSync(path.join(root, "data", "region-schema.json"), "utf8"));
const genres = JSON.parse(fs.readFileSync(path.join(root, "data", "genre-schema.json"), "utf8")).genres;

function walkJson(directory, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory()) walkJson(fullPath, files);
    if (item.isFile() && item.name.endsWith(".json")) files.push(fullPath);
  }
  return files;
}

function readPlaces() {
  return walkJson(placesDir).flatMap((file) => {
    const payload = JSON.parse(fs.readFileSync(file, "utf8"));
    return (Array.isArray(payload) ? payload : [payload]).map((place) => ({
      ...place,
      _file: path.relative(root, file),
    }));
  });
}

function label(collection, id, fallback = id) {
  return collection.find((item) => item.id === id)?.name || collection.find((item) => item.id === id)?.label || fallback;
}

function line(key, count) {
  return `${String(count).padStart(4, " ")}  ${key}`;
}

const places = readPlaces();
const byPrefecture = new Map();
const byGenre = new Map();
const byProvider = new Map();
const byCityGenre = new Map();

places.forEach((place) => {
  const prefectureName = label(regions.prefectures, place.prefecture);
  const genreName = label(genres, place.genre);
  const cityGenre = `${prefectureName} ${place.municipality || "-"} ${genreName}`;
  byPrefecture.set(prefectureName, (byPrefecture.get(prefectureName) || 0) + 1);
  byGenre.set(genreName, (byGenre.get(genreName) || 0) + 1);
  byProvider.set(place.provider || "unknown", (byProvider.get(place.provider || "unknown") || 0) + 1);
  byCityGenre.set(cityGenre, (byCityGenre.get(cityGenre) || 0) + 1);
});

console.log(`Places: ${places.length}`);
console.log("\nBy provider");
[...byProvider.entries()].sort().forEach(([key, count]) => console.log(line(key, count)));
console.log("\nBy prefecture");
[...byPrefecture.entries()].sort().forEach(([key, count]) => console.log(line(key, count)));
console.log("\nBy genre");
[...byGenre.entries()].sort().forEach(([key, count]) => console.log(line(key, count)));
console.log("\nBy city and genre");
[...byCityGenre.entries()].sort().forEach(([key, count]) => console.log(line(key, count)));
