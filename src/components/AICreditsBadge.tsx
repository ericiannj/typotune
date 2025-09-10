import React from 'react';

export default function AICreditsBadge() {
  return (
    <div className="flex justify-center mt-6">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/30 backdrop-blur-sm rounded-full border border-gray-700/30 shadow-sm">
        <span className="text-sm">🤖</span>
        <p className="text-gray-500 text-xs">Powered by Google Gemini AI</p>
      </div>
    </div>
  );
}
