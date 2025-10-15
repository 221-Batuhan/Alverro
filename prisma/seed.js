// prisma/seed.js
import { PrismaClient } from "../src/generated/prisma/index.js"; // doğru path
import bcrypt from "bcryptjs";
import { mockProducts } from "./mockProducts.js"; // prisma klasöründeki mockProducts

const prisma = new PrismaClient();

async function main() {
  // Kategoriler
  const categoriesData = [
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

  // Kategorileri upsert et
  for (const c of categoriesData) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
  }

  // Admin kullanıcı
  const adminEmail = "admin@alverro.com";
  const adminPass = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: { email: adminEmail, name: "Admin", passwordHash: adminPass, role: "ADMIN" },
  });

  // Ürünleri ekle
  for (const p of mockProducts) {
    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
    if (!category) continue;

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        composition: p.composition,
        images: p.images,
        priceCents: p.priceCents,
        stock: p.stock,
        colors: p.colors,
        sizes: p.sizes,
        categoryId: category.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed tamamlandı!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
