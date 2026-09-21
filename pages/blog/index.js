import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BLOG_POSTS } from "../../lib/blogPosts";

export default function BlogIndex() {
  return (
    <div className="bg-surface min-h-screen">
      <Head>
        <title>Tour &amp; Travel Blog | Averra</title>
        <meta
          name="description"
          content="Travel guides, road trip tips, and destination comparisons for North India routes out of Chandigarh."
        />
      </Head>

      <Header />

      <section className="max-w-4xl mx-auto px-5 pt-16 pb-20">
        <h1 className="font-display font-bold text-ink text-3xl mb-2">Tour &amp; travel blog</h1>
        <p className="font-body text-ink-muted text-sm mb-10">
          Guides and tips for outstation trips from Chandigarh.
        </p>

        <div className="flex flex-col gap-6">
          {BLOG_POSTS.slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block border border-line rounded-lg p-5 hover:border-brand/50 hover:shadow-md transition-all"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="font-display font-bold text-ink text-lg mb-2">{post.title}</h2>
                <p className="font-body text-ink-muted text-sm">{post.excerpt}</p>
              </a>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
