// Measurement ID for the GA4 property "map-search" (549572056).
const GA_MEASUREMENT_ID = "G-TKD1BNHQL0";

// Returns the gtag.js tag pair for a page <head>, indented to match the
// surrounding template.
function analyticsHead(indent = "    ") {
  return [
    `${indent}<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>`,
    `${indent}<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');</script>`,
  ].join("\n");
}

module.exports = { GA_MEASUREMENT_ID, analyticsHead };
