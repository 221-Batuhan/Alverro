async function getOrders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/orders`, { cache: "no-store" });
  return res.ok ? res.json() : [];
}

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div>
      <h2 className="heading-serif text-xl mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Order</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o: any) => (
              <tr key={o.id} className="border-b">
                <td className="py-2">{o.id.slice(0, 8)}</td>
                <td className="py-2">{o.user?.email}</td>
                <td className="py-2">{(o.totalCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                <td className="py-2">{o.status}</td>
                <td className="py-2">{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


