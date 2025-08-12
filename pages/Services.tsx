
import React, { useState, useEffect, useRef } from 'react';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useTranslations } from '../hooks/useTranslations';
import SectionTitle from '../components/SectionTitle';
import { MOCK_SERVICES } from '../constants';
import { Translation } from '../types';
import { ChevronDown } from 'lucide-react';

import { gsap } from '../utils/gsap';

interface AccordionItemProps {
  service: typeof MOCK_SERVICES[0];
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ service, index }) => {
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  // Animación de entrada con delay basado en el índice
  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(itemRef.current, 
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          delay: index * 0.1,
          ease: 'back.out(1.7)'
        }
      );
    }
  }, [index]);

  // Animación del acordeón
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          maxHeight: contentRef.current.scrollHeight,
          duration: 0.5,
          ease: 'power2.out'
        });
      } else {
        gsap.to(contentRef.current, {
          maxHeight: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    }
  }, [isOpen]);

  return (
    <div 
      ref={itemRef}
      className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-8 bg-white hover:bg-gradient-to-r hover:from-blue-deep/5 hover:to-magenta/5 transition-all duration-300 group"
      >
        <div className="flex items-center text-left">
          {/* Icono más grande con mejor hover state */}
          <div className="p-4 bg-gradient-to-br from-blue-deep to-magenta text-white rounded-2xl mr-6 
                        transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                        shadow-lg group-hover:shadow-xl">
            <service.icon size={32} className="group-hover:animate-pulse" />
          </div>
          <div>
            <h3 className="text-2xl font-poppins font-bold text-blue-deep group-hover:text-magenta transition-colors duration-300">
              {t[service.titleKey as keyof Translation]}
            </h3>
            <p className="mt-2 text-gray-600 hidden sm:block group-hover:text-gray-800 transition-colors duration-300">
              {t[service.descriptionKey as keyof Translation]}
            </p>
          </div>
        </div>
        
        {/* Icono de flecha con animación mejorada */}
        <div className="relative">
          <ChevronDown
            size={28}
            className={`text-blue-deep transform transition-all duration-500 ease-out ${
              isOpen ? 'rotate-180 text-magenta scale-110' : 'group-hover:scale-110 group-hover:text-magenta'
            }`}
          />
          
          {/* Indicador de estado */}
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-300 ${
            isOpen ? 'bg-magenta scale-100' : 'bg-blue-deep/30 scale-0'
          }`}></div>
        </div>
      </button>
      
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ maxHeight: '0px' }}
      >
        <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-deep/5">
          <p className="mt-1 text-gray-600 sm:hidden mb-6 text-lg">{t[service.descriptionKey as keyof Translation]}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group">
              <h4 className="font-bold font-poppins text-xl text-blue-deep mb-4 flex items-center">
                <span className="w-2 h-2 bg-magenta rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                {t.service_process_title}
              </h4>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                {t[service.details.processKey as keyof Translation]}
              </p>
            </div>
            
            <div className="group">
              <h4 className="font-bold font-poppins text-xl text-blue-deep mb-4 flex items-center">
                <span className="w-2 h-2 bg-cyan rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                {t.service_deliverables_title}
              </h4>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                {t[service.details.deliverablesKey as keyof Translation]}
              </p>
            </div>
          </div>
          
          {/* Botón de acción adicional */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center bg-gradient-to-r from-blue-deep to-magenta text-white font-semibold py-3 px-6 rounded-full
                             transform hover:scale-105 hover:shadow-lg transition-all duration-300 group">
              <span>Conocer más</span>
              <ChevronDown size={20} className="ml-2 transform group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Services: React.FC = () => {
  const { t } = useTranslations();
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
  }, []);

  // Set document head metadata
  useDocumentHead({
    title: `${t.nav_services} | Webora`,
    description: t.services_page_subtitle,
  });

  return (
    <>
      {/* Hero Section para la página de servicios */}
      <section className="relative py-32 bg-gradient-to-br from-blue-deep via-indigo-800 to-magenta overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-6" style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.8)'
          }}>
            {t.services_page_title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed" style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.6)'
          }}>
            {t.services_page_subtitle}
          </p>
          
          {/* Indicadores visuales */}
          <div className="flex justify-center space-x-4 mt-8">
            <div className="w-3 h-3 bg-magenta rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-cyan rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </section>

      <div ref={pageRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {MOCK_SERVICES.map((service, index) => (
              <AccordionItem key={index} service={service} index={index} />
            ))}
          </div>
          
          {/* CTA adicional al final */}
          <div className="mt-16 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-poppins font-bold text-blue-deep mb-4">
                ¿Necesitas algo más específico?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Cada proyecto es único. Si tienes necesidades especiales o quieres personalizar alguno de nuestros servicios, 
                estamos aquí para ayudarte a crear la solución perfecta.
              </p>
              <button className="inline-flex items-center bg-gradient-to-r from-magenta to-blue-deep text-white font-bold py-4 px-8 rounded-full
                               transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
                <span>Hablemos de tu proyecto</span>
                <ChevronDown size={24} className="ml-2 transform group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
