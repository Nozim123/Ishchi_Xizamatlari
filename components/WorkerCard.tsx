
import React from 'react';
import { Worker } from '../types';

interface WorkerCardProps {
  worker: Worker;
  onClick: (id: string) => void;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onClick }) => {
  return (
    <div 
      className="bg-white rounded-3xl p-4 shadow-sm border border-orange-50 mb-4 flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(worker.id)}
    >
      <div className="relative w-24 h-24 flex-shrink-0">
        <img 
          src={worker.avatar} 
          alt={worker.name} 
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
          <span className="text-yellow-500 text-xs">⭐</span>
          <span className="text-[10px] font-bold">{worker.rating}</span>
          <span className="text-[8px] text-gray-400">({worker.reviewCount/1000}k)</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-gray-800 text-sm">{worker.name}</h3>
              {worker.isVerified && (
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-[10px]">
              <span>🛡️</span>
              <span>{worker.profession}</span>
            </div>
          </div>
          <button className="text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368c-.404.808-.46 1.743-.16 2.632m0-8c.404-.808.46-1.743.16-2.632m0 10.632a3 3 0 105.368 0m-5.368 0h.01m5.358-10.632a3 3 0 110 5.368m0-5.368h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="bg-orange-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold">
            ₹{worker.hourlyRate}/hrs
          </div>
          <button className="bg-gray-100 p-2 rounded-xl">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          </button>
        </div>

        <div className="flex -space-x-2 mt-2">
          {[1,2,3].map(i => (
            <img key={i} src={`https://picsum.photos/seed/face${i}/50`} className="w-6 h-6 rounded-full border-2 border-white" alt="expert" />
          ))}
          <div className="w-6 h-6 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[8px] text-orange-600 font-bold">
            5+
          </div>
          <span className="text-[10px] text-gray-400 ml-3 flex items-center italic">Similar Experts</span>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
