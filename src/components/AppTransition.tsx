'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AppTransition() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'TypoTune';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="z-10 flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#0a0a0a] to-[#0f172a]">
      <div className="mb-8">
        <Image src="/typing.png" alt="TypoTune" width={112} height={112} priority />
      </div>
      <div className="flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-100 tracking-tight"
        >
          {displayText}
        </motion.span>
        {showCursor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-1 h-16 md:h-20 bg-gradient-to-b from-blue-400 to-indigo-400 ml-1 rounded-full"
          />
        )}
      </div>
    </div>
  );
}
