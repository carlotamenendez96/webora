
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useTranslations } from '../hooks/useTranslations';
import SectionTitle from '../components/SectionTitle';
import AnimatedCounter from '../components/AnimatedCounter';
import { MOCK_SERVICES, MOCK_PROJECTS, MOCK_TESTIMONIALS } from '../constants';
import { Translation } from '../types';
import { ArrowRight, Star } from 'lucide-react';
import TagsPhysics from '../components/TagsPhysics';

import { gsap, ScrollTrigger, SplitText } from '../utils/gsap';

const Home: React.FC = () => {
  const { t } = useTranslations();
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    
    const ctx = gsap.context(() => {
      // Hero Animation
      if (heroRef.current) {
        const heroTitle = heroRef.current.querySelector('h1');
        const heroSubtitle = heroRef.current.querySelector('p');
        const heroButton = heroRef.current.querySelector('a');

        if(heroTitle) {
            const split = new SplitText(heroTitle, { type: 'words, chars' });
            const chars = split.chars;

            gsap.from(chars, {
                duration: 0.8,
                opacity: 0,
                y: 50,
                ease: 'back.out(1.7)',
                stagger: 0.05,
            });
        }
        
        gsap.from(heroSubtitle, {
            duration: 1,
            opacity: 0,
            y: 20,
            ease: 'power2.out',
            delay: 0.8
        });
        
        gsap.from(heroButton, {
            duration: 1,
            opacity: 0,
            scale: 0.8,
            ease: 'elastic.out(1, 0.5)',
            delay: 1.2
        });

        gsap.to(heroRef.current, {
            backgroundPosition: '100% 50%',
            ease: 'linear',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });
      }
      
      // Section animations
      sectionsRef.current.forEach((section) => {
        if (section) {
          gsap.from(section.children, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      // Historia personal section animation
      const storySection = document.querySelector('.story-image, .story-content');
      if (storySection) {
        const storyImage = document.querySelector('.story-image');
        const storyContent = document.querySelector('.story-content');
        
        if (storyImage) {
          gsap.from(storyImage, {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: storyImage,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (storyContent) {
          gsap.from(storyContent, {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: 'power2.out',
            delay: 0.3,
            scrollTrigger: {
              trigger: storyContent,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);
  
  // Set document head metadata
  useDocumentHead({
    title: `Webora | ${t.home_hero_title}`,
    description: t.home_hero_subtitle,
    keywords: "agencia digital, desarrollo web, diseño web, marketing digital, SEO, branding, páginas web, tiendas online, España",
    ogTitle: `Webora | ${t.home_hero_title}`,
    ogDescription: t.home_hero_subtitle,
    ogImage: "/og-image.jpg",
    ogUrl: "https://webora.com",
    canonical: "https://webora.com",
    twitterCard: "summary_large_image",
    twitterTitle: `Webora | ${t.home_hero_title}`,
    twitterDescription: t.home_hero_subtitle,
    twitterImage: "/og-image.jpg",
    author: "Webora Digital Agency",
    robots: "index, follow",
    lang: "es"
  });

  return (
    <div style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-blue-deep via-indigo-800 to-magenta overflow-hidden"
        style={{ backgroundSize: '200% 200%', backgroundPosition: '0% 50%' }}
      >
        {/* Overlay más oscuro para mejor contraste */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Patrón de puntos sutil para añadir textura */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Partículas flotantes animadas */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Puntos principales con animaciones escalonadas */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-magenta rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-32 w-2 h-2 bg-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-cyan rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
          
          {/* Nuevos puntos con diferentes colores y animaciones */}
          <div className="absolute top-32 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-float" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-purple-400 rounded-full animate-float" style={{animationDelay: '0.3s'}}></div>
          
          {/* Puntos más pequeños con animación de pulso */}
          <div className="absolute top-16 left-1/2 w-1 h-1 bg-cyan/70 rounded-full animate-pulse-slow" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-1/2 right-16 w-1 h-1 bg-magenta/70 rounded-full animate-pulse-slow" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute bottom-16 left-1/2 w-1 h-1 bg-white/70 rounded-full animate-pulse-slow" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute bottom-1/2 left-16 w-1 h-1 bg-pink-400/70 rounded-full animate-pulse-slow" style={{animationDelay: '0.4s'}}></div>
          
          {/* Puntos con animación de brillo */}
          <div className="absolute top-24 right-1/3 w-1.5 h-1.5 bg-cyan/80 rounded-full animate-glow" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute bottom-24 right-1/2 w-1.5 h-1.5 bg-magenta/80 rounded-full animate-glow" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white/80 rounded-full animate-glow" style={{animationDelay: '1.9s'}}></div>
          
          {/* Puntos con animación de escala */}
          <div className="absolute top-28 left-1/3 w-2 h-2 bg-blue-400/60 rounded-full animate-ping-slow" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute bottom-28 right-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-ping-slow" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-300/60 rounded-full animate-ping-slow" style={{animationDelay: '0.2s'}}></div>
          
          {/* Puntos con animación de rotación */}
          <div className="absolute top-36 left-1/2 w-1 h-1 bg-cyan/50 rounded-full animate-spin" style={{animationDuration: '8s', animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-36 right-1/2 w-1 h-1 bg-magenta/50 rounded-full animate-spin" style={{animationDuration: '10s', animationDelay: '1.2s'}}></div>
          
          {/* Puntos con nuevas animaciones personalizadas */}
          <div className="absolute top-28 left-1/6 w-1.5 h-1.5 bg-indigo-400/70 rounded-full animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-1/4 right-1/6 w-1 h-1 bg-teal-400/80 rounded-full animate-bounce-gentle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute bottom-28 left-1/6 w-2 h-2 bg-orange-400/60 rounded-full animate-fade-in-out" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute bottom-1/4 right-1/6 w-1.5 h-1.5 bg-emerald-400/70 rounded-full animate-scale-breathe" style={{animationDelay: '1.7s'}}></div>
          
          {/* Puntos adicionales con animaciones mixtas */}
          <div className="absolute top-44 left-2/3 w-1 h-1 bg-violet-400/80 rounded-full animate-float" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-2/3 right-2/3 w-1.5 h-1.5 bg-rose-400/70 rounded-full animate-pulse-slow" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute bottom-44 left-2/3 w-1 h-1 bg-sky-400/80 rounded-full animate-glow" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute bottom-2/3 right-2/3 w-1.5 h-1.5 bg-amber-400/70 rounded-full animate-twinkle" style={{animationDelay: '0.7s'}}></div>
          
          {/* Puntos con posiciones más aleatorias */}
          <div className="absolute top-52 left-1/5 w-1 h-1 bg-lime-400/60 rounded-full animate-bounce-gentle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-3/4 right-1/5 w-1.5 h-1.5 bg-fuchsia-400/70 rounded-full animate-fade-in-out" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute bottom-52 left-1/5 w-1 h-1 bg-cyan-400/80 rounded-full animate-scale-breathe" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute bottom-3/4 right-1/5 w-1.5 h-1.5 bg-blue-400/70 rounded-full animate-float" style={{animationDelay: '2.3s'}}></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-poppins font-extrabold tracking-tight" style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)'
          }}>{t.home_hero_title}</h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-white/95 font-light" style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.6)'
          }}>{t.home_hero_subtitle}</p>
          
          {/* CTA principal */}
          <div className="mt-10">
            <button 
              onClick={() => window.location.href = '/#/contacto'}
              className="inline-block bg-gradient-to-r from-magenta to-pink-600 text-white font-bold py-4 px-10 rounded-full text-lg font-poppins
                         transform hover:scale-105 hover:shadow-2xl hover:shadow-magenta/50 transition-all duration-300
                         relative overflow-hidden group"
            >
              <span className="relative z-10">{t.cta_button}</span>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
          
          {/* Indicador de scroll mejorado */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-deep/5">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.home_services_title} subtitle={t.home_services_subtitle} />
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '100%',
            overflow: 'hidden'
          }}>
            {MOCK_SERVICES.map((service, index) => (
              <div key={service.id} className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 border border-gray-100 group min-h-[300px]">
                <div className="inline-block p-5 bg-gradient-to-br from-blue-deep to-magenta text-white rounded-2xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <service.icon size={36} className="group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-blue-deep mb-4 group-hover:text-magenta transition-colors duration-300">
                  {t[service.titleKey as keyof Translation]}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {t[service.descriptionKey as keyof Translation]}
                </p>
                
                {/* Indicador de hover */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-16 h-1 bg-gradient-to-r from-magenta to-cyan mx-auto rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Tags Physics Section */}
      <section className=" bg-gradient-to-br from-white-50 to-blue-deep/5">
        <TagsPhysics />
      </section>


      {/* Featured Portfolio Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.home_portfolio_title} subtitle={t.home_portfolio_subtitle} />
          <div ref={el => { sectionsRef.current[2] = el; }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {MOCK_PROJECTS.slice(0, 3).map(project => (
              <div key={project.id} className="group relative rounded-lg overflow-hidden shadow-xl">
                <img loading="lazy" src={project.image} alt={t[project.titleKey as keyof Translation]} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6
                                transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                  <h3 className="text-2xl font-poppins font-bold text-white">{t[project.titleKey as keyof Translation]}</h3>
                  <p className="text-cyan">{t[project.categoryKey as keyof Translation]}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/portafolio"
              className="inline-flex items-center bg-blue-deep text-white font-bold py-3 px-8 rounded-full text-md font-poppins
                        transform hover:scale-105 hover:bg-blue-600 transition-all duration-300"
            >
              {t.portfolio_page_title} <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section - ¿Cómo lo hacemos? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6">
              {t.home_process_title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.home_process_subtitle}
            </p>
          </div>
          
          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Partículas flotantes para Step 1 */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Partícula con movimiento de rebote */}
                <div className="absolute top-4 left-4 w-1 h-1 bg-cyan/60 rounded-full animate-bounce-gentle" style={{animationDelay: '0s'}}></div>
                
                {/* Partícula con trayectoria en forma de 8 */}
                <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-magenta/50 rounded-full animate-float" style={{
                  animationDelay: '0.5s',
                  animation: 'float 4s ease-in-out infinite, spin 8s linear infinite'
                }}></div>
                
                {/* Partícula con movimiento espiral */}
                <div className="absolute bottom-8 left-6 w-1 h-1 bg-blue-deep/40 rounded-full" style={{
                  animation: 'spiral 6s ease-in-out infinite',
                  animationDelay: '1s'
                }}></div>
                
                {/* Partícula con rebote y escalado */}
                <div className="absolute bottom-6 right-4 w-1.5 h-1.5 bg-cyan/30 rounded-full animate-bounce-gentle" style={{
                  animationDelay: '1.5s',
                  animation: 'bounce-gentle 3s ease-in-out infinite, scale-breathe 4s ease-in-out infinite'
                }}></div>
              </div>
              
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-deep to-magenta rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md relative">
                  <span className="text-white text-xl font-bold font-poppins">1</span>
                  
                  {/* Partículas alrededor del círculo */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan/80 rounded-full animate-ping-slow" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-magenta/80 rounded-full animate-ping-slow" style={{animationDelay: '0.8s'}}></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-deep/60 rounded-full animate-ping-slow" style={{animationDelay: '1.4s'}}></div>
                  <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-cyan/60 rounded-full animate-ping-slow" style={{animationDelay: '2s'}}></div>
                </div>
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-magenta transition-colors duration-300">
                {t.home_process_step1_title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.home_process_step1_desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Partículas flotantes para Step 2 */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Partícula con movimiento de rebote y rotación */}
                <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-magenta/50 rounded-full animate-bounce-gentle" style={{
                  animationDelay: '0.3s',
                  animation: 'bounce-gentle 2.5s ease-in-out infinite, spin 6s linear infinite'
                }}></div>
                
                {/* Partícula con trayectoria en forma de infinito */}
                <div className="absolute top-6 right-6 w-1 h-1 bg-cyan/60 rounded-full" style={{
                  animationDelay: '0.8s',
                  animation: 'infinity 5s ease-in-out infinite'
                }}></div>
                
                {/* Partícula con movimiento de onda */}
                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-magenta/40 rounded-full" style={{
                  animationDelay: '1.3s',
                  animation: 'wave 4s ease-in-out infinite'
                }}></div>
                
                {/* Partícula con rebote y escalado */}
                <div className="absolute bottom-6 right-4 w-1 h-1 bg-cyan/30 rounded-full animate-bounce-gentle" style={{
                  animationDelay: '1.8s',
                  animation: 'bounce-gentle 3.5s ease-in-out infinite, scale-breathe 5s ease-in-out infinite'
                }}></div>
              </div>
              
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-magenta to-cyan rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md relative">
                  <span className="text-white text-xl font-bold font-poppins">2</span>
                  
                  {/* Partículas alrededor del círculo */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-magenta/80 rounded-full animate-ping-slow" style={{animationDelay: '0.4s'}}></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan/80 rounded-full animate-ping-slow" style={{animationDelay: '1s'}}></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-magenta/60 rounded-full animate-ping-slow" style={{animationDelay: '1.6s'}}></div>
                  <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-cyan/60 rounded-full animate-ping-slow" style={{animationDelay: '2.2s'}}></div>
                </div>
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-cyan transition-colors duration-300">
                {t.home_process_step2_title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.home_process_step2_desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Partículas flotantes para Step 3 */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Partícula con movimiento de rebote y escalado */}
                <div className="absolute top-4 left-4 w-1 h-1 bg-cyan/60 rounded-full animate-bounce-gentle" style={{
                  animationDelay: '0.6s',
                  animation: 'bounce-gentle 2.8s ease-in-out infinite, scale-breathe 3.5s ease-in-out infinite'
                }}></div>
                
                {/* Partícula con trayectoria en forma de diamante */}
                <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-blue-deep/50 rounded-full" style={{
                  animationDelay: '1.1s',
                  animation: 'diamond 6s ease-in-out infinite'
                }}></div>
                
                {/* Partícula con movimiento de zigzag */}
                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-cyan/40 rounded-full" style={{
                  animationDelay: '1.6s',
                  animation: 'zigzag 4.5s ease-in-out infinite'
                }}></div>
                
                {/* Partícula con rebote y rotación */}
                <div className="absolute bottom-6 right-4 w-1 h-1 bg-blue-deep/30 rounded-full animate-bounce-gentle" style={{
                  animationDelay: '2.1s',
                  animation: 'bounce-gentle 3.2s ease-in-out infinite, spin 7s linear infinite'
                }}></div>
              </div>
              
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan to-blue-deep rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md relative">
                  <span className="text-white text-xl font-bold font-poppins">3</span>
                  
                  {/* Partículas alrededor del círculo */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan/80 rounded-full animate-ping-slow" style={{animationDelay: '0.6s'}}></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-deep/80 rounded-full animate-ping-slow" style={{animationDelay: '1.2s'}}></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan/60 rounded-full animate-ping-slow" style={{animationDelay: '1.8s'}}></div>
                  <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-blue-deep/60 rounded-full animate-ping-slow" style={{animationDelay: '2.4s'}}></div>
                </div>
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-blue-deep transition-colors duration-300">
                {t.home_process_step3_title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.home_process_step3_desc}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Partículas flotantes para Step 4 */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Partícula con movimiento de rebote y rotación */}
                <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-blue-deep/50 rounded-full animate-bounce-gentle" style={{
                  animationDelay: '0.9s',
                  animation: 'bounce-gentle 2.3s ease-in-out infinite, spin 5.5s linear infinite'
                }}></div>
                
                {/* Partícula con trayectoria en forma de estrella */}
                <div className="absolute top-6 right-6 w-1 h-1 bg-magenta/60 rounded-full" style={{
                  animationDelay: '1.4s',
                  animation: 'star 7s ease-in-out infinite'
                }}></div>
                
                {/* Partícula con movimiento de hélice */}
                <div className="absolute bottom-8 left-6 w-1 h-1 bg-blue-deep/40 rounded-full" style={{
                  animationDelay: '1.9s',
                  animation: 'helix 5.5s ease-in-out infinite'
                }}></div>
                
                {/* Partícula con rebote y escalado */}
                <div className="absolute bottom-6 right-4 w-1.5 h-1.5 bg-magenta/30 rounded-full animate-bounce-gentle" style={{
                  animationDelay: '2.4s',
                  animation: 'bounce-gentle 3.8s ease-in-out infinite, scale-breathe 4.2s ease-in-out infinite'
                }}></div>
              </div>
              
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-deep to-magenta rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md relative">
                  <span className="text-white text-xl font-bold font-poppins">4</span>
                  
                  {/* Partículas alrededor del círculo */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-deep/80 rounded-full animate-ping-slow" style={{animationDelay: '0.8s'}}></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-magenta/80 rounded-full animate-ping-slow" style={{animationDelay: '1.4s'}}></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-deep/60 rounded-full animate-ping-slow" style={{animationDelay: '2s'}}></div>
                  <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-magenta/60 rounded-full animate-ping-slow" style={{animationDelay: '2.6s'}}></div>
                </div>
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-magenta transition-colors duration-300">
                {t.home_process_step4_title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.home_process_step4_desc}
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Partículas flotantes para Step 5 */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Partícula con movimiento de rebote y escalado */}
                <div className="absolute top-4 left-4 w-1 h-1 bg-magenta/60 rounded-full animate-bounce-gentle" style={{
                  animationDelay: '1.2s',
                  animation: 'bounce-gentle 2.7s ease-in-out infinite, scale-breathe 3.8s ease-in-out infinite'
                }}></div>
                
                {/* Partícula con trayectoria en forma de corazón */}
                <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-cyan/50 rounded-full" style={{
                  animationDelay: '1.7s',
                  animation: 'heart 6.5s ease-in-out infinite'
                }}></div>
                
                {/* Partícula con movimiento de mariposa */}
                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-magenta/40 rounded-full" style={{
                  animationDelay: '2.2s',
                  animation: 'butterfly 5s ease-in-out infinite'
                }}></div>
                
                {/* Partícula con rebote y rotación */}
                <div className="absolute bottom-6 right-4 w-1 h-1 bg-cyan/30 rounded-full animate-bounce-gentle" style={{
                  animationDelay: '2.7s',
                  animation: 'bounce-gentle 3.1s ease-in-out infinite, spin 6.8s linear infinite'
                }}></div>
              </div>
              
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-magenta to-cyan rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md relative">
                  <span className="text-white text-xl font-bold font-poppins">5</span>
                  
                  {/* Partículas alrededor del círculo */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-magenta/80 rounded-full animate-ping-slow" style={{animationDelay: '1s'}}></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan/80 rounded-full animate-ping-slow" style={{animationDelay: '1.6s'}}></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-magenta/60 rounded-full animate-ping-slow" style={{animationDelay: '2.2s'}}></div>
                  <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-cyan/60 rounded-full animate-ping-slow" style={{animationDelay: '2.8s'}}></div>
                </div>
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-cyan transition-colors duration-300">
                {t.home_process_step5_title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.home_process_step5_desc}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.home_testimonials_title} subtitle={t.home_testimonials_subtitle} />
          <div ref={el => { sectionsRef.current[3] = el; }} className="grid lg:grid-cols-3 gap-8 mt-12">
            {MOCK_TESTIMONIALS.map(testimonial => (
              <div key={testimonial.id} className="bg-gray-100 p-8 rounded-lg">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
                </div>
                <p className="mt-4 text-gray-700 italic">"{t[testimonial.quoteKey as keyof Translation]}"</p>
                <p className="mt-6 font-bold text-blue-deep">{testimonial.name}</p>
                <p className="text-gray-500">{t[testimonial.companyKey as keyof Translation]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip Mejorado */}
      <section className="relative bg-gradient-to-br from-magenta via-pink-600 to-purple-600 text-white overflow-hidden">
        {/* Partículas flotantes de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-white/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white/25 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-white/15 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-float" style={{animationDelay: '1.8s'}}></div>
        </div>
        
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          {/* Icono decorativo superior */}
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 animate-pulse-slow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          {/* Título principal con animación */}
          <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6 leading-tight" style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            {t.home_cta_strip_title}
          </h2>
          
          {/* Subtítulo motivacional */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            {t.home_cta_subtitle}
          </p>
          
          {/* Estadísticas de confianza */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{t.home_cta_stats_projects}</div>
              <div className="text-white/80 text-sm md:text-base">{t.home_cta_stats_projects_label}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{t.home_cta_stats_satisfaction}</div>
              <div className="text-white/80 text-sm md:text-base">{t.home_cta_stats_satisfaction_label}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{t.home_cta_stats_support}</div>
              <div className="text-white/80 text-sm md:text-base">{t.home_cta_stats_support_label}</div>
            </div>
          </div>
          
          {/* Botón CTA mejorado */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contacto"
              className="group relative inline-flex items-center bg-white text-magenta font-bold py-4 px-10 rounded-full text-lg font-poppins
                         transform hover:scale-105 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {t.cta_button}
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            
            {/* Botón secundario */}
            <Link
              to="/portafolio"
              className="group inline-flex items-center border-2 border-white/30 text-white font-medium py-4 px-8 rounded-full text-lg font-poppins
                         hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.home_cta_button_portfolio}
            </Link>
          </div>
          
          {/* Texto de confianza */}
          <p className="text-white/70 text-sm mt-8 max-w-2xl mx-auto">
            ✨ {t.home_cta_trust_text}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
