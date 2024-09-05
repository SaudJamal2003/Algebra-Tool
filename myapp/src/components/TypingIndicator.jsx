import React, { useState, useEffect } from 'react';

const TypingIndicator = () => {
  const [dots, setDots] = useState(".");
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    if (dotCount < 5) {
      const interval = setInterval(() => {
        setDots(prevDots => prevDots.length < 4 ? prevDots + "." : ".");
        setDotCount(prevCount => prevCount + 1);
      }, 300);  // Change the dot interval time here
      return () => clearInterval(interval);  // Clean up interval on component unmount
    }
  }, [dotCount]);

  return <>{dots}</>;
};

export default TypingIndicator;
