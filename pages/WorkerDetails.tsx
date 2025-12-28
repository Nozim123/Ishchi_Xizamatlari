
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_WORKERS } from '../constants';
import { Worker } from '../types';
import { geminiService } from '../services/geminiService';

const WorkerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState<'free' | 'busy'>('free');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const found = MOCK_WORKERS.find(w => w.id === id);
    if (found) {
      setWorker(found);
      setAvailability(found.availability === 'busy' ? 'busy' : 'free');
      geminiService.summarizeWorkerReviews(found).then(setSummary);
    }
    setLoading(false);
  }, [id]);

  const toggleAvailability = () => {
    setIsUpdating(true);
    // Simulate a network delay for the toggle
    setTimeout(() => {
      setAvailability(prev => prev === 'free' ? 'busy' : 'free');
      setIsUpdating(false);
    }, 500);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FAF6F4] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-400 font-black text-xs uppercase tracking-widest">Opening Profile...</p>
    </div>
  );

  if (!worker) return (
    <div className="min-h-screen bg-[#FAF6F4] flex items-center justify-center p-10 text-center">
      <div>
        <span className="text-6xl mb-4 block">🚫</span>
        <h2 className="text-2xl font-black text-gray-800">Worker not found</h2>
        <button onClick={() => navigate('/')} className="mt-6 text-orange-600 font-bold">Back to Home</button>
      </div>
    </div>
  );

  const dates = [
    { label: 'Fri', num: 10 },
    { label: 'Sat', num: 11 },
    { label: 'Sun', num: 12 },
    { label: 'Mon', num: 13 },
    { label: 'Tue', num: 14 },
    { label: 'Wed', num: 15 },
  ];

  return (
    <div className="min-h-screen bg-white max-w-2xl mx-auto shadow-2xl relative">
      {/* Top Banner with Image */}
      <div className="relative h-[350px] overflow-hidden">
        <img src={worker.avatar} className="w-full h-full object-cover" alt={worker.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20"></div>
        
        {/* Navigation Actions */}
        <div className="absolute top-8 left-6 right-6 flex justify-between z-10">
          <button onClick={() => navigate(-1)} className="bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl hover:bg-white transition-all transform active:scale-90">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div className="flex gap-3">
            <div className="bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-2xl text-white font-black text-xs uppercase tracking-widest hidden sm:flex items-center">Verified Professional</div>
            <button className="bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl text-red-500 hover:bg-white transition-all transform active:scale-90">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/></svg>
            </button>
          </div>
        </div>

        {/* Dynamic Stats Chips */}
        <div className="absolute bottom-12 left-6 right-6 flex justify-between gap-4">
          <div className="bg-white/95 backdrop-blur-xl p-4 rounded-3xl shadow-2xl flex-1 text-center border border-white">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Experience</div>
            <div className="font-black text-gray-800 text-lg">{worker.experience}+</div>
          </div>
          <div className="bg-white/95 backdrop-blur-xl p-4 rounded-3xl shadow-2xl flex-1 text-center border border-white">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Rating</div>
            <div className="font-black text-gray-800 text-lg">⭐ {worker.rating}</div>
          </div>
          <div className="bg-white/95 backdrop-blur-xl p-4 rounded-3xl shadow-2xl flex-1 text-center border border-white">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Success</div>
            <div className="font-black text-gray-800 text-lg">{worker.completionRate}%</div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-8 bg-white rounded-t-[3.5rem] -mt-10 relative z-10 space-y-10 pb-32">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3 tracking-tight">
              {worker.name}
              {worker.isVerified && (
                <div className="bg-blue-500 p-1 rounded-full text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                </div>
              )}
            </h2>
            <div className="text-gray-400 font-bold text-sm flex items-center gap-2">
              <span>📍</span> {worker.location || 'Tashkent, Uzbekistan'}
            </div>
          </div>
          
          {/* Availability Toggle Switch */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Availability</span>
            <button 
              disabled={isUpdating}
              onClick={toggleAvailability}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all focus:outline-none shadow-inner border-2 ${
                availability === 'free' ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600'
              } ${isUpdating ? 'opacity-50' : 'hover:scale-105 active:scale-95 shadow-lg'}`}
            >
              <span
                className={`${
                  availability === 'free' ? 'translate-x-7' : 'translate-x-1'
                } inline-block h-5 w-5 transform rounded-full bg-white transition-all shadow-md flex items-center justify-center`}
              >
                {isUpdating && <div className="w-2.5 h-2.5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>}
              </span>
            </button>
            <span className={`text-[10px] font-black tracking-widest ${availability === 'free' ? 'text-green-600' : 'text-red-600'}`}>
              {availability === 'free' ? 'AVAILABLE' : 'BUSY'}
            </span>
          </div>
        </div>

        {/* AI Insight Box */}
        {summary && (
          <div className="bg-orange-50/70 p-6 rounded-[2.5rem] border border-orange-100/50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500"></div>
            <h3 className="text-[10px] font-black text-orange-600 mb-3 flex items-center gap-2 uppercase tracking-widest">
              <span className="text-base">✨</span> Platform AI Insight
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed italic font-medium">"{summary}"</p>
          </div>
        )}

        {/* Pricing Card */}
        <div className="flex justify-between items-center bg-gray-50 border border-gray-100 p-6 rounded-[2.5rem] shadow-sm">
           <div className="space-y-1">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Standard Hourly Rate</span>
             <div className="text-4xl font-black text-gray-800">₹{worker.hourlyRate}<span className="text-xl text-gray-400">/hr</span></div>
           </div>
           <div className="text-right">
             <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase mb-2 tracking-widest">Premium Service</div>
             <span className="text-[10px] text-gray-400 font-bold block">No Hidden Fees</span>
           </div>
        </div>

        {/* Space Estimation */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-gray-800 text-lg tracking-tight">Job Scope Estimation</h3>
            <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-xl text-[10px] font-black uppercase">Auto-Calc</div>
          </div>
          <div className="relative py-6">
            <div className="h-2.5 bg-gray-100 rounded-full w-full shadow-inner overflow-hidden">
                <div className="h-full bg-orange-200 w-[40%] rounded-full"></div>
            </div>
            <div className="absolute top-1/2 left-[40%] -translate-y-1/2 w-8 h-8 bg-orange-600 border-4 border-white rounded-full shadow-2xl hover:scale-125 transition-transform cursor-pointer"></div>
            <div className="flex justify-between mt-4 text-[11px] text-gray-400 font-black uppercase tracking-widest">
              <span>Minor Repair (1h)</span>
              <span>Major Project (10h+)</span>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="space-