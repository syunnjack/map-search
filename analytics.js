(function () {
  function trackClick(link) {
    const eventName = link.dataset.track || "link_click";
    const payload = {
      event: eventName,
      label: link.dataset.trackLabel || link.textContent.trim(),
      href: link.href,
      placeId: link.dataset.placeId || "",
      category: link.dataset.category || "",
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (window.MAP_SEARCH_CONFIG?.DEBUG_ANALYTICS) {
      console.info("[map-search]", payload);
    }
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-track]");
    if (!link) return;
    trackClick(link);
  });
})();
