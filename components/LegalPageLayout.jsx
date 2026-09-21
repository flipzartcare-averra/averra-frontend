import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function LegalPageLayout({ title, updated, children }) {
  return (
    <div className="bg-surface min-h-screen">
      <Head>
        <title>{title} | Averra</title>
      </Head>

      <Header />

      <article className="max-w-2xl mx-auto px-5 pt-16 pb-20">
        <h1 className="font-display font-bold text-ink text-3xl mb-2">{title}</h1>
        {updated && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-8">
            Last updated: {updated}
          </p>
        )}
        <div className="flex flex-col gap-4 font-body text-ink text-sm leading-relaxed [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-ink [&_h2]:text-lg [&_h2]:mt-6 [&_h2]:mb-1">
          {children}
        </div>
      </article>

      <Footer />
    </div>
  );
}
