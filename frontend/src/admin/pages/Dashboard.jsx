import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';

// CHANGED: bg-white -> bg-zinc-900, text colors updated
const StatCard = ({ label, value }) => (
  <div className="bg-zinc-900 p-8 border border-zinc-800">
    <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mb-3">{label}</p>
    <p className="text-3xl font-serif text-white">{value}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ revenue: 0, orderCount: 0, productCount: 0, customerCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/stats', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.stats);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <AdminLayout><div className="text-zinc-500">Loading data...</div></AdminLayout>;

  return (
    <AdminLayout>
      <h2 className="text-2xl font-light text-white mb-10 tracking-wide">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Revenue" value={`€${stats.revenue.toLocaleString()}`} />
        <StatCard label="Orders" value={stats.orderCount} />
        <StatCard label="Products" value={stats.productCount} />
        <StatCard label="Customers" value={stats.customerCount} />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;