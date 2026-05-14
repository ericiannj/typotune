import AICreditsBadge from '@/components/AICreditsBadge';
import HeroContainer from '@/components/HeroContainer';
import InputSection from '@/components/InputSection';
import ResultsSection from '@/components/ResultsSection';
import TextImprovementProvider from '@/components/TextImprovementProvider';
import TextInputPanel from '@/components/TextInputPanel';
import TextResultsPanel from '@/components/TextResultsPanel';
import TransitionWrapper from '@/components/TransitionWrapper';

export default function Page() {
  return (
    <TransitionWrapper>
      <TextImprovementProvider>
        <main className="flex min-h-screen flex-col lg:flex-row">
          <InputSection>
            <HeroContainer />
            <TextInputPanel />
            <AICreditsBadge />
          </InputSection>
          <ResultsSection>
            <TextResultsPanel />
          </ResultsSection>
        </main>
      </TextImprovementProvider>
    </TransitionWrapper>
  );
}
