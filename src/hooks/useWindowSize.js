import { useState, useEffect } from 'react';
// import { isMobile as moduleIsMobile } from 'react-device-detect';

const MAX_MOBILE_SCREEN_WIDTH = 499;

// Hook
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setIsMobile(window.innerWidth <= MAX_MOBILE_SCREEN_WIDTH);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  return { windowSize, isMobile };
}
