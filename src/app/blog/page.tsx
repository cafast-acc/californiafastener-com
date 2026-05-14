import type { Metadata } from "next";

import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { homeQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { PostCard } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Technical guides on fasteners, anchors, coatings, and installation — written by the California Fastener applications team.",
};

// One-hour safety net behind the webhook-driven invalidation. If a webhook is
// ever missed, ISR still catches up within the hour.
export const revalidate = 3600;

async function fetchPosts(): Promise<PostCard[]> {
  // Be resilient to a missing/misconfigured Sanity project so the build and
  // first deploy succeed before the project is wired up. Once env vars are
  // set, this query succeeds and ISR takes over.
  try {
    return await sanityFetch<PostCard[]>(homeQuery, {}, { tags: ["posts"] });
  } catch {
    return [];
  }
}

export default async function BlogIndex() {
  const posts = await fetchPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <CfNav />
      <main>
        <section className="bl-wrap">
          <div className="bl-index-hero">
            <div className="bl-kicker">Field Notes</div>
            <h1>Technical notes from the shop floor.</h1>
            <p>
              Guides on bolt grades, torque, corrosion, and anchors — written by
              the people who quote and ship the parts.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="bl-empty">No posts yet — check back soon.</div>
          ) : (
            <div className="bl-index-grid">
              {featured ? <ArticleCard post={featured} featured /> : null}
              {rest.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>
      <CfFooter />
    </>
  );
}
