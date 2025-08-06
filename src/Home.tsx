import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useTextImprovement from './hooks/useTextImprovement';

export default function Home() {
  const [input, setInput] = useState('');
  const { apiState, improveText, handleReset } = useTextImprovement();
  const { improved, explanations, loading, error } = apiState;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    improveText(e.target.value);
  };

  const handleClear = () => {
    setInput('');
    handleReset();
  };

  const renderImprovedText = () => {
    if (loading) return <span>Loading...</span>;
    if (error) return <span className="text-red-500">{error}</span>;
    if (improved) return <span>{improved}</span>;
    return <span>Improved text will appear here</span>;
  };

  const renderExplanations = () => {
    if (loading) return <span>Loading...</span>;
    if (error) return <span className="text-red-500">{error}</span>;
    if (explanations.length > 0) {
      return (
        <div>
          {explanations[0]
            .split(/\s*\*\s+/)
            .filter(Boolean)
            .map((exp, i) => (
              <div key={i} className="mb-2">
                {'* ' + exp.trim()}
              </div>
            ))}
        </div>
      );
    }
    return <span>Explanations will appear here</span>;
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-slate-800">
        <div className="flex flex-col items-center  w-full">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <span className="text-2xl">
                <img src="/typing.png" alt="TypoTune" className="w-16 h-16" />
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-100 mb-6 tracking-tight">
              TypoTune
            </h1>
            <p className="text-md md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transform your writing with AI-powered improvements and insights.
            </p>
          </div>
          <div className="w-4/5 flex flex-col items-center justify-center bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 mb-4">
            <div className="w-full">
              <Textarea
                value={input}
                onChange={handleChange}
                placeholder="Type or paste your English text here..."
                className="w-full text-md
                 h-48 p-6 bg-gray-700/50 border-2 border-gray-600/50 rounded-2xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 text-white transition-all duration-300 text-lg leading-relaxed placeholder:text-gray-500"
              />
            </div>
            <div className="w-full flex items-center justify-between mt-2">
              <button
                onClick={handleClear}
                className="px-4 py-2 cursor-pointer bg-gray-700/80 hover:bg-gray-600/80 text-gray-300 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center hover:shadow-lg transform hover:scale-[1.02] backdrop-blur-sm"
                title="Clear text"
              >
                <span className="text-sm">🗑️</span>
              </button>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {input.length} characters
              </span>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-xl rounded-full border border-gray-700/50 shadow-lg">
            <span className="text-xl">🤖</span>
            <p className="text-gray-400 font-sm">Powered by Google Gemini AI</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/40 to-indigo-100/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1)_0%,transparent_50%)]"></div>
        <div className="w-full max-w-xl flex flex-col gap-4 relative z-10">
          <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Improved Text
              </CardTitle>
              <button
                className="px-3 py-1 rounded-lg text-sm transition-all duration-300 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 cursor-pointer disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500 disabled:cursor-default shadow-md hover:shadow-lg transform hover:scale-105 disabled:scale-100"
                onClick={() => {
                  if (improved) {
                    navigator.clipboard.writeText(improved);
                  }
                }}
                disabled={!improved}
                title="Copy improved text"
              >
                Copy
              </button>
            </CardHeader>
            <CardContent className="text-gray-700 min-h-[100px] max-h-[300px] overflow-auto">
              {renderImprovedText()}
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Explanations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 min-h-[100px] max-h-[300px] overflow-auto">
              {renderExplanations()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
