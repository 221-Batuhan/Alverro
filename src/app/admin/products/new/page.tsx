"use client";
import { useEffect, useState } from "react";
import CloudinaryClient from "./CloudinaryClient";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const [cats, setCats] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();
  useEffect(() => { (async () => { const res = await fetch("/api/categories"); setCats(await res.json()); })(); }, []);

  async function submit(formData: FormData) {
    const images = JSON.parse(String(formData.get("images") || "[]"));
    const payload = {
      name: String(formData.get("name")),
      slug: String(formData.get("slug")),
      description: String(formData.get("description")),
      composition: String(formData.get("composition")),
      images,
      priceCents: Math.round(Number(formData.get("price")) * 100),
      stock: Number(formData.get("stock")),
      colors: String(formData.get("colors"))?.split(",").map((s) => s.trim()).filter(Boolean),
      sizes: String(formData.get("sizes"))?.split(",").map((s) => s.trim()).filter(Boolean),
      categoryId: String(formData.get("categoryId")),
    };
    const res = await fetch("/api/products", { method: "POST", body: JSON.stringify(payload) });
    if (res.ok) router.push("/admin/products");
  }

  return (
    <form action={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div>
          <label className="text-sm">Name</label>
          <input name="name" className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Slug</label>
          <input name="slug" className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Category</label>
          <select name="categoryId" className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background">
            {cats.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm">Price (USD)</label>
          <input name="price" type="number" step="0.01" className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Stock</label>
          <input name="stock" type="number" className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-sm">Images</label>
          <ImagesField />
        </div>
        <div>
          <label className="text-sm">Colors (comma separated)</label>
          <input name="colors" className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Sizes (comma separated)</label>
          <input name="sizes" className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Composition</label>
          <input name="composition" className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <div>
          <label className="text-sm">Description</label>
          <textarea name="description" rows={6} className="mt-1 w-full border border-foreground/20 rounded-md p-3 bg-background" />
        </div>
        <button className="w-full rounded-full bg-foreground text-background py-3">Create</button>
      </div>
    </form>
  );
}

function ImagesField() {
  const [images, setImages] = useState<string[]>([]);
  return (
    <div className="space-y-2">
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <div className="flex flex-wrap gap-2">
        {images.map((u) => (
          <div key={u} className="h-16 w-16 rounded-md bg-gradient-to-br from-[#D8D4CD] to-[#F8F4E3]" />
        ))}
      </div>
      <CloudinaryClient onAdd={(url) => setImages((v) => [...v, url])} />
    </div>
  );
}


