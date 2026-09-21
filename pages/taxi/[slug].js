import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { TAXI_PAGES, SERVICE_PAGES, findTaxiPage, allTaxiSlugs } from "../../lib/taxiRoutes";

export default function TaxiPage({ page }) {
  const isRoute = Boolean(page.to);
  const title = page.title || `${page.from} to ${page.to} Taxi`;
  const bookHref = isRoute
    ? `/?from=${encodeURIComponent(page.from)}&to=${encodeURIComponent(page.to)}#book`
    : `/?from=${encodeURIComponent(page.from)}#book`;

  return (
    <div className="bg-surface min-h-screen">
      <Head>
        <title>{title} | Averra</title>
        <meta
          name="description"
          content={page.intro.length > 155 ? page.intro.slice(0, 152) + "…" : page.intro}
        />
      </Head>

      <Header />

      <section className="bg-brand-banner pt-14 pb-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-body text-white/80 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {isRoute ? "Outstation route" : "Taxi service"}
          </p>
          <h1 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight">
            {title}
          </h1>
          {isRoute && (
            <p className="font-mono text-white/85 text-sm mt-4">
              ~{page.km} km · {page.duration}
            </p>
          )}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-12">
        <p className="font-body text-ink text-base leading-relaxed mb-8">{page.intro}</p>

        <div className="border border-line rounded-lg p-5 mb-8">
          <h2 className="font-display font-bold text-ink text-lg mb-3">
            {isRoute ? "Good to know before you book" : "Good to know"}
          </h2>
          <ul className="flex flex-col gap-2">
            {page.highlights.map((h) => (
              <li key={h} className="font-body text-ink-muted text-sm flex gap-2">
                <span className="text-brand">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={bookHref}
          className="inline-block bg-accent hover:bg-accent-dark text-white font-body text-sm font-semibold px-6 py-3 rounded-md transition-colors shadow-sm shadow-accent/30"
        >
          {isRoute ? `Book ${page.from} → ${page.to}` : `Book a ${page.from} cab`}
        </a>

        <p className="font-body text-ink-muted text-xs mt-3">
          Fare shown before you book — actual distance is calculated live, exact price depends on
          cab type and current rates.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-5 pb-20">
        <h2 className="font-display font-bold text-ink text-lg mb-4">Other routes from Chandigarh</h2>
        <div className="flex flex-wrap gap-2">
          {[...TAXI_PAGES, ...SERVICE_PAGES]
            .filter((p) => p.slug !== page.slug)
            .map((p) => (
              <a
                key={p.slug}
                href={`/taxi/${p.slug}`}
                className="font-body text-xs text-brand border border-line rounded-full px-3 py-1.5 hover:border-brand/50 transition-colors"
              >
                {p.title || `${p.from} → ${p.to}`}
              </a>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: allTaxiSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = findTaxiPage(params.slug);
  if (!page) return { notFound: true };
  return { props: { page } };
}
