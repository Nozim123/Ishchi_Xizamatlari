
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WorkerDetails from './pages/WorkerDetails';
import AdminDashboard from './pages/AdminDashboard';

// Placeholder Pages for future implementation
const Explore = () => <div className="p-10 text-center"><h1 className="text-2xl font-bold">Explore Content</h1><p className="text-gray-400 mt-4">Discover new services and workers near you.</p></div>;
const Notifications = () => <div className="p-10 text-center"><h1 className="text-2xl font-bold">Your Notifications</h1><p className="text-gray-400 mt-4">Stay updated with your job requests.</p></div>;
const Profile = () => (
  <div className="p-10 space-y-8 max-w-lg mx-auto">
    <div className="flex flex-col items-center gap-4">
      <img src="https://picsum.photos/seed/user/200" className="w-24 h-24 rounded-[2rem] border-4 border-white shadow-xl" alt="User" />
      <div className="text-center">
        <h2 className="text-xl font-bold">Dostonbek Rustamov</h2>
        <p className="text-gray-400">Regular User</p>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-4">
      <button className="w-full bg-white p-5 rounded-3xl shadow-sm border border-orange-50 flex items-center justify-between group">
        <div className="flex items-center gap-4">
          <span className="text-2xl">📦</span>
          <span className="font-bold text-gray-800">Order History</span>
        </div>
        <span className="text-orange-500 group-hover:translate-x-1 transition-transform">→</span>
      </button>
      <button className="w-full bg-orange-500 text-white p-6 rounded-[2rem] shadow-xl shadow-orange-100 font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
        <span className="text-xl">🛠️</span>
        Become a Worker
      </button>
      <button className="w-full text-red-500 font-bold p-4">Sign Out</button>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/worker/:id" element={<WorkerDetails />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
