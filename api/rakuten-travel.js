const RAKUTEN_TRAVEL_VERSION = process.env.RAKUTEN_TRAVEL_API_VERSION || "20260731";

module.exports = async function handler(request, response) {
  const applicationId = process.env.RAKUTEN_APPLICATION_ID;
  const accessKey = process.env.RAKUTEN_ACCESS_KEY;
  if (!applicationId || !accessKey) {
    response.status(500).json({ error: "Rakuten Travel API credentials are not configured" });
    return;
  }

  const requestUrl = new URL(request.url, "https://map-search.local");
  const city = requestUrl.searchParams.get("city") || "";
  const params = new URLSearchParams({
    applicationId,
    accessKey,
    format: "json",
    formatVersion: "2",
    responseType: "middle",
    datumType: "1",
    hits: "3",
    keyword: `${city} ホテル`,
    sort: "+roomCharge",
  });
  if (process.env.RAKUTEN_AFFILIATE_ID) {
    params.set("affiliateId", process.env.RAKUTEN_AFFILIATE_ID);
  }

  const upstream = await fetch(`https://openapi.rakuten.co.jp/engine/api/Travel/KeywordHotelSearch/${RAKUTEN_TRAVEL_VERSION}?${params.toString()}`);
  const body = await upstream.text();
  response
    .status(upstream.status)
    .setHeader("content-type", upstream.headers.get("content-type") || "application/json; charset=utf-8")
    .send(body);
};
