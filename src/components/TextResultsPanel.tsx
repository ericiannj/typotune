'use client';

import DOMPurify from 'dompurify';
import TextCard from '@/components/TextCard';
import { useTextImprovementContext } from '@/components/TextImprovementProvider';
import { formatExplanations, formatTechnicalTerms } from '@/lib/formatHtml';

export default function TextResultsPanel() {
  const { improved, explanations, loading, error } =
    useTextImprovementContext();

  const renderImprovedText = () => {
    if (loading) return <span>Loading...</span>;
    if (error) return <span className="text-red-500">{error}</span>;
    if (improved) {
      const formattedText = formatTechnicalTerms(improved);
      const sanitizedHtml = DOMPurify.sanitize(formattedText);

      return (
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
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
      const sanitizedHtml = DOMPurify.sanitize(formattedExplanation);

      return (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      );
    }

    return <span>Explanations will appear here</span>;
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
