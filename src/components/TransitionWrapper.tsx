'use client';

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import AppTransition from './AppTransition';

export default function TransitionWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reducedMotion ? 0 : 2000;
    const timer = setTimeout(() => setShowTransition(false), delay);
    return () => clearTimeout(timer);
  }, []);

  if (showTransition) {
    return <AppTransition />;
  }

  return <>{children}</>;
}
