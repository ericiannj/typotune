import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface InputContainerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClear: () => void;
}

export default function InputContainer({
  value,
  onChange,
  onClear,
}: InputContainerProps) {
  return (
    <div className="w-4/5 flex flex-col items-center justify-center bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-4 sm:p-6 lg:p-8 mb-4">
      <div className="w-full">
        <Textarea
          value={value}
          onChange={onChange}
          placeholder="Type or paste your English text here..."
          className="w-full text-md h-32 sm:h-40 lg:h-48 p-4 sm:p-6 bg-gray-700/50 border-2 border-gray-600/50 rounded-2xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 text-white transition-all duration-300 text-base sm:text-lg leading-relaxed placeholder:text-gray-500"
        />
      </div>
      <div className="w-full flex items-center justify-between mt-2">
        <button
          onClick={onClear}
          className="px-4 py-2 cursor-pointer bg-gray-700/80 hover:bg-gray-600/80 text-gray-300 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center hover:shadow-lg transform hover:scale-[1.02] backdrop-blur-sm"
          title="Clear text"
        >
          <span className="text-sm">🗑️</span>
        </button>
        <span className="text-sm text-gray-400 dark:text-gray-500">
          {value.length} characters
        </span>
      </div>
    </div>
  );
}
