import { create } from "zustand";

type CartItem = {
  slug: string;
  name: string;
  priceCents: number;
  quantity?: number;
  color?: string;
  size?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, variantKey?: string) => void;
  setQty: (slug: string, qty: number, variantKey?: string) => void;
  clear: () => void;
};

const keyFor = (i: CartItem) => `${i.slug}-${i.color ?? "_"}-${i.size ?? "_"}`;

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (incoming) =>
    set((s) => {
      const k = keyFor(incoming);
      const items = [...s.items];
      const idx = items.findIndex((it) => keyFor(it) === k);
      if (idx >= 0) items[idx] = { ...items[idx], quantity: (items[idx].quantity ?? 1) + 1 };
      else items.push({ ...incoming, quantity: 1 });
      return { items };
    }),
  removeItem: (slug, variantKey) =>
    set((s) => ({ items: s.items.filter((i) => (variantKey ? keyFor(i) !== variantKey : i.slug !== slug)) })),
  setQty: (slug, qty, variantKey) =>
    set((s) => {
      const items = s.items.map((i) => (variantKey ? (keyFor(i) === variantKey ? { ...i, quantity: Math.max(1, qty) } : i) : i.slug === slug ? { ...i, quantity: Math.max(1, qty) } : i));
      return { items };
    }),
  clear: () => set({ items: [] }),
}));


