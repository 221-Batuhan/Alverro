import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', { 
        method: 'POST',
        credentials: 'include' 
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
  ];

  return (
    // CHANGED: bg-white -> bg-black, text-black -> text-white
    <div className="flex h-screen bg-black font-sans text-white">
      
      {/* Sidebar: Dark border, luxury spacing */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col justify-between p-8">
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-widest mb-12 text-white">
            ALVERRO<span className="text-xs align-top text-zinc-500 ml-1">ADMIN</span>
          </h1>
          <nav className="space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                  location.pathname === item.path 
                    ? 'text-white font-bold border-l-2 border-white pl-4' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <button 
          onClick={handleLogout} 
          className="text-left text-[10px] uppercase tracking-widest text-red-500 hover:text-red-400"
        >
          Log Out
        </button>
      </aside>

      {/* Main Content: Dark background */}
      <main className="flex-1 overflow-y-auto bg-black p-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;