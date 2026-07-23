const placeDetailConfig = window.MAP_SEARCH_CONFIG || {};

function detailApiProxyEnabled() {
  return placeDetailConfig.API_PROXY_ENABLED === true;
}

function detailApiBaseUrl() {
  return (placeDetailConfig.API_BASE_URL || "").replace(/\/$/, "");
}

function detailRequestJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
  });
}

function detailRequestJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `mapSearchPlaceDetail${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const script = document.createElement("script");
    const separator = url.includes("?") ? "&" : "?";
    const cleanup = () => {
      script.remove();
      delete window[callbackName];
    };
    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("JSONP request failed"));
    };
    script.src = `${url}${separator}callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

function detailHotelBasicInfo(rawHotel) {
  if (!rawHotel) return null;
  if (rawHotel.hotelBasicInfo) return rawHotel.hotelBasicInfo;
  if (Array.isArray(rawHotel.hotel)) {
    return rawHotel.hotel.find((item) => item.hotelBasicInfo)?.hotelBasicInfo || rawHotel.hotel[0]?.hotelBasicInfo || null;
  }
  return rawHotel.hotel?.hotelBasicInfo || rawHotel;
}

function detailHotelToCard(rawHotel) {
  const info = detailHotelBasicInfo(rawHotel);
  if (!info) return null;
  const url = info.hotelInformationUrl || info.planListUrl || info.dpPlanListUrl || "";
  if (!url) return null;
  return {
    name: info.hotelName || "楽天トラベル掲載ホテル",
    url,
    image: info.hotelThumbnailUrl || info.hotelImageUrl || "",
    minCharge: Number(info.hotelMinCharge) || null,
    reviewAverage: info.reviewAverage || "",
    access: info.access || info.nearestStation || "",
  };
}

function detailRakutenRequestUrl(place) {
  const version = placeDetailConfig.RAKUTEN_TRAVEL_API_VERSION || "20260731";
  const params = new URLSearchParams({
    applicationId: placeDetailConfig.RAKUTEN_APPLICATION_ID,
    accessKey: placeDetailConfig.RAKUTEN_ACCESS_KEY,
    format: "json",
    formatVersion: "2",
    responseType: "middle",
    datumType: "1",
    hits: "3",
    keyword: `${place.city} ホテル`,
    sort: "+roomCharge",
  });
  if (placeDetailConfig.RAKUTEN_AFFILIATE_ID) {
    params.set("affiliateId", placeDetailConfig.RAKUTEN_AFFILIATE_ID);
  }
  return `https://openapi.rakuten.co.jp/engine/api/Travel/KeywordHotelSearch/${version}?${params.toString()}`;
}

function renderDetailHotels(box, hotels, fallbackUrl) {
  if (!hotels.length) {
    box.innerHTML = `<div class="hotel-empty">周辺ホテルが見つかりませんでした。<a href="${fallbackUrl}" target="_blank" rel="noopener">楽天トラベルで探す</a></div>`;
    return;
  }
  box.innerHTML = hotels.map((hotel) => `
    <a class="hotel-card" href="${hotel.url}" target="_blank" rel="noopener" data-track="hotel_click">
      ${hotel.image ? `<img src="${hotel.image}" alt="${hotel.name}の写真" loading="lazy" />` : ""}
      <span>
        <strong>${hotel.name}</strong>
        <small>${hotel.minCharge ? `${hotel.minCharge.toLocaleString()}円から` : "料金を確認"}${hotel.reviewAverage ? ` / ★${hotel.reviewAverage}` : ""}</small>
        ${hotel.access ? `<em>${hotel.access}</em>` : ""}
      </span>
    </a>
  `).join("");
}

async function loadDetailHotels() {
  const root = document.querySelector("[data-place-detail]");
  const box = document.querySelector("[data-detail-hotels]");
  if (!root || !box) return;
  const place = {
    city: root.dataset.city || "",
    fallbackHotelUrl: root.dataset.hotelUrl || "#",
  };

  if (!detailApiProxyEnabled() && (!placeDetailConfig.RAKUTEN_APPLICATION_ID || !placeDetailConfig.RAKUTEN_ACCESS_KEY)) {
    box.innerHTML = `<div class="hotel-empty">楽天トラベルAPIキーを設定すると、周辺ホテル候補を表示できます。<br><a href="${place.fallbackHotelUrl}" target="_blank" rel="noopener">ホテル予約を探す</a></div>`;
    return;
  }

  box.innerHTML = `<div class="hotel-empty">楽天トラベルのホテル候補を取得しています。</div>`;
  try {
    const data = detailApiProxyEnabled()
      ? await detailRequestJson(`${detailApiBaseUrl()}/api/rakuten-travel?city=${encodeURIComponent(place.city)}`)
      : await detailRequestJsonp(detailRakutenRequestUrl(place));
    const hotels = Array.isArray(data?.hotels) ? data.hotels.map(detailHotelToCard).filter(Boolean) : [];
    renderDetailHotels(box, hotels, place.fallbackHotelUrl);
  } catch {
    box.innerHTML = `<div class="hotel-empty">ホテル候補を取得できませんでした。<a href="${place.fallbackHotelUrl}" target="_blank" rel="noopener">楽天トラベルで探す</a></div>`;
  }
}

loadDetailHotels();
