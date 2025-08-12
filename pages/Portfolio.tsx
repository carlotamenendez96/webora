
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useTranslations } from '../hooks/useTranslations';
import SectionTitle from '../components/SectionTitle';
import { MOCK_PROJECTS } from '../constants';
import { Translation } from '../types';
import { ArrowRight } from 'lucide-react';

import { gsap } from '../utils/gsap';

const Portfolio: React.FC = () => {
  const { t } = useTranslations();
  const [filter, setFilter] = useState('all');
  const pageRef = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filters = [
    { key: 'all', labelKey: 'portfolio_filter_all' },
    { key: 'portfolio_filter_web', labelKey: 'portfolio_filter_web' },
    // { key: 'portfolio_filter_ecommerce', labelKey: 'portfolio_filter_ecommerce' }, // Oculto temporalmente
    { key: 'portfolio_filter_ai', labelKey: 'portfolio_filter_ai' },
  ];

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return MOCK_PROJECTS;
    return MOCK_PROJECTS.filter(p => p.categoryKey === filter);
  }, [filter]);
  
  useEffect(() => {
     gsap.fromTo(pageRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [filteredProjects]);

  // Set document head metadata
  useDocumentHead({
    title: `${t.nav_portfolio} | Webora`,
    description: t.portfolio_page_subtitle,
  });

  return (
    <>
      <div ref={pageRef} className="py-20 pt-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.portfolio_page_title} subtitle={t.portfolio_page_subtitle} />
          
          <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-6 py-2 font-poppins font-semibold rounded-full transition-all duration-300
                  ${filter === f.key 
                    ? 'bg-blue-deep text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {t[f.labelKey as keyof Translation]}
              </button>
            ))}
          </div>
          
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <a 
                key={project.id} 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-lg shadow-lg cursor-pointer"
              >
                <img loading="lazy" src={project.image} alt={t[project.titleKey as keyof Translation]} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <span className="text-sm font-semibold text-cyan uppercase tracking-wider">{t[project.categoryKey as keyof Translation]}</span>
                    <h3 className="text-2xl font-poppins font-bold text-white mt-1">{t[project.titleKey as keyof Translation]}</h3>
                    <p className="mt-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">{t[project.descriptionKey as keyof Translation]}</p>
                     <div className="mt-4 text-white font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                      <span>{t.view_case_study}</span>
                      <ArrowRight size={20} className="ml-2" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
