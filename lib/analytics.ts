// No-op analytics service
const analytics = {
  initialize: () => console.log("Noop analytics service called with event: initialize"),
  trackPageView: (path: string) => console.log("Noop analytics service called with event: trackPageView", path),
  trackEvent: (event: string, payload?: any) => console.log("Noop analytics service called with event: trackEvent", event, payload),
}

export default analytics 