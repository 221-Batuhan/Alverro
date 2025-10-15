"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [cats, setCats] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const [pRes, cRes] = await Promise.all([
        fetch(`/api/products/${params.id}`),
        fetch(`/api/categories`),
      ]);
      setProduct(await pRes.json());
      setCats(await cRes.json());
    })();
  }, [params.id]);

  async function submit(formData: FormData) {
    const payload = {
      name: String(formData.get("name")),
      slug: String(formData.get("slug")),
      description: String(formData.get("description")),
      composition: String(formData.get("composition")),
      priceCents: Math.round(Number(formData.get("price")) * 100),
      stock: Number(formData.get("stock")),
      colors: String(formData.get("colors"))?.split(",").map((s) => s.trim()).filter(Boolean),
      sizes: String(formData.get("sizes"))?.split(",").map((s) => s.trim()).filter(Boolean),
      categoryId: String(formData.get("categoryId")),
    };
    const res = await fetch(`/api/products/${params.id}`, { method: "PATCH", body: JSON.stringify(payload) });
    if (res.ok) router.push("/admin/products");
  }

  async function remove() {
    const res = await fetch(`/api/products/${params.id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/products");
  }

  if (!product) return <p>Loading...</p>;

  return (
    <form action={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div>
          <label className="text-sm">Name</label>
          <input name="name" defaultValue={product.name} className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Slug</label>
          <input name="slug" defaultValue={product.slug} className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Category</label>
          <select name="categoryId" defaultValue={product.categoryId} className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background">
            {cats.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm">Price (USD)</label>
          <input name="price" type="number" step="0.01" defaultValue={(product.priceCents/100).toFixed(2)} className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Stock</label>
          <input name="stock" type="number" defaultValue={product.stock} className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-sm">Colors (comma separated)</label>
          <input name="colors" defaultValue={(product.colors ?? []).join(", ")} className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Sizes (comma separated)</label>
          <input name="sizes" defaultValue={(product.sizes ?? []).join(", ")} className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Composition</label>
          <input name="composition" defaultValue={product.composition ?? ""} className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Description</label>
          <textarea name="description" rows={6} defaultValue={product.description} className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div className="flex gap-2">
          <button className="flex-1 rounded-full bg-foreground text-background py-3">Save</button>
          <button type="button" onClick={remove} className="flex-1 rounded-full border border-red-400 text-red-700 py-3">Delete</button>
        </div>
      </div>
    </form>
  );
}


