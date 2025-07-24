import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { improveTextWithGemini } from '@/lib/gemini';

export default function App() {
  const [input, setInput] = useState('');
  const [improved, setImproved] = useState('');
  const [explanations, setExplanations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedOnChange = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setImproved('');
        setExplanations([]);
        setError(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const result = await improveTextWithGemini(value);
        setImproved(result.improved);
        setExplanations(result.explanations);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setImproved('');
        setExplanations([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    debouncedOnChange(e.target.value);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 h-screen flex items-center justify-center bg-slate-800">
        <div className="w-full max-w-lg flex flex-col items-center justify-center">
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
