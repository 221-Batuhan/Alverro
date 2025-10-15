"use client";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

type PaymentMethod = "card" | "bank" | "installment";

export default function CheckoutPage() {
  const { items, clear } = useCartStore();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const total = items.reduce((s, i) => s + i.priceCents * (i.quantity ?? 1), 0);

  return (
    <div className="container-page py-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
      <div>
        <h1 className="heading-serif text-2xl mb-6">Checkout</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-medium mb-2">Payment Method</h2>
            <div className="flex gap-2">
              {(["card","bank","installment"] as PaymentMethod[]).map((m) => (
                <button key={m} onClick={() => setMethod(m)} className={`px-3 py-2 rounded-full border ${m === method ? "bg-foreground text-background" : "border-foreground/20"}`}>{m}</button>
              ))}
            </div>
          </div>

          <div className="border rounded-xl p-4">
            {method === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Cardholder Name" className="border p-3 rounded-md bg-background" />
                <input placeholder="Card Number" className="border p-3 rounded-md bg-background" />
                <input placeholder="Expiry MM/YY" className="border p-3 rounded-md bg-background" />
                <input placeholder="CVC" className="border p-3 rounded-md bg-background" />
              </div>
            )}
            {method === "bank" && (
              <p className="text-sm">We will provide IBAN and reference number after confirmation.</p>
            )}
            {method === "installment" && (
              <div className="text-sm">
                <p>Choose plan:</p>
                <div className="mt-2 flex gap-2">
                  {[3,6,12].map((n) => (
                    <button key={n} className="px-3 py-2 rounded-full border border-foreground/20">{n} months</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <aside className="border rounded-xl p-6 h-fit">
        <div className="flex items-center justify-between text-sm">
          <span>Total</span>
          <span>{(total / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
        </div>
        <button onClick={() => clear()} className="mt-6 w-full rounded-full bg-foreground text-background py-3">Confirm Order</button>
      </aside>
    </div>
  );
}


