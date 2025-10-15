import { prisma } from "@/lib/prisma";
import GalleryClient from "./GalleryClient";
import AddToCartClient from "./AddToCartClient";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return <div className="container-page py-10"><p>Not found</p></div>;
  const images: string[] = Array.isArray(product.images) ? (product.images as any) : [];
  const colors = (product.colors ?? []) as string[];
  const sizes = (product.sizes ?? []) as string[];

  return (
    <div className="container-page py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <GalleryClient images={images} />
      <div>
        <h1 className="heading-serif text-2xl md:text-3xl">{product.name}</h1>
        <p className="mt-2 text-foreground/80">{(product.priceCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
        <p className="mt-6 text-sm leading-6">{product.description}</p>
        {product.composition && <p className="mt-2 text-sm text-foreground/70">{product.composition}</p>}

        {colors.length > 0 && (
          <div className="mt-6">
            <label className="text-xs text-foreground/70">Color</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {colors.map((c) => (
                <span key={c} className="px-3 py-1 rounded-full border border-foreground/20">{c}</span>
              ))}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div className="mt-4">
            <label className="text-xs text-foreground/70">Size</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <span key={s} className="px-3 py-1 rounded-full border border-foreground/20">{s}</span>
              ))}
            </div>
          </div>
        )}

        <AddToCartClient slug={params.slug} name={product.name} priceCents={product.priceCents} />
      </div>
    </div>
  );
}


