import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { TAXI_PAGES, SERVICE_PAGES } from "../../lib/taxiRoutes";

export default function TaxiIndex() {
  return (
    <div className="bg-surface min-h-screen">
      <Head>
        <title>Chandigarh Taxi Routes | Averra</title>
        <meta
          name="description"
          content="Outstation taxi routes from Chandigarh to Delhi, Shimla, Manali, Amritsar, and more — upfront fares, no surge pricing."
        />
      </Head>

      <Header />

      <section className="max-w-4xl mx-auto px-5 pt-16 pb-20">
        <h1 className="font-display font-bold text-ink text-3xl mb-2">Chandigarh taxi routes</h1>
        <p className="font-body text-ink-muted text-sm mb-10">
          Outstation routes and services from Chandigarh, all with upfront, meter-clear pricing.
        </p>

        <h2 className="font-display font-bold text-ink text-lg mb-3">Services</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {SERVICE_PAGES.map((p) => (
            <a
              key={p.slug}
              href={`/taxi/${p.slug}`}
              className="border border-line rounded-lg p-4 hover:border-brand/50 hover:shadow-md transition-all"
            >
              <p className="font-display font-semibold text-ink text-sm">{p.title}</p>
            </a>
          ))}
        </div>

        <h2 className="font-display font-bold text-ink text-lg mb-3">Outstation routes</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {TAXI_PAGES.map((p) => (
            <a
              key={p.slug}
              href={`/taxi/${p.slug}`}
              className="border border-line rounded-lg p-4 hover:border-brand/50 hover:shadow-md transition-all flex items-center justify-between"
            >
              <span className="font-display font-semibold text-ink text-sm">
                {p.from} → {p.to}
              </span>
              <span className="font-mono text-[10px] text-ink-muted">~{p.km} km</span>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
