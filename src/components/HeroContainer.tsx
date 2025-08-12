import React from 'react';

export default function HeroContainer() {
  return (
    <div className="text-center mb-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
        <span className="text-2xl">
          <img src="/typing.png" alt="TypoTune" className="w-16 h-16" />
        </span>
      </div>
      <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-100 mb-6 tracking-tight">
        TypoTune
      </h1>
      <p className="text-md md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4 sm:px-6 lg:px-8">
        Transform your writing with AI-powered improvements and insights.
      </p>
    </div>
  );
}
