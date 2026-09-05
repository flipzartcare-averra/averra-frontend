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
import { CAB_TYPES } from "../lib/data";

export default function Home() {
  return (
    <div id="top" className="bg-surface min-h-screen">
      <Head>
        <title>Rastaa Cabs — Outstation, local &amp; airport taxi booking</title>
        <meta
          name="description"
          content="Book outstation, local and airport cabs with upfront, meter-clear pricing."
        />
      </Head>

      <Header />

      <section className="relative overflow-hidden bg-brand-banner pt-14 pb-32">
        <div className="max-w-4xl mx-auto text-center px-5">
          <p className="font-body text-white/80 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Upfront fares · No surge · No surprises
          </p>
          <h1 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight tracking-tight">
            India's most transparent
            <br />
            cab booking, since day one.
          </h1>
          <p className="font-body text-white/85 text-base md:text-lg mt-5 max-w-xl mx-auto">
            Outstation, local and airport cabs across North India. Every
            fare shown upfront — no surge, no last-minute add-ons.
          </p>

          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            <TrustStat value="4.6★" label="Rider rating" />
            <TrustStat value="50,000+" label="Trips completed" />
            <TrustStat value="8 cities" label="North India" />
          </div>
        </div>
      </section>

      <SearchWidget />

      <section id="fleet" className="max-w-6xl mx-auto px-5 pt-24 pb-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display font-bold text-ink text-2xl">Fleet &amp; fares</h2>
          <p className="font-body text-xs font-medium text-ink-muted uppercase tracking-wide">
            5 cab types
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAB_TYPES.map((cab) => (
            <CabTypeCard key={cab.id} cab={cab} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pt-12">
        {/* Ad unit 1: get this slot ID from AdSense → Ads → By ad unit */}
        <AdUnit slot="REPLACE_WITH_AD_SLOT_ID_1" />
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
        <AdUnit slot="REPLACE_WITH_AD_SLOT_ID_2" />
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
