
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-lime-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-white text-xl font-bold font-poppins">1</span>
                </div>
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-lime-600 transition-colors duration-300">
                {t.home_process_step1_title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.home_process_step1_desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-lime-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-white text-xl font-bold font-poppins">2</span>
                </div>
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-lime-600 transition-colors duration-300">
                {t.home_process_step2_title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.home_process_step2_desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-lime-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-white text-xl font-bold font-poppins">3</span>
                </div>
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-lime-600 transition-colors duration-300">
                {t.home_process_step3_title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.home_process_step3_desc}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-lime-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-white text-xl font-bold font-poppins">4</span>
                </div>
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-lime-600 transition-colors duration-300">
                {t.home_process_step4_title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.home_process_step4_desc}
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-lime-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-white text-xl font-bold font-poppins">5</span>
                </div>
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-lime-600 transition-colors duration-300">
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

      {/* CTA Strip */}
      <section className="bg-magenta text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold">{t.home_cta_strip_title}</h2>
          <Link
            to="/contacto"
            className="mt-6 inline-block bg-white text-magenta font-bold py-3 px-8 rounded-full text-lg font-poppins
                       transform hover:scale-105 transition-transform duration-300"
          >
            {t.cta_button}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
