'use client';

import {
  createContext,
  useContext,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import useTextImprovement from '@/hooks/useTextImprovement';

interface TextImprovementContextValue {
  input: string;
  improved: string;
  explanations: string[];
  isNotEnglish: boolean;
  loading: boolean;
  error: string | null;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleClear: () => void;
}

const TextImprovementContext =
  createContext<TextImprovementContextValue | null>(null);

export default function TextImprovementProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [input, setInput] = useState('');
  const { apiState, improveText, handleReset } = useTextImprovement();
  const { improved, explanations, isNotEnglish, loading, error } = apiState;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    improveText(event.target.value);
  };

  const handleClear = () => {
    setInput('');
    handleReset();
  };

  return (
    <TextImprovementContext.Provider
      value={{
        input,
        improved,
        explanations,
        isNotEnglish,
        loading,
        error,
        handleChange,
        handleClear,
      }}
    >
      {children}
    </TextImprovementContext.Provider>
  );
}

export function useTextImprovementContext() {
  const context = useContext(TextImprovementContext);

  if (!context) {
    throw new Error(
      'useTextImprovementContext must be used within TextImprovementProvider',
    );
  }

  return context;
}
