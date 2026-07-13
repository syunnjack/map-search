const config = window.MAP_SEARCH_CONFIG || {};

const shizuokaBounds = [
  [34.55, 137.45],
  [35.65, 139.25],
];

const cities = {
  all: { lat: 34.9769, lng: 138.3831, zoom: 9, label: "静岡県全域" },
  "静岡市": { lat: 34.9756, lng: 138.3828, zoom: 13, label: "静岡市" },
  "浜松市": { lat: 34.7108, lng: 137.7261, zoom: 13, label: "浜松市" },
  "沼津市": { lat: 35.0956, lng: 138.8634, zoom: 13, label: "沼津市" },
  "熱海市": { lat: 35.0969, lng: 139.0713, zoom: 13, label: "熱海市" },
  "富士市": { lat: 35.1614, lng: 138.6763, zoom: 13, label: "富士市" },
  "伊東市": { lat: 34.9657, lng: 139.1019, zoom: 13, label: "伊東市" },
};

const hotpepperGenres = {
  hotpepper: "",
  izakaya: "G001",
  cafe_food: "G014",
  yakiniku: "G008",
};

const samplePlaces = [
  {
    id: "shizuoka-izakaya",
    name: "静岡駅前 海鮮酒場",
    category: "izakaya",
    categoryLabel: "居酒屋",
    lat: 34.9718,
    lng: 138.3889,
    city: "静岡市",
    rating: 4.3,
    price: "3,000-4,500円",
    tags: ["駅近", "海鮮", "地酒", "ネット予約"],
    description: "静岡駅から歩きやすい、海鮮と地酒を楽しめる居酒屋。",
    offer: "席のみ予約あり",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=静岡駅+居酒屋",
    source: "sample",
  },
  {
    id: "hamamatsu-izakaya",
    name: "浜松餃子酒場",
    category: "izakaya",
    categoryLabel: "居酒屋",
    lat: 34.7046,
    lng: 137.7346,
    city: "浜松市",
    rating: 4.2,
    price: "2,800-4,000円",
    tags: ["浜松餃子", "駅近", "飲み放題", "当日予約"],
    description: "浜松駅周辺で餃子とお酒を楽しめる、観光客にも使いやすい居酒屋。",
    offer: "飲み放題プランあり",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=浜松駅+居酒屋",
    source: "sample",
  },
  {
    id: "numazu-izakaya",
    name: "沼津港まぐろ横丁",
    category: "izakaya",
    categoryLabel: "居酒屋",
    lat: 35.0825,
    lng: 138.8592,
    city: "沼津市",
    rating: 4.4,
    price: "3,500-5,000円",
    tags: ["海鮮", "港近く", "ランチ", "観光"],
    description: "沼津港周辺で魚料理を楽しめる、昼飲みや観光にも向いた店。",
    offer: "海鮮コースあり",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=沼津港+居酒屋",
    source: "sample",
  },
  {
    id: "atami-izakaya",
    name: "熱海温泉通り酒場",
    category: "izakaya",
    categoryLabel: "居酒屋",
    lat: 35.1031,
    lng: 139.0777,
    city: "熱海市",
    rating: 4.1,
    price: "3,200-4,800円",
    tags: ["温泉街", "海鮮", "観光", "夜利用"],
    description: "熱海駅から温泉街へ向かう途中で立ち寄りやすい居酒屋。",
    offer: "観光帰りに使いやすい",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=熱海+居酒屋",
    source: "sample",
  },
  {
    id: "fuji-izakaya",
    name: "富士山麓ダイニング",
    category: "izakaya",
    categoryLabel: "居酒屋",
    lat: 35.1517,
    lng: 138.6514,
    city: "富士市",
    rating: 4.0,
    price: "2,800-4,200円",
    tags: ["駐車場", "富士山周辺", "家族利用", "個室"],
    description: "車でも行きやすく、富士周辺の食事や飲み会に使える居酒屋。",
    offer: "駐車場あり",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=富士市+居酒屋",
    source: "sample",
  },
  {
    id: "ito-izakaya",
    name: "伊東港 炉端酒場",
    category: "izakaya",
    categoryLabel: "居酒屋",
    lat: 34.9743,
    lng: 139.0927,
    city: "伊東市",
    rating: 4.2,
    price: "3,000-4,600円",
    tags: ["港町", "海鮮", "温泉旅", "予約可"],
    description: "伊東の港町らしい魚料理を楽しめる、旅行中にも使いやすい酒場。",
    offer: "海鮮盛りあり",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=伊東市+居酒屋",
    source: "sample",
  },
  {
    id: "shizuoka-cafe",
    name: "駿府城公園カフェ",
    category: "cafe",
    categoryLabel: "カフェ",
    lat: 34.9804,
    lng: 138.3836,
    city: "静岡市",
    rating: 4.4,
    price: "900-1,800円",
    tags: ["公園近く", "ランチ", "休憩", "観光"],
    description: "駿府城公園散策の前後に使いやすい落ち着いたカフェ。",
    offer: "季節メニューあり",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=駿府城公園+カフェ",
    source: "sample",
  },
  {
    id: "hamamatsu-yakiniku",
    name: "浜松炭火焼肉ダイニング",
    category: "yakiniku",
    categoryLabel: "焼肉",
    lat: 34.7071,
    lng: 137.7325,
    city: "浜松市",
    rating: 4.3,
    price: "4,000-5,500円",
    tags: ["駅近", "個室", "家族利用", "コース"],
    description: "浜松駅周辺で会食や家族利用にも使いやすい焼肉店。",
    offer: "コース予約あり",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=浜松駅+焼肉",
    source: "sample",
  },
  {
    id: "numazu-food",
    name: "沼津港 海鮮食堂",
    category: "cafe_food",
    categoryLabel: "カフェ・食事",
    lat: 35.0833,
    lng: 138.8598,
    city: "沼津市",
    rating: 4.5,
    price: "1,500-3,000円",
    tags: ["海鮮丼", "観光", "ランチ", "港"],
    description: "沼津港観光と一緒に使いやすい、海鮮丼中心の食事処。",
    offer: "ランチ利用におすすめ",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=沼津港+海鮮丼",
    source: "sample",
  },
  {
    id: "atami-hotel",
    name: "熱海駅前ステイ案内",
    category: "spot",
    categoryLabel: "観光",
    lat: 35.1038,
    lng: 139.0774,
    city: "熱海市",
    rating: 4.0,
    price: "宿泊検索",
    tags: ["駅近", "温泉", "宿泊", "観光"],
    description: "熱海観光の宿泊先を探す起点として使えるエリア案内。",
    offer: "周辺ホテル検索へ",
    reserveUrl: "https://www.google.com/search?q=熱海+ホテル+予約",
    siteUrl: "https://www.google.com/search?q=熱海+ホテル+予約",
    source: "sample",
  },
  {
    id: "fuji-work",
    name: "富士駅前ワークラウンジ",
    category: "work",
    categoryLabel: "作業場所",
    lat: 35.1514,
    lng: 138.6511,
    city: "富士市",
    rating: 4.1,
    price: "600円/時〜",
    tags: ["Wi-Fi", "電源", "駅近", "会議"],
    description: "富士駅周辺で短時間作業や打ち合わせに使いやすいワークスペース。",
    offer: "ドロップイン可",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=富士市+コワーキング",
    source: "sample",
  },
  {
    id: "ito-spa-beauty",
    name: "伊東温泉リラクゼーション",
    category: "beauty",
    categoryLabel: "美容",
    lat: 34.9716,
    lng: 139.0921,
    city: "伊東市",
    rating: 4.2,
    price: "4,500円〜",
    tags: ["温泉街", "予約可", "リラク", "旅行"],
    description: "温泉旅行中にも使いやすい、伊東駅周辺のリラクゼーションサロン。",
    offer: "初回メニューあり",
    reserveUrl: "#partner",
    siteUrl: "https://www.google.com/search?q=伊東市+リラクゼーション",
    source: "sample",
  },
];

