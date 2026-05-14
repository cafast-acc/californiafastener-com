import type { Metadata } from "next";
import { Suspense } from "react";

import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { CategoryPills, PostsList } from "@/components/blog/BlogContent";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { homeQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { BlogIndexData } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Technical guides on fasteners, anchors, coatings, and installation — written by the California Fastener applications team.",
};

// One-hour safety net behind webhook-driven invalidation.
export const revalidate = 3600;

async function fetchIndex(): Promise<BlogIndexData> {
  try {
    return await sanityFetch<BlogIndexData>(homeQuery, {}, {
      tags: ["posts", "categories"],
    });
  } catch {
    return { posts: [], categories: [], total: 0 };
  }
}

export default async function BlogIndex() {
  const { posts, categories, total } = await fetchIndex();
  const totalLabel =
    total === 0
      ? "Updated weekly"
      : `${total} ${total === 1 ? "article" : "articles"} · Updated weekly`;

  return (
    <>
      <CfNav />
      <main>
        <section className="bl-hero">
          <div className="bl-hero-top">
            <div>
              <div className="bl-hero-eyebrow">Field Notes</div>
              <h1>
                Notes from the
                <br />
                shop <i>floor.</i>
              </h1>
            </div>
            <div className="bl-hero-meta">
              <p>
                Technical articles, industry insights, and hard-won knowledge
                from our team — written for engineers and buyers.
              </p>
              <div className="bl-count">{totalLabel}</div>
            </div>
          </div>
          {/* Client component reads ?category= from the URL. Suspense
              boundary required by Next when useSearchParams is used in a
              page that's otherwise statically rendered. */}
          <Suspense fallback={<div className="bl-cat-bar" />}>
            <CategoryPills categories={categories} />
          </Suspense>
        </section>

        <Suspense fallback={null}>
          <PostsList posts={posts} />
        </Suspense>

        <section className="bl-newsletter">
          <div className="bl-newsletter-inner">
            <div>
              <h3>Get Field Notes in your inbox.</h3>
              <p>Two technical articles a month. No marketing. Unsubscribe anytime.</p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <CfFooter />
    </>
  );
}
