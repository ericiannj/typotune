'use client';

import TransitionWrapper from '@/components/TransitionWrapper';
import Home from '@/Home';

export default function Page() {
  return (
    <TransitionWrapper>
      <Home />
    </TransitionWrapper>
  );
}
