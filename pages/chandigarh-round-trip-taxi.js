import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const related = [
  "/chandigarh-to-delhi-taxi", "/chandigarh-to-shimla-taxi", "/chandigarh-to-manali-taxi",
  "/chandigarh-to-amritsar-taxi", "/chandigarh-outstation-taxi", "/chandigarh-airport-taxi"
].filter((x) => x !== "/chandigarh-round-trip-taxi").slice(0, 4);

export default function RoutePage() {
  return (
    <div className="bg-road min-h-screen">
      <Head>
        <title>Chandigarh Round Trip Taxi | Sahota Travel</title>
        <meta name="description" content="Book a round-trip taxi from Chandigarh when you want a private cab for both outbound and return travel. Book online with Sahota Travel and choose a suitable cab for your journey." />
        <link rel="canonical" href="https://sahotatravel.netlify.app/chandigarh-round-trip-taxi" />
        <meta property="og:title" content="Chandigarh Round Trip Taxi | Sahota Travel" />
        <meta property="og:description" content="Book a round-trip taxi from Chandigarh when you want a private cab for both outbound and return travel." />
        <meta property="og:url" content="https://sahotatravel.netlify.app/chandigarh-round-trip-taxi" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org", "@type":"Service", "name":"Chandigarh Round Trip Taxi",
          "provider":{"@type":"Organization","name":"Sahota Travel","url":"https://sahotatravel.netlify.app/"},
          "serviceType":"Taxi Service", "areaServed":["Chandigarh","North India"]
        }) }} />
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto px-5 py-16">
        <p className="font-mono text-taxi text-xs uppercase tracking-[0.25em] mb-4">Taxi booking · Sahota Travel</p>
        <h1 className="font-display text-paper text-4xl md:text-5xl leading-tight">Chandigarh Round Trip Taxi</h1>
        <p className="font-body text-steel text-lg mt-5 leading-relaxed">Book a round-trip taxi from Chandigarh when you want a private cab for both outbound and return travel.</p>
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          
          <div className="border border-roadline rounded-md p-5"><p className="font-mono text-xs text-steel uppercase">Typical journey</p><p className="text-paper text-xl mt-2">route dependent</p></div>
          <div className="border border-roadline rounded-md p-5"><p className="font-mono text-xs text-steel uppercase">Route</p><p className="text-paper text-sm mt-2">North India</p></div>
        </div>
        <section className="mt-12">
          <h2 className="font-display text-paper text-2xl mb-4">Chandigarh to North India cab booking</h2>
          <p className="font-body text-steel leading-relaxed">Sahota Travel lets you request a private taxi for this route. Select the pickup and destination in the booking form, choose the cab type that fits your group, review the estimated fare and submit your contact details. Final booking information is confirmed by the Sahota Travel team.</p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-paper text-2xl mb-4">Which cab should you choose?</h2>
          <p className="font-body text-steel leading-relaxed">Hatchbacks can suit smaller groups and lighter luggage, while sedans offer a practical option for everyday intercity travel. SUVs are useful for larger groups or extra luggage. For longer hill and outstation trips, choose the vehicle based on passenger count, luggage and road conditions.</p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-paper text-2xl mb-4">How to book</h2>
          <ol className="list-decimal pl-6 font-body text-steel leading-relaxed space-y-2">
            <li>Open the Sahota Travel booking form.</li><li>Enter Chandigarh as pickup and North India as destination where applicable.</li><li>Select your date, journey details and cab type.</li><li>Review the estimated fare and submit your contact information.</li><li>Wait for booking confirmation from the Sahota Travel team.</li>
          </ol>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-paper text-2xl mb-4">Travel planning note</h2>
          <p className="font-body text-steel leading-relaxed">Journey time and distance are approximate and can change because of traffic, weather, road conditions and your exact pickup or drop location. Confirm the final route, fare, tolls and inclusions with the operator before travel.</p>
        </section>
        <div className="mt-12 flex flex-wrap gap-4"><a href="/#book" className="bg-taxi text-road font-mono text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-sm">Book this route</a><Link href="/" className="border border-roadline text-paper font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-sm">Back to Sahota Travel</Link></div>
        <section className="mt-14"><h2 className="font-display text-paper text-2xl mb-5">More taxi services</h2><div className="grid sm:grid-cols-2 gap-3">{related.map((href) => <Link key={href} href={href} className="border border-roadline rounded-md p-4 text-steel hover:text-paper">{href.replaceAll("/", "").replaceAll("-", " ")}</Link>)}</div></section>
      </main><Footer />
    </div>
  );
}
