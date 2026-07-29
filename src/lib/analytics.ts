declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackClick(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function trackRedditClick(location: string) {
  trackClick("reddit_click", {
    event_category: "engagement",
    event_label: "Reddit",
    page_location: location,
  });
}
