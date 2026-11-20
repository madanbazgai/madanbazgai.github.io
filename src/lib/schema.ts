// schema.org structured data, so search engines understand who wrote what.
import { SECTIONS, SITE } from "../config";
import { postUrl, type Post } from "./posts";

const url = (path: string, site: URL) => new URL(path, site).href;

export const person = (site: URL) => ({
  "@type": "Person",
  "@id": url("/#person", site),
  name: SITE.author,
  jobTitle: SITE.tagline,
  url: url("/", site),
  image: url("/icons/icon-512x512.png", site),
  sameAs: SITE.sameAs,
});

export const homeSchema = (site: URL) => ({
  "@context": "https://schema.org",
  "@graph": [
    person(site),
    {
      "@type": "WebSite",
      "@id": url("/#website", site),
      name: SITE.title,
      description: SITE.description,
      url: url("/", site),
      inLanguage: "en",
      publisher: { "@id": url("/#person", site) },
    },
  ],
});

export const postSchema = (post: Post, site: URL, image: string) => {
  const section = SECTIONS[post.collection];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": post.collection === "blog" ? "BlogPosting" : "Article",
        headline: post.data.title,
        description: post.data.description,
        datePublished: post.data.date.toISOString(),
        image: url(image, site),
        url: url(postUrl(post), site),
        mainEntityOfPage: url(postUrl(post), site),
        keywords: post.data.tags.filter((tag) => tag !== "pinned"),
        inLanguage: "en",
        author: person(site),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: url("/", site) },
          { "@type": "ListItem", position: 2, name: section.title, item: url(`/${post.collection}/`, site) },
          { "@type": "ListItem", position: 3, name: post.data.title },
        ],
      },
    ],
  };
};
