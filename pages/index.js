import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchWidget from "../components/SearchWidget";
import CabTypeCard from "../components/CabTypeCard";
import PopularRoutesSection from "../components/PopularRoutesSection";
import PackagesSection from "../components/PackagesSection";
import TrustBadges from "../components/TrustBadges";
import FAQAccordion from "../components/FAQAccordion";
import AdUnit from "../components/AdUnit";
import { API_BASE } from "../lib/apiBase";
import { CAB_TYPES } from "../lib/data";

export default function Home() {
  // Fetched once here and shared with both the booking form's dropdown and
  // the fleet grid below, so an admin's meter-rate edit shows up in both
  // places from the same source instead of two separate stale copies.
  // Starts from the bundled defaults so the page isn't empty while loading,
  // and stays on them if the backend is unreachable.
  const [cabTypes, setCabTypes] = useState(CAB_TYPES);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/cabtypes`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad response"))))
      .then((body) => {
        if (!cancelled && Array.isArray(body) && body.length > 0) setCabTypes(body);
      })
      .catch(() => {
        // Keep the bundled defaults — no need to surface this as an error.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div id="top" className="bg-surface min-h-screen">
      <Head>
        <title>Averra | Taxi Booking in Chandigarh & North India</title>
       <meta name="keywords" content="taxi booking Chandigarh, cab booking Chandigarh, Chandigarh taxi service, outstation taxi Chandigarh, airport taxi Chandigarh, Chandigarh to Delhi taxi, Chandigarh to Shimla taxi, Chandigarh to Manali taxi" />
        <link rel="canonical" href="https://sahotatravel.netlify.app/" />
        <meta property="og:title" content="Sahota Travel | Taxi Booking in Chandigarh & North India" />
        <meta property="og:description" content="Book affordable outstation, local and airport taxis from Chandigarh with Sahota Travel. Check fares and request your cab online." />
        <meta property="og:url" content="https://sahotatravel.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://sahotatravel.netlify.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sahota Travel | Taxi Booking in Chandigarh & North India" />
        <meta name="twitter:description" content="Book outstation, local and airport taxis from Chandigarh with Sahota Travel." />
        <meta name="twitter:image" content="https://sahotatravel.netlify.app/og-image.jpg" />
        <meta
          name="description"
          content="Book affordable outstation, local and airport taxis from Chandigarh with Sahota Travel. Check cab options, estimated fares and request your taxi online."
        />
      </Head>

      <Header />

      <section className="relative overflow-hidden bg-brand-banner pt-14 pb-32">
        <div className="max-w-4xl mx-auto text-center px-5">
          <p className="font-body text-white/80 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Upfront fares · No surge · No surprises
          </p>
          <h1 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight tracking-tight">
            Taxi Booking in Chandigarh
            <br />
             & North India
          </h1>
          <p className="font-body text-white/85 text-base md:text-lg mt-5 max-w-xl mx-auto">
             Book outstation, local and airport cabs from Chandigarh to Delhi, Shimla,
            Manali, Amritsar, Ludhiana and other destinations across North India.
            Choose your cab, check the estimated fare and send your booking request online.
          </p>

          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            <TrustStat value="4.6★" label="Rider rating" />
            <TrustStat value="50,000+" label="Trips completed" />
            <TrustStat value="10k cities" label="North India" />
          </div>
        </div>
      </section>

      <SearchWidget cabTypes={cabTypes} />

      <section id="fleet" className="max-w-6xl mx-auto px-5 pt-24 pb-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display font-bold text-ink text-2xl">Fleet &amp; fares</h2>
          <p className="font-body text-xs font-medium text-ink-muted uppercase tracking-wide">
            {cabTypes.length} cab types
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cabTypes.map((cab) => (
            <CabTypeCard key={cab.id} cab={cab} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pt-12">
        {/* Ad unit 1: get this slot ID from AdSense → Ads → By ad unit */}
        <AdUnit slot="5392848897" />
      </section>

      <PopularRoutesSection />

      <PackagesSection />

      <section className="bg-surface-alt">
        <div className="max-w-6xl mx-auto px-5 pt-20 pb-16">
          <h2 className="font-display font-bold text-ink text-2xl mb-6">
            Why book with us
          </h2>
          <TrustBadges />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pt-12">
        {/* Ad unit 2 */}
        <AdUnit slot="3257640142" />
      </section>

       <section className="relative overflow-hidden bg-brand-banner pt-14 pb-32">
        <div className="border border-roadline rounded-md p-6">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-paper text-2xl mb-2">Taxi Booking Service in Chandigarh</h2>
            <p className="font-body text-white/85 text-base md:text-lg mt-5 max-w-xl mx-auto">
              Sahota Travel provides online taxi booking for local travel, airport transfers
              and outstation journeys from Chandigarh and nearby cities. Book a hatchback,
              sedan or SUV for business trips, family travel, holidays and one-way journeys.
            </p>
            <p className="font-body text-white/85 text-base md:text-lg mt-5 max-w-xl mx-auto">
              Popular taxi routes include Chandigarh to Delhi, Shimla, Manali and Amritsar,
              plus Ludhiana to Chandigarh and Delhi to Chandigarh. Select your route and
              cab type to see an estimated fare before submitting your booking request.
            </p>
          </div>
          <div>
            <h2 className="font-display text-paper text-2xl mb-2">Outstation & Airport Cabs</h2>
            <p className="font-body text-white/85 text-base md:text-lg mt-5 max-w-xl mx-auto">
              Need an outstation taxi from Chandigarh? Sahota Travel supports one-way and
              round-trip requests, along with local and hourly trips. Airport transfers are
              also available for convenient pickup and drop-off.
            </p>
            <p className="font-body text-white/85 text-base md:text-lg mt-5 max-w-xl mx-auto">
              Fares shown on the site are estimates based on the selected cab type and
              distance. Final booking details are confirmed by the Sahota Travel dispatcher.
            </p>
          </div>
        </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-dark pt-14 pb-32">
        <div className="border border-roadline rounded-md p-6">
        <h2 className="font-display text-paper text-2xl mb-2">Taxi routes across North India</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            ["Chandigarh to Delhi Taxi", "/chandigarh-to-delhi-taxi"], ["Chandigarh to Shimla Taxi", "/chandigarh-to-shimla-taxi"],
            ["Chandigarh to Manali Taxi", "/chandigarh-to-manali-taxi"], ["Chandigarh to Amritsar Taxi", "/chandigarh-to-amritsar-taxi"],
            ["Chandigarh to Ludhiana Taxi", "/chandigarh-to-ludhiana-taxi"], ["Chandigarh to Jalandhar Taxi", "/chandigarh-to-jalandhar-taxi"],
            ["Chandigarh to Dharamshala Taxi", "/chandigarh-to-dharamshala-taxi"], ["Chandigarh Airport Taxi", "/chandigarh-airport-taxi"],
            ["Chandigarh Outstation Taxi", "/chandigarh-outstation-taxi"]
          ].map(([label, href]) => <a key={href} href={href} className="border border-roadline rounded-md p-4 text-taxi hover:text-paper">{label}</a>)}
        </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-banner pt-14 pb-32">
        <div className="border border-roadline rounded-md p-6">
          <h2 className="font-display text-paper text-2xl mb-2">Sahota Travel Guides</h2>
          <p className="font-display text-paper text-xl mb-2">Read practical taxi and road-trip guides for Chandigarh, Punjab, Himachal Pradesh and nearby North India destinations.</p>
          
          <a href="/blog" className="text-taxi font-mono text-xs uppercase tracking-widest">Read travel guides →</a>
        </div>
      </section>

      <section id="faq" className="max-w-4xl mx-auto px-5 pt-20 pb-24">
        <h2 className="font-display font-bold text-ink text-2xl mb-6">
          Frequently asked questions
        </h2>
        <FAQAccordion />
      </section>

      <Footer />
    </div>
  );
}

function TrustStat({ value, label }) {
  return (
    <div className="text-center">
      <p className="font-display font-bold text-white text-xl">{value}</p>
      <p className="font-body text-white/70 text-xs">{label}</p>
    </div>
  );
}
