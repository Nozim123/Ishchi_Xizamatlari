
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/explore', label: 'Explore', icon: '🧭' },
    { path: '/notifications', label: 'Notification', icon: '🔔' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pl-64 bg-[#FAF6F4]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl p-6 z-50">
        <div className="text-2xl font-black text-orange-600 mb-12 italic">SnapServe<span className="text-gray-800">.</span></div>
        <nav className="flex-1 space-y-4">
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                location.pathname === item.path ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-500 hover:bg-orange-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
          <hr className="my-4" />
          <button
            onClick={() => navigate('/admin')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
              location.pathname.startsWith('/admin') ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">🛠️</span>
            <span className="font-semibold">Admin Panel</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto md:max-w-none md:p-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      {!isAdmin && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center md:hidden z-50 rounded-t-[2.5rem] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 group"
            >
              <span className={`text-2xl transition-transform ${location.pathname === item.path ? 'scale-110' : 'opacity-40'}`}>
                {item.icon}
              </span>
              <span className={`text-[10px] font-medium transition-colors ${location.pathname === item.path ? 'text-orange-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          ))}
          {/* Floating Action Button for Emergency */}
          <button className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-[#FAF6F4] hover:scale-110 transition-transform">
            <span className="text-2xl">⚡</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default Layout;
