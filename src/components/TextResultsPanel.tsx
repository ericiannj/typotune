'use client';

import TextCard from '@/components/TextCard';
import { useTextImprovementContext } from '@/components/TextImprovementProvider';

export default function TextResultsPanel() {
  const { improved, explanations, isNotEnglish, loading, error } =
    useTextImprovementContext();

  const renderImprovedText = () => {
    if (loading) return <span className="text-gray-400">Loading...</span>;
    if (error) return <span className="text-red-500">{error}</span>;
    if (isNotEnglish)
      return (
        <span className="text-amber-600 text-sm">
          TypoTune only supports English text. Please submit your text in
          English.
        </span>
      );
    if (improved)
      return <p className="whitespace-pre-wrap text-sm">{improved}</p>;
    return (
      <span className="text-gray-400 text-sm">Improved text will appear here</span>
    );
  };

  const renderExplanations = () => {
    if (loading) return <span className="text-gray-400">Loading...</span>;
    if (error) return <span className="text-red-500">{error}</span>;
    if (isNotEnglish)
      return (
        <span className="text-amber-600 text-sm">
          TypoTune only supports English text. Please submit your text in
          English.
        </span>
      );
    if (explanations.length > 0)
      return (
        <ul className="space-y-1.5">
          {explanations.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-indigo-500 mt-0.5 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    if (improved)
      return (
        <span className="text-gray-400 text-sm italic">
          No improvements needed — the text looks great as is.
        </span>
      );
    return (
      <span className="text-gray-400 text-sm">Explanations will appear here</span>
    );
  };

  return (
    <>
      <TextCard title="Improved Text" showCopyButton={true} copyText={improved}>
        {renderImprovedText()}
      </TextCard>
      <TextCard title="Explanations">{renderExplanations()}</TextCard>
    </>
  );
}
