import { useRef, useState, useEffect } from 'react';

const useParallax = () => {
  const ref = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if element is in viewport
      const isInView = rect.top <= viewportHeight && rect.bottom >= 0;
      setIsVisible(isInView);

      // Calculate progress when element is in or near viewport
      if (isInView) {
        const startPoint = element.offsetTop;
        const endPoint = startPoint + (element.offsetHeight - viewportHeight);
        const currentScroll = window.scrollY;

        // Calculate progress from 0 to 1
        const progress = (currentScroll - startPoint) / (endPoint - startPoint);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, scrollProgress, isVisible };
};

export default useParallax;
