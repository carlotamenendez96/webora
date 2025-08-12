
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsap';

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ endValue, duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(element);
            }
        },
        { threshold: 0.1 }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && ref.current) {
        const counter = { value: 0 };
        gsap.to(counter, {
            value: endValue,
            duration: duration,
            ease: 'power2.out',
            onUpdate: () => {
              if(ref.current) {
                ref.current.textContent = Math.round(counter.value).toString();
              }
            }
        });
    }
  }, [isInView, endValue, duration]);
  

  return <span ref={ref}>0</span>;
};

export default AnimatedCounter;
