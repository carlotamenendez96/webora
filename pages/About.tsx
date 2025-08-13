
import React, { useEffect, useRef } from 'react';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useTranslations } from '../hooks/useTranslations';
import SectionTitle from '../components/SectionTitle';
import { Translation } from '../types';

import { gsap, ScrollTrigger } from '../utils/gsap';

const About: React.FC = () => {
  const { t } = useTranslations();
  const pageRef = useRef(null);
  const timelineRef = useRef(null);

  const timelineData = [
    { yearKey: 'about_milestone1_year', titleKey: 'about_milestone1_title', descKey: 'about_milestone1_desc' },
    { yearKey: 'about_milestone2_year', titleKey: 'about_milestone2_title', descKey: 'about_milestone2_desc' },
    { yearKey: 'about_milestone3_year', titleKey: 'about_milestone3_title', descKey: 'about_milestone3_desc' },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });

      if (timelineRef.current) {
        const items = gsap.utils.toArray('.timeline-item');
        const line = (timelineRef.current as HTMLElement).querySelector('.timeline-line-progress');
        
        gsap.to(line, {
          scaleY: 1,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        });

        items.forEach(item => {
          gsap.from(item as HTMLElement, {
            opacity: 0,
            x: -50,
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Set document head metadata
  useDocumentHead({
    title: `${t.nav_about} | Webora`,
    description: t.about_page_subtitle,
  });

  return (
    <>
      <div ref={pageRef} className="py-20 pt-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.about_page_title} subtitle={t.about_page_subtitle} />
          
   

          {/* Sección de texto motivacional */}
          <div className="mt-24 bg-gradient-to-br from-blue-50 to-magenta-50 rounded-2xl p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-poppins font-bold text-blue-deep mb-8">{t.about_motivational_title}</h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>{t.about_motivational_paragraph1}</p>
                <p>{t.about_motivational_paragraph2}</p>
                <p>{t.about_motivational_paragraph3}</p>
                <p>{t.about_motivational_paragraph4}</p>
                
                <div className="my-8">
                  <h3 className="text-2xl font-poppins font-bold text-magenta mb-4">{t.about_motivational_question}</h3>
                  <p>{t.about_motivational_paragraph5}</p>
                </div>
                
                <div className="mt-10">
                  <p className="text-xl font-poppins font-semibold text-blue-deep">{t.about_motivational_cta}</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-24">
            <SectionTitle title={t.about_timeline_title} subtitle={t.about_timeline_subtitle} />
            <div ref={timelineRef} className="relative max-w-2xl mx-auto mt-12">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-gray-200 timeline-line"></div>
              <div className="absolute left-1/2 -translate-x-2 top-0 h-full w-1 bg-blue-deep origin-top scale-y-0 timeline-line-progress"></div>
              {timelineData.map((item, index) => (
                <div key={index} className="timeline-item relative pl-16 mb-16 ml-[calc(50%+2rem)]">
                  <div className="absolute -left-16 top-0 ml-[calc(50%-1.6rem)] flex items-center justify-center w-12 h-12 bg-blue-deep text-white font-bold rounded-full shadow-md">
                    {t[item.yearKey as keyof Translation]}
                  </div>
                   <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h4 className="font-poppins font-bold text-xl text-magenta">{t[item.titleKey as keyof Translation]}</h4>
                    <p className="mt-2 text-gray-600">{t[item.descKey as keyof Translation]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default About;
