import { useEffect } from "react";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

/**
 * A single AdSense display ad slot.
 *
 * <AdUnit slot="1234567890" />
 *
 * `slot` is the ad unit ID from your AdSense dashboard (Ads → By ad unit →
 * create a display ad → copy the number after data-ad-slot). Renders
 * nothing until NEXT_PUBLIC_ADSENSE_CLIENT_ID is set, so it's safe to
 * leave in place before you've been approved / configured ad units.
 */
export default function AdUnit({ slot, format = "auto", responsive = true, style }) {
  useEffect(() => {
    if (!ADSENSE_CLIENT_ID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // AdSense script blocked (ad blocker) or not yet loaded — fail
      // silently rather than breaking the page around it.
    }
  }, []);

  if (!ADSENSE_CLIENT_ID || !slot) return null;

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
