import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BLOG_POSTS, findBlogPost } from "../../lib/blogPosts";

export default function BlogPost({ post }) {
  return (
    <div className="bg-surface min-h-screen">
      <Head>
        <title>{post.title} | Averra Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <Header />

      <article className="max-w-2xl mx-auto px-5 pt-16 pb-20">
        <a href="/blog" className="font-body text-xs text-brand hover:underline">
          ← Tour &amp; travel blog
        </a>
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mt-6 mb-2">
          {new Date(post.date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="font-display font-bold text-ink text-3xl mb-8 leading-tight">{post.title}</h1>

        <div className="flex flex-col gap-4">
          {post.body.map((para, i) => (
            <p key={i} className="font-body text-ink text-base leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <a
          href="/#book"
          className="inline-block mt-10 bg-accent hover:bg-accent-dark text-white font-body text-sm font-semibold px-6 py-3 rounded-md transition-colors shadow-sm shadow-accent/30"
        >
          Book a cab
        </a>
      </article>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: BLOG_POSTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = findBlogPost(params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}
