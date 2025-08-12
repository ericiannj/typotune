import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TextCardProps {
  title: string;
  children: React.ReactNode;
  showCopyButton?: boolean;
  copyText?: string;
  onCopy?: () => void;
}

export default function TextCard({
  title,
  children,
  showCopyButton = false,
  copyText,
  onCopy,
}: TextCardProps) {
  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    } else if (copyText) {
      navigator.clipboard.writeText(copyText);
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
        {showCopyButton && (
          <button
            className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-all duration-300 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 cursor-pointer disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500 disabled:cursor-default shadow-md hover:shadow-lg transform hover:scale-105 disabled:scale-100"
            onClick={handleCopy}
            disabled={!copyText}
            title={`Copy ${title.toLowerCase()}`}
          >
            Copy
          </button>
        )}
      </CardHeader>
      <CardContent className="text-gray-700 min-h-[80px] sm:min-h-[100px] max-h-[200px] sm:max-h-[300px] overflow-auto p-4 sm:p-6">
        {children}
      </CardContent>
    </Card>
  );
}
