"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { items, setQty, removeItem } = useCartStore();
  const subtotal = items.reduce((s, i) => s + i.priceCents * (i.quantity ?? 1), 0);
  return (
    <div className="container-page py-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
      <div>
        <h1 className="heading-serif text-2xl mb-6">Your Cart</h1>
        <div className="space-y-6">
          {items.length === 0 && <p className="text-sm">Your cart is empty.</p>}
          {items.map((i) => {
            const key = `${i.slug}-${i.color ?? "_"}-${i.size ?? "_"}`;
            return (
              <div key={key} className="flex gap-4 items-center">
                <div className="h-20 w-16 rounded-md bg-gradient-to-br from-[#D8D4CD] to-[#F8F4E3]" />
                <div className="flex-1">
                  <p className="text-sm">{i.name}</p>
                  <p className="text-xs text-foreground/70">{i.color} {i.size}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={i.quantity ?? 1}
                      onChange={(e) => setQty(i.slug, Number(e.target.value), key)}
                      className="w-16 border border-foreground/20 rounded-md p-2 bg-background"
                    />
                    <button className="text-xs underline" onClick={() => removeItem(i.slug, key)}>Remove</button>
                  </div>
                </div>
                <p className="text-sm">{(i.priceCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
              </div>
            );
          })}
        </div>
      </div>
      <aside className="border rounded-xl p-6 h-fit">
        <div className="flex items-center justify-between text-sm">
          <span>Subtotal</span>
          <span>{(subtotal / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
        </div>
        <Link href="/checkout" className="mt-6 block text-center rounded-full bg-foreground text-background py-3">Checkout</Link>
      </aside>
    </div>
  );
}


