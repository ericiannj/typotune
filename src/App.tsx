import React, { useState, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useTextImprovement from './hooks/useTextImprovement';

export default function App() {
  const [input, setInput] = useState('');
  const { apiState, improveText } = useTextImprovement();
  const { improved, explanations, loading, error } = apiState;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    improveText(e.target.value);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 h-screen flex flex-col items-center justify-center bg-[#1F4A3A]">
        <div className="flex flex-col items-center gap-[100px] w-full">
          <div className="flex items-center gap-2">
            <img src="/typing.png" alt="Typotune" className="w-8 h-8" />
            <h1 className="text-3xl font-bold text-slate-100">Typotune</h1>
          </div>
          <div className="w-4/5 flex flex-col items-center justify-center">
            <label
              htmlFor="input"
              className="mb-4 font-semibold text-center w-full text-slate-100"
            >
              Your Text
            </label>
            <Textarea
              id="input"
              value={input}
              onChange={handleChange}
              placeholder="Type your text here..."
              className="min-h-[300px] w-full max-h-[300px] overflow-auto text-slate-100"
              aria-label="Text input for improvement"
            />
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-xl flex flex-col gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Improved Text
              </CardTitle>
              <button
                className="px-3 py-1 rounded text-sm transition bg-blue-500 text-white hover:bg-blue-600 cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-default"
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
            <CardContent className="text-muted-foreground min-h-[100px] max-h-[300px] overflow-auto">
              {loading ? (
                <span>Loading...</span>
              ) : error ? (
                <span className="text-red-500">{error}</span>
              ) : improved ? (
                <span>{improved}</span>
              ) : (
                <span>Improved text will appear here</span>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Explanations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground min-h-[100px] max-h-[300px] overflow-auto">
              {loading ? (
                <span>Loading...</span>
              ) : error ? (
                <span className="text-red-500">{error}</span>
              ) : explanations.length > 0 ? (
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
              ) : (
                <span>Explanations will appear here</span>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
