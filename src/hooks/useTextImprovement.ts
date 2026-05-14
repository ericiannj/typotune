import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';

type TextImprovementResponse =
  | {
      improved: string;
      explanations: string[];
      isNotEnglish: boolean;
    }
  | {
      error: string;
    };

async function requestTextImprovement(
  input: string,
): Promise<Extract<TextImprovementResponse, { improved: string }>> {
  const response = await fetch('/api/text-improvements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });

  let data: TextImprovementResponse;

  try {
    data = (await response.json()) as TextImprovementResponse;
  } catch {
    throw new Error('Failed to improve text.');
  }

  if (!response.ok) {
    throw new Error(
      'error' in data ? data.error : 'Failed to improve text.',
    );
  }

  if (!('improved' in data)) {
    throw new Error('Failed to improve text.');
  }

  return data;
}

const useTextImprovement = () => {
  const [apiState, setApiState] = useState({
    improved: '',
    explanations: [] as string[],
    isNotEnglish: false,
    loading: false,
    error: null as string | null,
  });

  const handleReset = () => {
    setApiState({
      improved: '',
      explanations: [],
      isNotEnglish: false,
      loading: false,
      error: null,
    });
  };

  const improveText = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value.trim()) {
          setApiState({
            improved: '',
            explanations: [],
            isNotEnglish: false,
            loading: false,
            error: null,
          });
          return;
        }

        setApiState((prev) => ({ ...prev, loading: true, error: null }));

        try {
          const result = await requestTextImprovement(value);
          setApiState({
            improved: result.improved,
            explanations: result.explanations,
            isNotEnglish: result.isNotEnglish,
            loading: false,
            error: null,
          });
        } catch (err: unknown) {
          setApiState({
            improved: '',
            explanations: [],
            isNotEnglish: false,
            loading: false,
            error: err instanceof Error ? err.message : 'An error occurred',
          });
        }
      }, 1000),
    [],
  );

  return { apiState, improveText, handleReset };
};

export default useTextImprovement;
