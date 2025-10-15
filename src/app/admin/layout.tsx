import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") redirect("/login");
  return (
    <div className="container-page py-10">
      <h1 className="heading-serif text-2xl mb-6">Admin</h1>
      <nav className="flex gap-4 text-sm mb-8">
        <a href="/admin/overview" className="underline">Overview</a>
        <a href="/admin/products" className="underline">Products</a>
        <a href="/admin/orders" className="underline">Orders</a>
        <a href="/admin/categories" className="underline">Categories</a>
      </nav>
      {children}
    </div>
  );
}


