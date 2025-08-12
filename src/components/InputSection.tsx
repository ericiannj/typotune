import React from 'react';

interface InputSectionProps {
  children: React.ReactNode;
}

export default function InputSection({ children }: InputSectionProps) {
  return (
    <div className="w-full lg:w-1/2 h-[95vh] lg:h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-slate-800">
      <div className="flex flex-col items-center w-full">{children}</div>
    </div>
  );
}
