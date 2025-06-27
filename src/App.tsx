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
    <>
      {/* tailwind-colors: bg-red-500 bg-blue-500 */}
      <div className="min-h-screen flex">
        {/* Left column */}
        <div className="w-1/2 h-screen flex items-center justify-center bg-red-500">
          <div className="w-full max-w-lg flex flex-col items-center justify-center">
            <label
              htmlFor="input"
              className="mb-4 font-semibold text-center w-full"
            >
              Your Text
            </label>
            <Textarea
              id="input"
              value={input}
              onChange={handleChange}
              placeholder="Type your text here..."
              className="min-h-[300px] w-full"
              aria-label="Text input for improvement"
            />
          </div>
        </div>
        {/* Right column */}
        <div className="w-1/2 h-screen flex items-center justify-center bg-blue-500">
          <div className="w-full max-w-xl flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Improved Text</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground min-h-[100px]">
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
                <CardTitle>Explanations</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground min-h-[100px]">
                {loading ? (
                  <span>Loading...</span>
                ) : error ? (
                  <span className="text-red-500">{error}</span>
                ) : explanations.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {explanations.map((exp, i) => (
                      <li key={i}>{exp}</li>
                    ))}
                  </ul>
                ) : (
                  <span>Explanations will appear here</span>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
