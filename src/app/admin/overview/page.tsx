import { prisma } from "@/lib/prisma";

export default async function OverviewPage() {
  const [products, orders, users] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="border rounded-xl p-6"><p className="text-sm">Products</p><p className="text-2xl mt-2">{products}</p></div>
      <div className="border rounded-xl p-6"><p className="text-sm">Orders</p><p className="text-2xl mt-2">{orders}</p></div>
      <div className="border rounded-xl p-6"><p className="text-sm">Customers</p><p className="text-2xl mt-2">{users}</p></div>
    </div>
  );
}


