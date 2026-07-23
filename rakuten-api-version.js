(function applyRakutenTravelApiVersion() {
  const appConfig = window.MAP_SEARCH_CONFIG || {};
  const version = appConfig.RAKUTEN_TRAVEL_API_VERSION || "20260731";

  window.rakutenHotelRequestUrl = function rakutenHotelRequestUrl(place) {
    const params = new URLSearchParams({
      applicationId: appConfig.RAKUTEN_APPLICATION_ID,
      accessKey: appConfig.RAKUTEN_ACCESS_KEY,
      format: "json",
      formatVersion: "2",
      responseType: "middle",
      datumType: "1",
      hits: "3",
      keyword: `${place.city} ホテル`,
      sort: "+roomCharge",
    });
    if (appConfig.RAKUTEN_AFFILIATE_ID) {
      params.set("affiliateId", appConfig.RAKUTEN_AFFILIATE_ID);
    }
    return `https://openapi.rakuten.co.jp/engine/api/Travel/KeywordHotelSearch/${version}?${params.toString()}`;
  };
})();
