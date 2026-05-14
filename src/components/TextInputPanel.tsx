'use client';

import InputContainer from '@/components/InputContainer';
import { useTextImprovementContext } from '@/components/TextImprovementProvider';

export default function TextInputPanel() {
  const { input, handleChange, handleClear } = useTextImprovementContext();

  return (
    <InputContainer
      value={input}
      onChange={handleChange}
      onClear={handleClear}
    />
  );
}
