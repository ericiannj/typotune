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
    if (improved) {
      const formattedText = formatTechnicalTerms(improved);
      return (
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    }
    return <span>Improved text will appear here</span>;
  };

  const renderExplanations = () => {
    if (loading) return <span>Loading...</span>;
    if (error) return <span className="text-red-500">{error}</span>;
    if (explanations.length > 0) {
      const formattedExplanation = formatExplanations(explanations[0]);
      return (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: formattedExplanation }}
        />
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

const formatTechnicalTerms = (text: string) => {
  return text.replace(/`([^`]+)`/g, (match, term) => {
    return `<span class="inline-block px-1.5 py-0.5 mx-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-sm font-mono font-medium">${term}</span>`;
  });
};

const formatExplanations = (text: string) => {
  // Remove angle brackets and asterisks
  let cleaned = text
    .replace(/^<|>$/g, '')
    .replace(/^\*\s*/, '')
    .trim();

  // Convert markdown-style headings to HTML
  cleaned = cleaned.replace(
    /^### (.*$)/gim,
    '<h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">$1</h3>',
  );
  cleaned = cleaned.replace(
    /^## (.*$)/gim,
    '<h2 class="text-xl font-semibold text-gray-800 mt-4 mb-2">$1</h2>',
  );
  cleaned = cleaned.replace(
    /^# (.*$)/gim,
    '<h1 class="text-2xl font-bold text-gray-800 mt-4 mb-3">$1</h1>',
  );

  // Convert line breaks to paragraphs
  cleaned = cleaned.replace(/\n\n/g, '</p><p class="mb-3 text-gray-700">');
  cleaned = cleaned.replace(/\n/g, '<br>');

  // Wrap in paragraph tags
  cleaned = `<p class="mb-3 text-gray-700">${cleaned}</p>`;

  // Format technical terms
  return formatTechnicalTerms(cleaned);
};
