"use client";
import { useEffect, useState } from "react";

export default function CategoriesAdminPage() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  async function load() {
    const res = await fetch("/api/categories");
    setList(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function add() {
    if (!name || !slug) return;
    const res = await fetch("/api/categories", { method: "POST", body: JSON.stringify({ name, slug }) });
    if (res.ok) { setName(""); setSlug(""); load(); }
  }

  async function remove(id: string) {
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <h2 className="heading-serif text-xl mb-4">Categories</h2>
      <div className="flex gap-2 mb-6">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-3 rounded-md bg-background" />
        <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" className="border p-3 rounded-md bg-background" />
        <button onClick={add} className="rounded-full bg-foreground text-background px-4">Add</button>
      </div>
      <ul className="space-y-2">
        {list.map((c) => (
          <li key={c.id} className="flex items-center justify-between border rounded-md p-3">
            <span className="text-sm">{c.name} <span className="text-foreground/60">({c.slug})</span></span>
            <button onClick={() => remove(c.id)} className="text-xs underline">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


