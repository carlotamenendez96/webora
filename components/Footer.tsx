
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../hooks/useTranslations';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslations();

  const navLinks = [
    { to: '/', label: t.nav_home },
    { to: '/servicios', label: t.nav_services },
    { to: '/portafolio', label: t.nav_portfolio },
    { to: '/nosotros', label: t.nav_about },
  ];

  const socialLinks = [
    // { href: 'https://twitter.com', icon: <Twitter size={20} /> },
    { href: 'https://www.linkedin.com/in/carlotamenendezalvarez', icon: <Linkedin size={20} target="_blank" /> },
    { href: 'https://github.com/carlotamenendez96', icon: <Github size={20} target="_blank" /> },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-blue-deep via-indigo-900 to-blue-deep text-white overflow-hidden">
      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-cyan/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-magenta/15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-cyan/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-magenta/20 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Sección principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Branding y descripción */}
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-poppins font-bold mb-2">
                Webora<span className="text-magenta group-hover:text-cyan transition-colors duration-300">.</span>
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-magenta to-cyan rounded-full mb-4"></div>
            </div>
            <p className="text-white/90 text-lg leading-relaxed max-w-lg mb-6">
              {t.footer_description}
            </p>
            
            {/* Newsletter signup */}
            {/* <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h4 className="font-poppins font-semibold text-white mb-3">¡Mantente actualizado!</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:border-cyan transition-colors"
                />
                <button className="bg-gradient-to-r from-magenta to-cyan text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan/25 transition-all duration-300">
                  Suscribir
                </button>
              </div>
            </div> */}
          </div>
          
          {/* Enlaces de navegación */}
          <div>
            <h4 className="font-poppins font-bold text-xl mb-6 relative">
              {t.footer_links_title}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-magenta to-cyan rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="group flex items-center text-white/80 hover:text-cyan transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="w-2 h-2 bg-cyan rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Redes sociales y contacto */}
          <div>
            <h4 className="font-poppins font-bold text-xl mb-6 relative">
              {t.footer_social_title}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-magenta to-cyan rounded-full"></div>
            </h4>
            
            {/* Redes sociales */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 
                           hover:bg-gradient-to-r hover:from-magenta hover:to-cyan hover:border-transparent 
                           hover:scale-110 hover:shadow-lg hover:shadow-cyan/25 transition-all duration-300" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="text-white group-hover:text-white transition-colors duration-300">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
            
            {/* Información de contacto */}
            <div className="space-y-3">
              <div className="flex items-center text-white/80">
                <svg className="w-4 h-4 mr-3 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>carlotamenendezalvarez96@gmail.com</span>
              </div>
              <div className="flex items-center text-white/80">
                <svg className="w-4 h-4 mr-3 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+34 645 47 51 53</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Separador visual */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gradient-to-br from-blue-deep via-indigo-900 to-blue-deep px-6 text-white/60">
              ✨
            </span>
          </div>
        </div>
        
        {/* Copyright y enlaces adicionales */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <p>{t.footer_copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-cyan transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-cyan transition-colors">Cookies</a>
          </div>
        </div>
      </div>
      
      {/* Botón de scroll-to-top mejorado */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-magenta to-cyan text-white rounded-full shadow-lg 
                   hover:shadow-xl hover:shadow-cyan/25 hover:scale-110 transition-all duration-300 z-50
                   flex items-center justify-center group"
      >
        <svg className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
