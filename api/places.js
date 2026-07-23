const PLACES_TEXT_SEARCH_ENDPOINT = "https://places.googleapis.com/v1/places:searchText";
const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.rating",
  "places.googleMapsUri",
  "places.primaryTypeDisplayName",
  "places.businessStatus",
].join(",");

module.exports = async function handler(request, response) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    response.status(500).json({ error: "GOOGLE_PLACES_API_KEY is not configured" });
    return;
  }

  const requestUrl = new URL(request.url, "https://map-search.local");
  const keyword = requestUrl.searchParams.get("keyword") || "";
  const includedType = requestUrl.searchParams.get("type") || "";
  const south = Number(requestUrl.searchParams.get("south"));
  const west = Number(requestUrl.searchParams.get("west"));
  const north = Number(requestUrl.searchParams.get("north"));
  const east = Number(requestUrl.searchParams.get("east"));

  if (!keyword) {
    response.status(400).json({ error: "keyword is required" });
    return;
  }

  const body = {
    textQuery: keyword,
    languageCode: "ja",
    regionCode: "JP",
    maxResultCount: 20,
  };
  if (includedType) {
    body.includedType = includedType;
    body.strictTypeFiltering = false;
  }
  if ([south, west, north, east].every(Number.isFinite)) {
    body.locationRestriction = {
      rectangle: {
        low: { latitude: south, longitude: west },
        high: { latitude: north, longitude: east },
      },
    };
  }

  const upstream = await fetch(PLACES_TEXT_SEARCH_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });
  const upstreamBody = await upstream.text();
  response
    .status(upstream.status)
    .setHeader("content-type", upstream.headers.get("content-type") || "application/json; charset=utf-8")
    .send(upstreamBody);
};
