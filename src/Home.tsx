import React, { useState } from 'react';
import TextCard from '@/components/TextCard';
import ResultsSection from '@/components/ResultsSection';
import InputSection from '@/components/InputSection';
import InputContainer from '@/components/InputContainer';
import HeroContainer from '@/components/HeroContainer';
import AICreditsBadge from '@/components/AICreditsBadge';
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      <InputSection>
        <HeroContainer />
        <InputContainer
          value={input}
          onChange={handleChange}
          onClear={handleClear}
        />
        <AICreditsBadge />
      </InputSection>
      <ResultsSection>
        <TextCard
          title="Improved Text"
          showCopyButton={true}
          copyText={improved}
        >
          {renderImprovedText()}
        </TextCard>
        <TextCard title="Explanations">{renderExplanations()}</TextCard>
      </ResultsSection>
    </div>
  );
}
