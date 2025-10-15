"use client";
import { useCartStore } from "@/store/cart";

export default function AddToCartClient({ slug, name, priceCents, color, size }: { slug: string; name: string; priceCents: number; color?: string; size?: string }) {
  const add = useCartStore((s) => s.addItem);
  return (
    <button onClick={() => add({ slug, name, priceCents, color, size })} className="mt-8 w-full md:w-auto px-6 py-3 rounded-full bg-foreground text-background hover:opacity-90">Add to Cart</button>
  );
}