const state = {
  city: "all",
  category: "hotpepper",
  places: [],
  loading: false,
  hasSearched: false,
  map: null,
  mapFallback: false,
  markers: new Map(),
  markerSignature: "",
  currentLocation: null,
  currentLocationMarker: null,
  routeLine: null,
  selectedPlace: null,
  rakutenHotels: [],
  rakutenLoading: false,
  rakutenRequestId: 0,
};

function isHotpepperCategory(category) {
  return Object.prototype.hasOwnProperty.call(hotpepperGenres, category);
}

function affiliateUrl(url) {
  if (!url) return "#";
  const template = config.VALUECOMMERCE_URL_TEMPLATE || "";
  if (template.includes("{url}")) return template.replace("{url}", encodeURIComponent(url));
  if (config.VALUECOMMERCE_SID && config.VALUECOMMERCE_PID) {
    return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${encodeURIComponent(config.VALUECOMMERCE_SID)}&pid=${encodeURIComponent(config.VALUECOMMERCE_PID)}&vc_url=${encodeURIComponent(url)}`;
  }
  return url;
}

function replacePartnerTokens(template, place) {
  if (!template || !place) return template || "";
  return template
    .replaceAll("{name}", encodeURIComponent(place.name))
    .replaceAll("{city}", encodeURIComponent(place.city))
    .replaceAll("{category}", encodeURIComponent(place.categoryLabel))
    .replaceAll("{lat}", encodeURIComponent(String(place.lat)))
    .replaceAll("{lng}", encodeURIComponent(String(place.lng)));
}

function partnerUrl(configKey, fallbackUrl, place) {
  const configuredUrl = replacePartnerTokens(config[configKey], place);
  return configuredUrl ? affiliateUrl(configuredUrl) : fallbackUrl;
}

function searchLink(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function mapSearchLink(query, place) {
  if (place) {
    return `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${place.lat},${place.lng},15z`;
  }
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
}

function parkingUrl(place) {
  return partnerUrl("PARKING_AFFILIATE_URL", mapSearchLink("駐車場", place), place);
}

function hotelUrl(place) {
  return partnerUrl("HOTEL_AFFILIATE_URL", searchLink(`${place.city} ホテル 予約`), place);
}

function rakutenHotelRequestUrl(place) {
  const params = new URLSearchParams({
    applicationId: config.RAKUTEN_APPLICATION_ID,
    accessKey: config.RAKUTEN_ACCESS_KEY,
    format: "json",
    formatVersion: "2",
    responseType: "middle",
    datumType: "1",
    hits: "3",
    keyword: `${place.city} ホテル`,
    sort: "+roomCharge",
  });
  if (config.RAKUTEN_AFFILIATE_ID) {
    params.set("affiliateId", config.RAKUTEN_AFFILIATE_ID);
  }
  return `https://openapi.rakuten.co.jp/engine/api/Travel/KeywordHotelSearch/20170426?${params.toString()}`;
}

function hotelBasicInfo(rawHotel) {
  if (!rawHotel) return null;
  if (rawHotel.hotelBasicInfo) return rawHotel.hotelBasicInfo;
  if (Array.isArray(rawHotel.hotel)) {
    return rawHotel.hotel.find((item) => item.hotelBasicInfo)?.hotelBasicInfo || rawHotel.hotel[0]?.hotelBasicInfo || null;
  }
  return rawHotel.hotel?.hotelBasicInfo || rawHotel;
}

function rakutenHotelToCard(rawHotel) {
  const info = hotelBasicInfo(rawHotel);
  if (!info) return null;
  const url = info.hotelInformationUrl || info.planListUrl || info.dpPlanListUrl || "";
  if (!url) return null;
  return {
    name: info.hotelName || "楽天トラベル掲載ホテル",
    url,
    image: info.hotelThumbnailUrl || info.hotelImageUrl || "",
    minCharge: Number(info.hotelMinCharge) || null,
    reviewAverage: info.reviewAverage || "",
    reviewCount: info.reviewCount || "",
    access: info.access || info.nearestStation || "",
  };
}

function taxiUrl(place) {
  return partnerUrl("TAXI_AFFILIATE_URL", searchLink(`${place.city} タクシー 配車`), place);
}

function beautyUrl(place) {
  return partnerUrl("BEAUTY_AFFILIATE_URL", searchLink(`${place.city} 美容 サロン 予約`), place);
}

function categoryColor(category) {
  return {
    hotpepper: "#e05a47",
    izakaya: "#d95c22",
    cafe_food: "#0b7c61",
    yakiniku: "#b27420",
    cafe: "#0b7c61",
    work: "#1d7897",
    beauty: "#c15a8a",
    clinic: "#b27420",
    spot: "#5367c7",
  }[category] || "#13201d";
}

function markerIcon(place) {
  const color = categoryColor(place.category);
  return L.divIcon({
    className: "custom-marker",
    html: `<span style="background:${color}">${place.categoryLabel.slice(0, 1)}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
}

function directionsUrl(place) {
  const destination = `${place.lat},${place.lng}`;
  if (state.currentLocation) {
    const origin = `${state.currentLocation.lat},${state.currentLocation.lng}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

function distanceKm(from, to) {
  const earthRadiusKm = 6371;
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function travelEstimate(place) {
  if (!state.currentLocation || !place) return null;
  const km = distanceKm(state.currentLocation, place);
  return {
    km,
    walk: Math.max(1, Math.round((km / 4.8) * 60)),
    drive: Math.max(1, Math.round((km / 32) * 60)),
  };
}

function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes}分`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}時間${rest}分` : `${hours}時間`;
}

function filteredSamplePlaces() {
  return samplePlaces.filter((place) => {
    const cityMatch = state.city === "all" || place.city === state.city;
    const categoryMatch = state.category === "all" || place.category === state.category;
    return cityMatch && categoryMatch;
  });
}

function hotpepperFallbackPlaces() {
  const fallbackCategories = state.category === "hotpepper"
    ? ["izakaya", "yakiniku", "cafe_food", "cafe"]
    : [state.category];
  return samplePlaces.filter((place) => {
    const cityMatch = state.city === "all" || place.city === state.city;
    const categoryMatch = fallbackCategories.includes(place.category);
    return cityMatch && categoryMatch;
  });
}

function activePlaces() {
  return isHotpepperCategory(state.category) ? state.places : filteredSamplePlaces();
}

function hotpepperRequestUrl() {
  const center = cities[state.city] || cities.all;
  const params = new URLSearchParams({
    key: config.HOTPEPPER_API_KEY,
    order: "4",
    count: "40",
    format: "json",
  });

  if (state.city === "all") {
    params.set("large_area", "Z032");
  } else {
    params.set("lat", String(center.lat));
    params.set("lng", String(center.lng));
    params.set("range", "4");
    params.set("keyword", center.label);
  }

  const genre = hotpepperGenres[state.category];
  if (genre) params.set("genre", genre);
  return `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${params.toString()}`;
}

function requestJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `mapSearchHotpepper${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const script = document.createElement("script");
    const separator = url.includes("?") ? "&" : "?";
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("API request timed out"));
    }, 12000);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("API request failed"));
    };

    script.src = `${url}${separator}callback=${callbackName}`;
    document.head.appendChild(script);
  });
}

function shopToPlace(shop) {
  const shopUrl = shop.urls?.pc || shop.coupon_urls?.pc || "";
  const photo = shop.photo?.pc?.m || shop.photo?.pc?.l || shop.logo_image || "";
  const genreName = shop.genre?.name || "グルメ";
  const cityName = shop.small_area?.name || shop.middle_area?.name || shop.station_name || cities[state.city]?.label || "静岡県";
  const tags = [
    shop.station_name ? `${shop.station_name}駅` : "",
    shop.budget?.average || "",
    shop.wifi === "あり" ? "Wi-Fi" : "",
    shop.private_room === "あり" ? "個室" : "",
    shop.card === "利用可" ? "カード可" : "",
    shop.non_smoking && shop.non_smoking !== "なし" ? "禁煙席" : "",
  ].filter(Boolean);

  return {
    id: `hotpepper-${shop.id}`,
    name: shop.name,
    category: state.category,
    categoryLabel: genreName,
    lat: Number(shop.lat),
    lng: Number(shop.lng),
    city: cityName,
    rating: "HP",
    price: shop.budget?.average || "予算情報あり",
    tags,
    description: shop.catch || shop.genre?.catch || shop.access || "ホットペッパー掲載店です。",
    offer: shop.ktai_coupon === "0" || shop.coupon_urls?.pc ? "クーポンあり" : "予約ページあり",
    reserveUrl: affiliateUrl(shopUrl),
    siteUrl: affiliateUrl(shopUrl),
    image: photo,
    access: shop.access,
    open: shop.open,
    close: shop.close,
    source: "hotpepper",
  };
}

async function loadHotpepperPlaces() {
  const status = document.querySelector("[data-api-status]");
  if (!config.HOTPEPPER_API_KEY) {
    state.places = hotpepperFallbackPlaces();
    if (status) {
      status.textContent = "config.js にホットペッパーAPIキーを設定すると、実際の掲載店に切り替わります。現在はサンプル店舗を表示しています。";
    }
    render();
    return;
  }

  state.loading = true;
  state.selectedPlace = null;
  renderSelectedPlace();
  if (status) status.textContent = "ホットペッパー掲載店を取得しています...";
  render();

  try {
    const data = await requestJsonp(hotpepperRequestUrl());
    const shops = data?.results?.shop || [];
    state.places = shops.map(shopToPlace).filter((place) => Number.isFinite(place.lat) && Number.isFinite(place.lng));
    if (status) {
      const label = cities[state.city]?.label || "静岡県";
      status.textContent = `${label}周辺のホットペッパー掲載店を${state.places.length}件表示しています。`;
    }
  } catch {
    state.places = [];
    if (status) {
      status.textContent = "ホットペッパーAPIの取得に失敗しました。APIキー、通信環境、利用条件を確認してください。";
    }
  } finally {
    state.loading = false;
    render();
  }
}

function renderRakutenHotels() {
  const box = document.querySelector("[data-rakuten-hotels]");
  if (!box) return;
  const place = state.selectedPlace;
  if (!place) {
    box.innerHTML = "";
    return;
  }
  if (!config.RAKUTEN_APPLICATION_ID || !config.RAKUTEN_ACCESS_KEY) {
    box.innerHTML = `
      <div class="hotel-empty">
        楽天トラベルAPIキーを config.js に設定すると、目的地周辺のホテル候補を表示できます。
      </div>
    `;
    return;
  }
  if (state.rakutenLoading) {
    box.innerHTML = `<div class="hotel-empty">楽天トラベルのホテル候補を取得しています。</div>`;
    return;
  }
  if (!state.rakutenHotels.length) {
    box.innerHTML = `
      <div class="hotel-empty">
        周辺ホテルが見つかりませんでした。<a href="${hotelUrl(place)}" target="_blank" rel="noopener">楽天トラベルで探す</a>
      </div>
    `;
    return;
  }
  box.innerHTML = state.rakutenHotels.map((hotel) => `
    <a class="hotel-card" href="${hotel.url}" target="_blank" rel="noopener">
      ${hotel.image ? `<img src="${hotel.image}" alt="${hotel.name}の写真" loading="lazy" />` : ""}
      <span>
        <strong>${hotel.name}</strong>
        <small>${hotel.minCharge ? `${hotel.minCharge.toLocaleString()}円〜` : "料金を確認"}${hotel.reviewAverage ? ` / ★${hotel.reviewAverage}` : ""}</small>
        ${hotel.access ? `<em>${hotel.access}</em>` : ""}
      </span>
    </a>
  `).join("");
}

async function loadRakutenHotels(place) {
  state.rakutenHotels = [];
  state.rakutenLoading = false;
  state.rakutenRequestId += 1;
  const requestId = state.rakutenRequestId;
  if (!place || !config.RAKUTEN_APPLICATION_ID || !config.RAKUTEN_ACCESS_KEY) {
    renderRakutenHotels();
    return;
  }

  state.rakutenLoading = true;
  renderRakutenHotels();
  try {
    const data = await requestJsonp(rakutenHotelRequestUrl(place));
    if (requestId !== state.rakutenRequestId) return;
    const hotels = Array.isArray(data?.hotels) ? data.hotels : [];
    state.rakutenHotels = hotels.map(rakutenHotelToCard).filter(Boolean);
  } catch {
    if (requestId !== state.rakutenRequestId) return;
    state.rakutenHotels = [];
  } finally {
    if (requestId === state.rakutenRequestId) {
      state.rakutenLoading = false;
      renderRakutenHotels();
    }
  }
}

function popupHtml(place) {
  return `
    <strong>${place.name}</strong>
    <p>${place.city} / ${place.categoryLabel}</p>
    <button type="button" class="popup-select" data-popup-select="${place.id}">ルート目的地にする</button>
  `;
}

function placeRow(place) {
  const tags = place.tags.map((tag) => `<span>${tag}</span>`).join("");
  const image = place.image ? `<img class="place-thumb" src="${place.image}" alt="${place.name}の写真" loading="lazy" />` : "";
  const reserveLabel = place.source === "hotpepper" ? "予約する" : "予約・公式";
  const selectedClass = state.selectedPlace?.id === place.id ? " selected" : "";
  return `
    <article class="place-row${selectedClass}" data-place-id="${place.id}">
      ${image}
      <div class="place-main">
        <div class="place-row__top">
          <div>
            <p class="place-category">${place.categoryLabel} / ${place.city}</p>
            <h3>${place.name}</h3>
          </div>
          <strong>★${place.rating}</strong>
        </div>
        <p>${place.description}</p>
        <div class="tag-row">${tags}</div>
        <div class="place-offer">${place.offer}</div>
        <div class="place-meta"><span>${place.price}</span></div>
      </div>
      <div class="place-actions">
        <button class="mini-button primary" type="button" data-select-place="${place.id}">ルート確認</button>
        <button class="mini-button" type="button" data-open-place="${place.id}">詳細</button>
        <a class="mini-button accent" href="${place.reserveUrl}" target="${place.reserveUrl.startsWith("#") ? "_self" : "_blank"}" rel="noopener">${reserveLabel}</a>
      </div>
    </article>
  `;
}

function allKnownPlaces() {
  return [...samplePlaces, ...state.places];
}

function findPlace(id) {
  return allKnownPlaces().find((place) => place.id === id);
}

function renderList(items) {
  const list = document.querySelector("[data-place-list]");
  const count = document.querySelector("[data-result-count]");
  if (!list || !count) return;

  if (!state.hasSearched) {
    count.textContent = "";
    list.innerHTML = `<div class="empty">条件を選んで「検索する」を押してください。</div>`;
    return;
  }

  if (state.loading) {
    count.textContent = "読み込み中";
    list.innerHTML = `<div class="empty">店舗情報を取得しています。</div>`;
    return;
  }

  count.textContent = `${items.length}件のお店・施設`;
  list.innerHTML = items.length
    ? items.map(placeRow).join("")
    : `<div class="empty">条件に合うお店・施設がありません。市町村やジャンルを変えてください。</div>`;

  list.querySelectorAll("[data-place-id]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a") || event.target.closest("button")) return;
      focusPlace(findPlace(card.dataset.placeId));
    });
  });

  list.querySelectorAll("[data-select-place]").forEach((button) => {
    button.addEventListener("click", () => selectPlace(findPlace(button.dataset.selectPlace)));
  });

  list.querySelectorAll("[data-open-place]").forEach((button) => {
    button.addEventListener("click", () => openPlaceModal(findPlace(button.dataset.openPlace)));
  });
}

function fallbackPoint(place) {
  const south = shizuokaBounds[0][0];
  const west = shizuokaBounds[0][1];
  const north = shizuokaBounds[1][0];
  const east = shizuokaBounds[1][1];
  const x = ((place.lng - west) / (east - west)) * 100;
  const y = ((north - place.lat) / (north - south)) * 100;
  return {
    x: Math.max(4, Math.min(96, x)),
    y: Math.max(4, Math.min(96, y)),
  };
}

function renderFallbackMap(items) {
  const mapElement = document.querySelector("#map");
  if (!mapElement) return;
  mapElement.classList.add("fallback-map");
  mapElement.classList.remove("map-fallback");

  const pins = items.map((place) => {
    const point = fallbackPoint(place);
    const color = categoryColor(place.category);
    return `
      <button
        type="button"
        class="fallback-pin"
        style="left:${point.x}%; top:${point.y}%; --pin-color:${color};"
        data-fallback-pin="${place.id}"
        aria-label="${place.name}を目的地にする"
      >
        <span>${place.categoryLabel.slice(0, 1)}</span>
      </button>
    `;
  }).join("");

  mapElement.innerHTML = `
    <div class="fallback-map__base">
      <span class="fallback-city city-shizuoka">静岡</span>
      <span class="fallback-city city-hamamatsu">浜松</span>
      <span class="fallback-city city-numazu">沼津</span>
      <span class="fallback-city city-atami">熱海</span>
      <span class="fallback-city city-fuji">富士</span>
      <span class="fallback-water">駿河湾</span>
      ${pins || `<div class="fallback-empty">条件に合う地点がありません。</div>`}
    </div>
  `;
}

function renderMarkers(items) {
  if (state.mapFallback || typeof L === "undefined") {
    renderFallbackMap(items);
    return;
  }
  if (!state.map) return;
  refreshMapSize();
  const signature = items.map((place) => `${place.id}:${place.lat}:${place.lng}`).join("|");
  if (signature === state.markerSignature) return;

  state.markers.forEach((marker) => marker.remove());
  state.markers.clear();
  state.markerSignature = signature;

  const bounds = [];
  items.forEach((place) => {
    const marker = L.marker([place.lat, place.lng], { icon: markerIcon(place) })
      .addTo(state.map)
      .bindPopup(popupHtml(place));
    marker.on("click", () => selectPlace(place));
    state.markers.set(place.id, marker);
    bounds.push([place.lat, place.lng]);
  });

  if (bounds.length) {
    if (state.city === "all") {
      state.map.fitBounds(shizuokaBounds, { padding: [18, 18], maxZoom: 10, animate: false });
    } else {
      state.map.fitBounds(bounds, { padding: [28, 28], maxZoom: 14, animate: false });
    }
  } else {
    const center = cities[state.city] || cities.all;
    state.map.setView([center.lat, center.lng], center.zoom, { animate: false });
  }
  refreshMapSize();
  renderRouteLine();
}

function renderRouteLine() {
  if (!state.map || typeof L === "undefined") return;
  if (state.routeLine) {
    state.map.removeLayer(state.routeLine);
    state.routeLine = null;
  }
  if (!state.currentLocation || !state.selectedPlace) return;
  state.routeLine = L.polyline(
    [
      [state.currentLocation.lat, state.currentLocation.lng],
      [state.selectedPlace.lat, state.selectedPlace.lng],
    ],
    {
      color: "#0b7c61",
      weight: 4,
      opacity: 0.82,
      dashArray: "8 8",
    }
  ).addTo(state.map);
}

function focusPlace(place) {
  if (!place) return;
  if (state.mapFallback || !state.map) {
    renderFallbackMap(activePlaces());
    return;
  }
  refreshMapSize();
  state.map.setView([place.lat, place.lng], 15, { animate: false });
  const marker = state.markers.get(place.id);
  if (marker) marker.openPopup();
}

function selectPlace(place) {
  if (!place) return;
  state.selectedPlace = place;
  focusPlace(place);
  renderSelectedPlace();
  renderRoutePanel();
  renderRouteLine();
  renderSideSelected();
  loadRakutenHotels(place);
  renderList(activePlaces());
}

function renderRoutePanel() {
  const panel = document.querySelector("[data-route-panel]");
  if (!panel) return;
  const place = state.selectedPlace;
  if (!place) {
    panel.innerHTML = `
      <p class="rail-label">Route Map</p>
      <h2>ピンで目的地を選ぶ</h2>
      <p>地図のピンを選ぶと、現在地からのルート確認と所要時間の目安を表示します。</p>
    `;
    return;
  }

  const estimate = travelEstimate(place);
  const estimateHtml = estimate
    ? `
      <div class="route-stats">
        <div><strong>${estimate.km.toFixed(1)}km</strong><span>直線距離</span></div>
        <div><strong>${formatMinutes(estimate.walk)}</strong><span>徒歩目安</span></div>
        <div><strong>${formatMinutes(estimate.drive)}</strong><span>車目安</span></div>
      </div>
    `
    : `<p class="route-alert">所要時間の目安を出すには、現在地を表示してください。</p>`;

  panel.innerHTML = `
    <p class="rail-label">Route Destination</p>
    <h2>${place.name}</h2>
    <p>${place.city} / ${place.categoryLabel}</p>
    ${estimateHtml}
    <div class="route-actions">
      <button class="mini-button" type="button" data-locate>現在地を表示</button>
      <a class="mini-button primary" href="${directionsUrl(place)}" target="_blank" rel="noopener">Google Mapsで開く</a>
    </div>
  `;
}

function renderSideSelected() {
  const box = document.querySelector("[data-side-selected]");
  if (!box) return;
  const place = state.selectedPlace;
  if (!place) {
    box.innerHTML = `
      <p class="rail-label">Reservation</p>
      <h2>予約・周辺情報</h2>
      <p>目的地を選ぶと、予約ページ、駐車場、周辺サービスへのリンクを表示します。ルート確認は地図側で行います。</p>
    `;
    return;
  }

  const reserveLabel = place.source === "hotpepper" ? "ネット予約へ進む" : "予約情報を見る";
  const couponLabel = place.source === "hotpepper" ? "クーポンを見る" : "特典・公式情報を見る";
  const relatedLabel = place.category === "beauty" ? "美容予約を探す" : "近くの予約先を探す";
  const relatedUrl = place.category === "beauty" ? beautyUrl(place) : searchLink(`${place.city} ${place.categoryLabel} 予約`);
  box.innerHTML = `
    <p class="rail-label">Reservation</p>
    <h2>${place.name}</h2>
    <p>${place.city} / ${place.categoryLabel}</p>
    <div class="rail-actions">
      <a class="rail-card primary" href="${place.reserveUrl}" target="${place.reserveUrl.startsWith("#") ? "_self" : "_blank"}" rel="noopener">
        <strong>${reserveLabel}</strong>
        <span>${place.offer}</span>
      </a>
      <a class="rail-card" href="${place.siteUrl || place.reserveUrl}" target="${(place.siteUrl || place.reserveUrl).startsWith("#") ? "_self" : "_blank"}" rel="noopener">
        <strong>${couponLabel}</strong>
        <span>店舗ページで特典・空席・詳細を確認</span>
      </a>
      <a class="rail-card" href="${parkingUrl(place)}" target="_blank" rel="noopener">
        <strong>近くの駐車場</strong>
        <span>車で行く前に空き・場所を確認</span>
      </a>
      <a class="rail-card" href="${hotelUrl(place)}" target="_blank" rel="noopener">
        <strong>近くのホテル</strong>
        <span>楽天トラベルで宿泊先を探す</span>
      </a>
      <a class="rail-card" href="${taxiUrl(place)}" target="_blank" rel="noopener">
        <strong>タクシー・移動</strong>
        <span>飲酒後や雨の日の移動に</span>
      </a>
      <a class="rail-card" href="${relatedUrl}" target="_blank" rel="noopener">
        <strong>${relatedLabel}</strong>
        <span>同じエリアで比較して選ぶ</span>
      </a>
    </div>
    <div class="hotel-recommend">
      <p class="rail-label">Rakuten Travel</p>
      <div data-rakuten-hotels></div>
    </div>
  `;
  renderRakutenHotels();
}

function renderSelectedPlace() {
  const box = document.querySelector("[data-selected-place]");
  if (!box) return;
  const place = state.selectedPlace;
  if (!place) {
    box.hidden = true;
    box.innerHTML = "";
    renderSideSelected();
    return;
  }
  const reserveLabel = place.source === "hotpepper" ? "ホットペッパーで予約" : "予約情報を見る";
  box.hidden = false;
  box.innerHTML = `
    <p class="place-category">選択中の目的地</p>
    <h3>${place.name}</h3>
    <p>${place.city} / ${place.categoryLabel}</p>
    <div class="place-actions">
      <a class="mini-button primary" href="${directionsUrl(place)}" target="_blank" rel="noopener">現在地から道案内</a>
      <a class="mini-button primary" href="${place.reserveUrl}" target="${place.reserveUrl.startsWith("#") ? "_self" : "_blank"}" rel="noopener">${reserveLabel}</a>
      <button class="mini-button" type="button" data-open-selected>詳細</button>
    </div>
  `;
  box.querySelector("[data-open-selected]")?.addEventListener("click", () => openPlaceModal(place));
}

function render() {
  const items = activePlaces();
  renderList(items);
  if (state.hasSearched && !state.loading) {
    ensureMap();
    renderMarkers(items);
  }
}

function openPlaceModal(place) {
  const modal = document.querySelector("[data-place-modal]");
  const content = document.querySelector("[data-modal-content]");
  if (!modal || !content || !place) return;

  const tags = place.tags.map((tag) => `<span>${tag}</span>`).join("");
  const image = place.image ? `<img class="modal-image" src="${place.image}" alt="${place.name}の写真" />` : "";
  const reserveLabel = place.source === "hotpepper" ? "ホットペッパーで予約する" : "予約情報を見る";
  const detailRows = [
    place.access ? `<p><strong>アクセス</strong><br>${place.access}</p>` : "",
    place.open ? `<p><strong>営業時間</strong><br>${place.open}</p>` : "",
    place.close ? `<p><strong>定休日</strong><br>${place.close}</p>` : "",
  ].join("");

  content.innerHTML = `
    ${image}
    <p class="place-category">${place.categoryLabel} / ${place.city}</p>
    <h2 id="modal-title">${place.name}</h2>
    <p class="modal-lead">${place.description}</p>
    <div class="modal-stats">
      <div><strong>★${place.rating}</strong><span>評価</span></div>
      <div><strong>${place.price}</strong><span>目安</span></div>
      <div><strong>${place.offer}</strong><span>特典</span></div>
    </div>
    <div class="tag-row">${tags}</div>
    <div class="modal-extra">${detailRows}</div>
    <div class="modal-actions">
      <button class="button secondary-light" type="button" data-modal-select="${place.id}">目的地にする</button>
      <a class="button primary" href="${place.reserveUrl}" target="${place.reserveUrl.startsWith("#") ? "_self" : "_blank"}" rel="noopener">${reserveLabel}</a>
      <a class="button secondary-light" href="${directionsUrl(place)}" target="_blank" rel="noopener">道案内を開く</a>
    </div>
    <p class="modal-note">${place.source === "hotpepper" ? "店舗情報はホットペッパー グルメAPIから取得しています。" : "この店舗情報はMVP用のサンプルです。"}</p>
  `;
  content.querySelector("[data-modal-select]")?.addEventListener("click", () => {
    selectPlace(place);
    closePlaceModal();
  });
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closePlaceModal() {
  const modal = document.querySelector("[data-place-modal]");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function refreshMapSize() {
  if (!state.map) return;
  state.map.invalidateSize({ animate: false, pan: false });
}

function scheduleMapRefresh() {
  if (!state.map) return;
  [0, 80, 240, 600].forEach((delay) => {
    window.setTimeout(refreshMapSize, delay);
  });
  window.requestAnimationFrame(refreshMapSize);
}

function fallbackIfMapBlank() {
  if (!state.hasSearched || state.mapFallback || !state.map) return;
  const loadedTiles = document.querySelectorAll(".leaflet-tile-loaded").length;
  if (loadedTiles > 0) return;

  const items = activePlaces();
  if (!items.length) return;
  state.map.remove();
  state.map = null;
  state.markers.clear();
  state.markerSignature = "";
  state.mapFallback = true;
  renderFallbackMap(items);
}

function ensureMap() {
  if (state.map) {
    scheduleMapRefresh();
    return;
  }

  const mapElement = document.querySelector("#map");
  if (!mapElement || typeof L === "undefined") {
    state.mapFallback = true;
    renderFallbackMap(activePlaces());
    return;
  }

  state.mapFallback = false;
  mapElement.classList.remove("fallback-map");
  mapElement.innerHTML = "";

  state.map = L.map("map", {
    scrollWheelZoom: true,
    zoomControl: true,
    maxBounds: shizuokaBounds,
    maxBoundsViscosity: 0.55,
  }).setView([cities.all.lat, cities.all.lng], cities.all.zoom, { animate: false });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(state.map);

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(scheduleMapRefresh);
    resizeObserver.observe(mapElement);
    resizeObserver.observe(mapElement.parentElement);
  }
  window.addEventListener("resize", scheduleMapRefresh);
  window.addEventListener("load", scheduleMapRefresh);
  scheduleMapRefresh();
  window.setTimeout(fallbackIfMapBlank, 2400);
}

function searchPlaces() {
  state.hasSearched = true;
  state.selectedPlace = null;
  state.markerSignature = "";
  renderSelectedPlace();
  renderRoutePanel();
  renderRouteLine();
  renderSideSelected();
  if (isHotpepperCategory(state.category)) {
    loadHotpepperPlaces();
  } else {
    const status = document.querySelector("[data-api-status]");
    if (status) status.textContent = "市町村とジャンルを選ぶと、地図とリストが切り替わります。";
    render();
  }
}

document.querySelector("[data-category-select]")?.addEventListener("change", (event) => {
  state.category = event.target.value;
  state.selectedPlace = null;
  renderSelectedPlace();
  renderRoutePanel();
  renderRouteLine();
  renderSideSelected();
  const status = document.querySelector("[data-api-status]");
  if (status) status.textContent = "条件を選んだら「検索する」を押してください。";
});

document.querySelector("[data-city-select]")?.addEventListener("change", (event) => {
  state.city = event.target.value;
  state.selectedPlace = null;
  renderSelectedPlace();
  renderRoutePanel();
  renderRouteLine();
  renderSideSelected();
  const status = document.querySelector("[data-api-status]");
  if (status) status.textContent = "条件を選んだら「検索する」を押してください。";
});

document.querySelector("[data-search-places]")?.addEventListener("click", searchPlaces);

function locateCurrentPosition() {
  ensureMap();
  if (!navigator.geolocation || !state.map) return;
  navigator.geolocation.getCurrentPosition((position) => {
    state.currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    state.map.setView([state.currentLocation.lat, state.currentLocation.lng], 14, { animate: false });
    if (state.currentLocationMarker) state.currentLocationMarker.remove();
    state.currentLocationMarker = L.circleMarker([state.currentLocation.lat, state.currentLocation.lng], {
      radius: 8,
      color: "#13201d",
      fillColor: "#31c7a1",
      fillOpacity: 0.9,
    })
      .addTo(state.map)
      .bindPopup("現在地")
      .openPopup();
    renderSelectedPlace();
    renderRoutePanel();
    renderRouteLine();
  });
}

document.addEventListener("click", (event) => {
  const locateButton = event.target.closest("[data-locate]");
  if (locateButton) {
    locateCurrentPosition();
    return;
  }

  const button = event.target.closest("[data-popup-select]");
  if (button) selectPlace(findPlace(button.dataset.popupSelect));

  const fallbackPin = event.target.closest("[data-fallback-pin]");
  if (fallbackPin) selectPlace(findPlace(fallbackPin.dataset.fallbackPin));
});

document.querySelectorAll("[data-close-modal]").forEach((item) => {
  item.addEventListener("click", closePlaceModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePlaceModal();
});

renderList([]);
renderRoutePanel();
renderSideSelected();
