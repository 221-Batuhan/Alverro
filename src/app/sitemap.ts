import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const base = "https://alverro.com";
  const products = await prisma.product.findMany({ select: { slug: true, updatedAt: true } });
  const urls = [
    { url: base, lastModified: new Date() },
    { url: `${base}/collections`, lastModified: new Date() },
    ...products.map((p) => ({ url: `${base}/product/${p.slug}`, lastModified: p.updatedAt })),
  ];
  return urls;
}


