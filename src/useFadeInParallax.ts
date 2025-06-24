import { useRef, useState, useEffect } from 'react';

/**
 * Custom hook for fading in N elements one by one as the section scrolls into view.
 * Returns ref and an array of opacities (0..1) for each item.
 */
export function useFadeInParallax(numItems: number) {
  const ref = useRef<HTMLElement>(null);
  const [opacities, setOpacities] = useState(Array(numItems).fill(0));

  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return;
      const section = ref.current;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Section is in view if any part is visible
      if (rect.bottom < 0 || rect.top > viewportHeight) {
        setOpacities(Array(numItems).fill(0));
        return;
      }
      // Progress: 0 (top enters), 1 (bottom leaves)
      const totalScroll = rect.height - viewportHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
      const progress = totalScroll > 0 ? scrolled / totalScroll : 1;
      // Fade in each item one by one
      const perItem = 1 / numItems;
      const newOpacities = Array(numItems).fill(0).map((_, i) => {
        const itemStart = i * perItem;
        const itemEnd = (i + 1) * perItem;
        if (progress >= itemEnd) return 1;
        if (progress <= itemStart) return 0;
        // Fade in between start and end
        return (progress - itemStart) / perItem;
      });
      setOpacities(newOpacities);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [numItems]);

  return { ref, opacities };
}
