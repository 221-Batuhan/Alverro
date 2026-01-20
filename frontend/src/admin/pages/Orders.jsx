import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/orders', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success) setOrders(data.orders);
      });
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/admin/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ orderStatus: newStatus }),
    });
    // Refresh local state to reflect change immediately
    setOrders(orders.map(o => o._id === id ? { ...o, orderStatus: newStatus } : o));
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-light mb-8">Orders</h2>
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4 font-normal">Order ID</th>
              <th className="p-4 font-normal">Customer</th>
              <th className="p-4 font-normal">Total</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-4 font-mono">{order.orderNumber}</td>
                <td className="p-4">{order.user?.name || 'Guest'}</td>
                <td className="p-4">€{order.totalPrice}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs uppercase tracking-wider ${
                    order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border border-gray-300 text-xs p-1 bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Orders;