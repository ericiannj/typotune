import React from 'react';

interface ResultsSectionProps {
  children: React.ReactNode;
}

export default function ResultsSection({ children }: ResultsSectionProps) {
  return (
    <div className="w-full lg:w-1/2 min-h-screen lg:h-screen flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/40 to-indigo-100/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1)_0%,transparent_50%)]"></div>
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl flex flex-col gap-3 sm:gap-4 relative z-10">
        {children}
      </div>
    </div>
  );
}
