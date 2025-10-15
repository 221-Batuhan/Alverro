// app/collections/[slug]/page.tsx
import Link from "next/link";
import { PrismaClient } from "../../../generated/prisma/index.js";

interface CollectionPageProps {
  params: { slug: string };
}

const prisma = new PrismaClient();

type Product = Awaited<ReturnType<typeof prisma.product.findMany>>[number];

export default async function CategoryPage({ params }: CollectionPageProps) {
  // Kategoriyi al
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    return <div className="p-12 text-center">Category not found</div>;
  }

  // Kategoriye ait ürünleri al
  const products: Product[] = await prisma.product.findMany({
    where: { categoryId: category.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container-page py-12 px-4 md:px-8">
      <h1 className="heading-serif text-3xl md:text-4xl mb-8 capitalize">{category.name}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p: Product) => (
          <Link key={p.slug} href={`/product/${p.slug}`} className="group">
            {/* Placeholder görsel */}
            <div className="aspect-[3/4] w-full rounded-lg overflow-hidden transition-transform group-hover:scale-[1.01] bg-gradient-to-br from-[#D8D4CD] to-[#F8F4E3] flex items-center justify-center text-gray-400 font-semibold">
              {p.images?.[0] ? (
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                "No Image"
              )}
            </div>
            {/* Ürün bilgisi */}
            <div className="mt-3 flex flex-col">
              <span className="font-medium">{p.name}</span>
              <span className="text-gray-600 mt-1">
                {(p.priceCents / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
