import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://alverro.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}


