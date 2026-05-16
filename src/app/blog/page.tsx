import { Suspense } from "react";
import type { Metadata } from "next";

import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { BlogContent } from "@/components/blog/BlogContent";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { homeQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { HomePayload } from "@/sanity/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Field Notes — Technical articles from the shop floor",
  description:
    "Technical articles, industry insights, and hard-won knowledge from California Fastener — written for engineers and buyers.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const data =
    (await sanityFetch<HomePayload>({
      query: homeQuery,
      tags: ["blog:index", "post", "category"],
    })) ?? { posts: [], categories: [] };

  const { posts, categories } = data;
  const featured = posts.find((p) => p.featured) ?? posts[0] ?? null;
  const rest = featured ? posts.filter((p) => p._id !== featured._id) : posts;

  return (
    <>
      <CfNav active="blog" />

      <section className="bl-hero">
        <div className="bl-hero-top">
          <div>
            <div className="bl-hero-eyebrow">Field Notes</div>
            <h1 className="bl-hero-title">
              Notes from the
              <br />
              shop <i>floor.</i>
            </h1>
          </div>
          <div className="bl-hero-meta">
            <p>
              Technical articles, industry insights, and hard-won knowledge from our team — written
              for engineers and buyers.
            </p>
            <div className="bl-hero-count">
              {posts.length} {posts.length === 1 ? "article" : "articles"} · Updated weekly
            </div>
          </div>
        </div>
        <Suspense fallback={null}>
          <BlogContent posts={rest} categories={categories} featured={featured} />
        </Suspense>
      </section>

      <section className="bl-newsletter">
        <div className="bl-newsletter-inner">
          <div>
            <h3>Get Field Notes in your inbox.</h3>
            <p>Two technical articles a month. No marketing. Unsubscribe anytime.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <CfFooter />
    </>
  );
}
