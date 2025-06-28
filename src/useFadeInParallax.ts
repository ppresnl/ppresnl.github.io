import { useRef, useState, useEffect } from 'react';

/**
 * Custom hook for fading in N elements one by one as the section scrolls into view.
 * Returns ref and an array of opacities (0..1) for each item.
 * The last item has a plateau/pause before it starts to fade out.
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
      
      // Modified calculation to account for a plateau for the last item
      // Reserve 40% of the scroll progress for the plateau (doubled from 20%)
      const plateauPortion = 0.4;
      const effectiveItemCount = numItems;
      const adjustedPerItem = (1 - plateauPortion) / effectiveItemCount;
      
      // Calculate new opacities
      const newOpacities = Array(numItems).fill(0).map((_, i) => {
        const isLastItem = i === numItems - 1;
        
        // For the last item (index numItems-1), we want to add a plateau
        if (isLastItem) {
          const lastItemStart = (i * adjustedPerItem);
          const plateauStart = lastItemStart + adjustedPerItem;
          const fadeOutStart = plateauStart + plateauPortion;
          
          // Still fading in
          if (progress <= plateauStart && progress > lastItemStart) {
            return (progress - lastItemStart) / adjustedPerItem;
          }
          // In the plateau phase (fully visible)
          else if (progress > plateauStart && progress < fadeOutStart) {
            return 1;
          }
          // After plateau (fully visible)
          else if (progress >= fadeOutStart) {
            return 1;
          }
          return 0;
        }
        
        // For all other items, distribute evenly
        const itemStart = i * adjustedPerItem;
        const itemEnd = (i + 1) * adjustedPerItem;
        
        if (progress >= itemEnd) return 1;
        if (progress <= itemStart) return 0;
        
        // Fade in between start and end
        return (progress - itemStart) / adjustedPerItem;
      });
      
      setOpacities(newOpacities);
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [numItems]);

  return { ref, opacities };
}
