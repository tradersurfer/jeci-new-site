import React from 'react';
import { useLocation } from "wouter";
import { ChevronLeft, Calendar } from "lucide-react";

export default function SubpageNav() {
  const [, setLocation] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-yellow-500 transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Back to JECI Group
        </button>

        <button 
          onClick={() => setLocation('/book-consultation')}
          className="bg-yellow-500 text-slate-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-400 transition-all flex items-center gap-2"
        >
          <Calendar size={16} /> Book Consultation
        </button>
      </div>
    </nav>
  );
}