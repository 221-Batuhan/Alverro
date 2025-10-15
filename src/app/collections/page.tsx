import Link from "next/link";

const categories = [
  { slug: "knitwear", name: "Knitwear (Kazak & Hırka)" },
  { slug: "jackets-trench", name: "Jackets & Trench Coats" },
  { slug: "overcoats", name: "Overcoats (Kaban)" },
  { slug: "leather", name: "Leather Jackets (Deri Ceket)" },
  { slug: "blazers", name: "Blazers" },
  { slug: "shirts", name: "Shirts (Gömlek)" },
  { slug: "polo", name: "Polo Shirts" },
  { slug: "tshirts", name: "T-Shirts" },
  { slug: "pants", name: "Pants (Pantolon)" },
  { slug: "jeans", name: "Jeans" },
  { slug: "suits", name: "Suits (Takım Elbise)" },
  { slug: "fragrances", name: "Fragrances (Parfüm)" },
  { slug: "underwear", name: "Underwear (İç Giyim)" },
];

export default function CollectionsPage() {
  return (
    <div className="container-page py-14">
      <h1 className="heading-serif text-3xl md:text-4xl mb-8">Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#D8D4CD] to-[#F8F4E3] min-h-[220px] flex items-end"
          >
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition" />
            <div className="relative z-10 p-5">
              <p className="text-white text-lg font-medium">{c.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


