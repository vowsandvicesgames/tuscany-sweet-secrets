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

export function trackPatreonClick(location: string) {
  trackClick("patreon_click", {
    event_category: "engagement",
    event_label: "Patreon",
    page_location: location,
  });
}

export function trackItchClick(location: string) {
  trackClick("itch_click", {
    event_category: "engagement",
    event_label: "itch.io",
    page_location: location,
  });
}

export function trackDiscordClick(location: string) {
  trackClick("discord_click", {
    event_category: "engagement",
    event_label: "Discord",
    page_location: location,
  });
}

export function trackTwitterClick(location: string) {
  trackClick("twitter_click", {
    event_category: "engagement",
    event_label: "X / Twitter",
    page_location: location,
  });
}

