import { improveTextWithGemini } from '@/lib/gemini';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

const useTextImprovement = () => {
  const [apiState, setApiState] = useState({
    improved: '',
    explanations: [] as string[],
    loading: false,
    error: null as string | null,
  });

  const improveText = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setApiState({
          improved: '',
          explanations: [],
          loading: false,
          error: null,
        });
        return;
      }

      setApiState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await improveTextWithGemini(value);
        setApiState({
          improved: result.improved,
          explanations: result.explanations,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        setApiState({
          improved: '',
          explanations: [],
          loading: false,
          error: err.message || 'An error occurred',
        });
      }
    }, 500),
    [],
  );

  return { apiState, improveText };
};

export default useTextImprovement;
