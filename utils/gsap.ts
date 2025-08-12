import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Export GSAP objects for use in components
export const getGSAP = () => {
  return { gsap, ScrollTrigger, SplitText };
};

// Export individual plugins for direct use
export { gsap, ScrollTrigger, SplitText };
