import React from 'react';

export default function AICreditsBadge() {
  return (
    <div className="text-center mt-4">
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-xl rounded-full border border-gray-700/50 shadow-lg">
        <span className="text-xl">🤖</span>
        <p className="text-gray-400 font-sm">Powered by Google Gemini AI</p>
      </div>
    </div>
  );
}
