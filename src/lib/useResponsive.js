import { useState, useEffect } from 'react';

export function useResponsive() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [breakpoint, setBreakpoint] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        height: window.innerHeight,
      });

      // Set breakpoint based on width
      if (width < 475) {
        setBreakpoint('xs');
      } else if (width < 640) {
        setBreakpoint('sm');
      } else if (width < 768) {
        setBreakpoint('md');
      } else if (width < 1024) {
        setBreakpoint('lg');
      } else if (width < 1280) {
        setBreakpoint('xl');
      } else if (width < 1536) {
        setBreakpoint('2xl');
      } else {
        setBreakpoint('3xl');
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md' || breakpoint === 'lg';
  const isDesktop = breakpoint === 'xl' || breakpoint === '2xl' || breakpoint === '3xl';
  const isSmallScreen = breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md';
  const isLargeScreen = breakpoint === 'xl' || breakpoint === '2xl' || breakpoint === '3xl';

  return {
    screenSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isLargeScreen,
  };
} 