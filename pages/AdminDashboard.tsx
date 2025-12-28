
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', users: 4000, jobs: 2400 },
  { name: 'Tue', users: 3000, jobs: 1398 },
  { name: 'Wed', users: 2000, jobs: 9800 },
  { name: 'Thu', users: 2780, jobs: 3908 },
  { name: 'Fri', users: 1890, jobs: 4800 },
  { name: 'Sat', users: 2390, jobs: 3800 },
  { name: 'Sun', users: 3490, jobs: 4300 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-400 font-medium">Platform Management & Real-time Analytics</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white px-6 py-3 rounded-2xl font-bold shadow-sm border border-gray-100 hover:bg-gray-50">Reports</button>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-600 transition-colors">Export CSV</button>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Users', val: '12.5k', change: '+12%', color: 'text-blue-500' },
          { label: 'Pending Workers', val: '45', change: '8 new', color: 'text-orange-500' },
          { label: 'Total Earnings', val: '₹420k', change: '+24%', color: 'text-green-500' },
          { label: 'Success Rate', val: '98.2%', change: '+0.5%', color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-orange-50">
            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-gray-800">{stat.val}</div>
              <div className={`text-[10px] font-bold ${stat.color}`}>{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Real-time Load */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-50">
          <h3 className="text-lg font-black mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Job Request Density
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E86D44" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#E86D44" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#7A7A7A', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="jobs" stroke="#E86D44" fillOpacity={1} fill="url(#colorJobs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Locations Heatmap Table */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-50">
          <h3 className="text-lg font-black mb-6">Regional Performance</h3>
          <div className="space-y-6">
            {[
              { region: 'Tashkent City', users: 5400, load: 'High', color: 'bg-red-500' },
              { region: 'Samarkand', users: 3200, load: 'Medium', color: 'bg-orange-500' },
              { region: 'Bukhara', users: 1800, load: 'Low', color: 'bg-green-500' },
              { region: 'Andijan', users: 1200, load: 'Medium', color: 'bg-orange-500' },
            ].map((reg, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm font-bold text-gray-800 mb-1">
                    <span>{reg.region}</span>
                    <span>{reg.users}</span>
                  </div>
                  <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div className={`${reg.color} h-full`} style={{width: `${(reg.users/6000)*100}%`}}></div>
                  </div>
                </div>
                <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${reg.color} text-white`}>{reg.load}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-orange-50 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-black">Pending Worker Verification</h3>
          <button className="text-orange-600 font-bold text-sm">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Worker</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Experience</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map(i => (
                <tr key={i} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://picsum.photos/seed/p${i}/100`} className="w-10 h-10 rounded-xl" alt="Worker" />
                      <div>
                        <div className="font-bold text-gray-800">Master {i}</div>
                        <div className="text-[10px] text-gray-400">master{i}@mail.uz</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm font-medium text-gray-600">Plumbing</td>
                  <td className="px-8 py-4 text-sm font-medium text-gray-600">5+ years</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="bg-green-500 text-white p-2 rounded-xl shadow-md shadow-green-100 hover:scale-110 transition-transform">✓</button>
                      <button className="bg-red-500 text-white p-2 rounded-xl shadow-md shadow-red-100 hover:scale-110 transition-transform">✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
