const HOTPEPPER_ENDPOINT = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

module.exports = async function handler(request, response) {
  const apiKey = process.env.HOTPEPPER_API_KEY;
  if (!apiKey) {
    response.status(500).json({ error: "HOTPEPPER_API_KEY is not configured" });
    return;
  }

  const requestUrl = new URL(request.url, "https://map-search.local");
  const params = new URLSearchParams(requestUrl.search);
  params.set("key", apiKey);
  params.set("format", "json");

  const upstream = await fetch(`${HOTPEPPER_ENDPOINT}?${params.toString()}`);
  const body = await upstream.text();
  response
    .status(upstream.status)
    .setHeader("content-type", upstream.headers.get("content-type") || "application/json; charset=utf-8")
    .send(body);
};
