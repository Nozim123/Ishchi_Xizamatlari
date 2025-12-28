
import React, { useState } from 'react';
import { CATEGORIES, MOCK_WORKERS } from '../constants';
import WorkerCard from '../components/WorkerCard';
import { useNavigate } from 'react-router-dom';
import { geminiService } from '../services/geminiService';
import { Worker } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState<{ workerId: string; justification: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Filter States
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterExp, setFilterExp] = useState<number | null>(null);
  const [filterAvailability, setFilterAvailability] = useState<string | null>(null);

  const tabs = ['All', 'On Going Works', 'Completed Works'];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setRecommendations([]);
      return;
    }
    setIsSearching(true);
    const results = await geminiService.getSmartMatchRecommendations(searchQuery, MOCK_WORKERS);
    setRecommendations(results);
    setIsSearching(false);
  };

  const filteredWorkers = MOCK_WORKERS.filter(worker => {
    const matchesSearch = searchQuery.trim() === '' || 
                          worker.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          worker.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          worker.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRating = filterRating ? worker.rating >= filterRating : true;
    const matchesExp = filterExp ? worker.experience >= filterExp : true;
    const matchesAvail = filterAvailability ? worker.availability === filterAvailability : true;
    
    return matchesSearch && matchesRating && matchesExp && matchesAvail;
  });

  return (
    <div className="p-5 md:p-0">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="text-xl font-black text-gray-800 italic flex items-center">
          SnapServe<span className="text-orange-600">.</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-orange-500 text-white w-9 h-9 rounded-xl flex items-center justify-center text-xl font-bold hover:bg-orange-600 transition-all shadow-md active:scale-95">+</button>
          <button className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm relative hover:bg-gray-50 transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="What service do you need?" 
          className="w-full bg-white rounded-3xl py-4.5 pl-14 pr-14 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-100 border border-transparent transition-all placeholder:text-gray-300"
        />
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-300">🔍</span>
        <button 
          onClick={handleSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 bg-orange-50 p-2 rounded-xl hover:bg-orange-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </button>
      </div>

      {/* Filter Section - Prominent Placement */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Filters</h4>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm hover:border-orange-200 transition-colors min-w-fit">
            <span className="text-yellow-500">⭐</span>
            <select 
              onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
              className="bg-transparent text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="">Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm hover:border-orange-200 transition-colors min-w-fit">
            <span className="text-blue-500">🏆</span>
            <select 
              onChange={(e) => setFilterExp(e.target.value ? Number(e.target.value) : null)}
              className="bg-transparent text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="">Experience</option>
              <option value="5">5+ Years</option>
              <option value="10">10+ Years</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm hover:border-orange-200 transition-colors min-w-fit">
            <span className="text-green-500">🟢</span>
            <select 
              onChange={(e) => setFilterAvailability(e.target.value || null)}
              className="bg-transparent text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="">Status</option>
              <option value="free">Available</option>
              <option value="busy">Busy</option>
            </select>
          </div>
        </div>
      </section>

      {/* Categories Section with Tooltips */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-black text-gray-800 tracking-tight">Browse Categories</h3>
          <button className="text-orange-500 text-xs font-bold hover:underline">See All</button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-5">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="flex flex-col items-center gap-3 cursor-pointer group relative">
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-2 pointer-events-none z-30 whitespace-nowrap font-black">
                {cat.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-gray-900"></div>
              </div>
              
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:-rotate-3 ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-500 group-hover:text-orange-600 transition-colors uppercase tracking-wider">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AI Smart Match Recommendations */}
      {!isSearching && recommendations.length > 0 && (
        <section className="mb-12">
          <div className="bg-orange-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-orange-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg width="150" height="150" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="white" strokeWidth="10" fill="none" /></svg>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✨</span>
              <h3 className="text-xl font-black">AI Recommended for you</h3>
            </div>

            <div className="space-y-6">
              {recommendations.map((rec) => {
                const worker = MOCK_WORKERS.find(w => w.id === rec.workerId);
                if (!worker) return null;
                return (
                  <div key={rec.workerId} className="bg-white/10 backdrop-blur-md rounded-3xl p-1 border border-white/20 hover:bg-white/20 transition-all cursor-pointer" onClick={() => navigate(`/worker/${worker.id}`)}>
                    <div className="flex items-center gap-4 p-4">
                      <img src={worker.avatar} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30" alt={worker.name} />
                      <div className="flex-1">
                        <div className="font-bold text-lg">{worker.name}</div>
                        <div className="text-xs text-white/70">{worker.profession} • ⭐ {worker.rating}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black">₹{worker.hourlyRate}</div>
                        <div className="text-[10px] text-white/50">per hour</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 m-1 mt-0">
                      <p className="text-[11px] text-orange-900 font-medium leading-relaxed">
                        <span className="font-black text-orange-600">WHY MATCHED: </span>
                        {rec.justification}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tabs / Segmented Control */}
      <div className="flex p-1.5 bg-gray-100 rounded-[2rem] mb-10 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-fit px-6 py-3.5 rounded-[1.8rem] text-xs font-black transition-all ${
              activeTab === tab 
              ? 'bg-white text-orange-600 shadow-sm' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
            {tab === 'On Going Works' && (
              <span className="ml-2 bg-orange-500 text-white text-[9px] px-2 py-0.5 rounded-full">16</span>
            )}
          </button>
        ))}
      </div>

      {/* Worker List Results */}
      <section className="pb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-800 tracking-tight">
            {searchQuery ? `Search results for "${searchQuery}"` : "Our Top Professionals"}
          </h3>
          <span className="text-gray-400 text-xs font-bold">{filteredWorkers.length} found</span>
        </div>
        
        <div className="space-y-4">
          {isSearching ? (
             <div className="flex flex-col items-center py-16 gap-4">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Finding the perfect master...</p>
             </div>
          ) : filteredWorkers.length > 0 ? (
            filteredWorkers.map(worker => (
              <WorkerCard 
                key={worker.id} 
                worker={worker} 
                onClick={(id) => navigate(`/worker/${id}`)}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="text-gray-400 font-bold">No results found.</p>
              <p className="text-gray-300 text-xs mt-1">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
