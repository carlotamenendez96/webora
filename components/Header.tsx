
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslations } from '../hooks/useTranslations';
import { Menu, X, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t.nav_home },
    { to: '/servicios', label: t.nav_services },
    { to: '/portafolio', label: t.nav_portfolio },
    { to: '/nosotros', label: t.nav_about },
    // { to: '/blog', label: t.nav_blog }, // Oculto temporalmente
    { to: '/contacto', label: t.nav_contact },
  ];

  // Función eliminada - ahora se cambia el idioma directamente con setLanguage

  const activeLinkStyle = {
    color: '#00F7FF',
    textShadow: '0 0 5px #00F7FF'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-blue-deep/95 backdrop-blur-xl shadow-2xl h-20 transition-all duration-300">
      {/* Línea de acento superior */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan/60 to-transparent"></div>
      
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo con efectos hover */}
        <Link to="/" className="group">
          <div className="text-3xl font-poppins font-bold text-white tracking-wider hover:text-cyan transition-all duration-300 transform group-hover:scale-105">
            Webora<span className="text-magenta group-hover:text-cyan transition-colors duration-300">.</span>
          </div>
        </Link>
        
        {/* Navegación con indicadores de hover */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              className="relative font-poppins text-white hover:text-cyan transition-all duration-300 font-medium group"
              style={({ isActive }) => isActive ? activeLinkStyle : {}}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {/* Indicador de hover y estado activo */}
                  <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan to-magenta transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        {/* Lado derecho con mejoras */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Selector de idioma mejorado */}
          <div className="relative">
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="relative bg-white/10 text-white rounded-full py-2.5 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan/50 cursor-pointer transition-all duration-300 border border-white/30 text-sm font-medium min-w-[60px] flex items-center justify-center space-x-2"
            >
              <Globe className="text-white/80 transition-colors duration-300" size={16}/>
              <span className="font-bold">{language.toUpperCase()}</span>
            </button>
          </div>
          
          {/* Botón CTA mejorado */}
          <Link
            to="/contacto"
            className="relative group overflow-hidden bg-gradient-to-r from-magenta to-pink-600 text-white font-bold py-2.5 px-8 rounded-full font-poppins
                       transform hover:scale-105 hover:shadow-xl hover:shadow-magenta/30 transition-all duration-300"
          >
            <span className="relative z-10">{t.cta_button}</span>
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
        </div>

        {/* Botón móvil con hover */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-cyan transition-colors duration-300">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menú móvil mejorado */}
      {isMenuOpen && (
        <>
          {/* Overlay de fondo */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 z-[9998]"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menú móvil premium */}
          <div className="lg:hidden fixed top-0 right-0 h-screen w-80 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0f0f23] shadow-2xl z-[9999] flex flex-col overflow-hidden">
            {/* Efectos de fondo sofisticados */}
            <div className="absolute inset-0">
              {/* Patrón de grid sutil */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
              
              {/* Efectos de luz dinámicos */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-magenta/30 to-transparent"></div>
              
              {/* Círculos decorativos mejorados */}
              <div className="absolute top-16 right-6 w-40 h-40 bg-cyan/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-4 w-32 h-32 bg-magenta/5 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 right-8 w-24 h-24 bg-pink-400/5 rounded-full blur-xl"></div>
            </div>
            
            {/* Header premium */}
            <div className="relative flex justify-between items-center p-8 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan to-magenta rounded-xl flex items-center justify-center shadow-lg shadow-cyan/20">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <div className="text-2xl font-poppins font-bold text-white tracking-wide">
                  Webora<span className="text-magenta">.</span>
                </div>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 p-3 rounded-xl group"
              >
                <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Navegación principal mejorada */}
            <nav className="flex-1 px-8 py-4 space-y-3 relative">
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">{t.menu_navigation}</h3>
              </div>
              
              {navLinks.map((link, index) => (
                <NavLink 
                  key={link.to} 
                  to={link.to} 
                  onClick={() => setIsMenuOpen(false)}
                  className="relative group block"
                >
                  {({ isActive }) => (
                    <div className={`relative flex items-center space-x-4 py-4 px-6 rounded-2xl transition-all duration-500 transform ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan/10 via-magenta/5 to-transparent border border-cyan/20 shadow-lg shadow-cyan/10' 
                        : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                    }`}>
                      
                      {/* Ícono dinámico */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? 'bg-gradient-to-br from-cyan to-magenta shadow-lg shadow-cyan/30' 
                          : 'bg-white/10 group-hover:bg-gradient-to-br group-hover:from-cyan/20 group-hover:to-magenta/20'
                      }`}>
                        <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          isActive ? 'bg-white' : 'bg-white/60 group-hover:bg-cyan'
                        }`}></div>
                      </div>
                      
                      {/* Contenido del enlace */}
                      <div className="flex-1">
                        <span className={`text-lg font-medium transition-all duration-300 ${
                          isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                        }`}>
                          {link.label}
                        </span>
                        {isActive && (
                          <div className="text-xs text-cyan/80 mt-1 font-medium">{t.menu_current_page}</div>
                        )}
                      </div>
                      
                      {/* Indicador de estado */}
                      {isActive && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
                          <div className="w-1 h-6 bg-gradient-to-b from-cyan to-magenta rounded-full"></div>
                        </div>
                      )}
                    </div>
                  )}
                </NavLink>
              ))}
            </nav>
            
            {/* Sección inferior premium */}
            <div className="relative px-8 pb-8 space-y-4 flex-shrink-0">
              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              {/* Botón CTA premium */}
              <Link
                to="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="relative group block"
              >
                <div className="relative overflow-hidden bg-gradient-to-r from-magenta via-pink-500 to-magenta text-white font-bold py-4 px-6 rounded-2xl transform hover:scale-105 hover:shadow-2xl hover:shadow-magenta/30 transition-all duration-500 border border-magenta/20">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">💬</span>
                    </div>
                    <span className="tracking-wide">{t.cta_button}</span>
                  </div>
                  
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </Link>
              
              {/* Selector de idioma premium */}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="relative w-full bg-white/5 hover:bg-white/10 text-white rounded-2xl py-3 px-6 transition-all duration-300 border border-white/10 hover:border-cyan/30 flex items-center justify-center space-x-3 group"
              >
                <Globe className="text-white/60 group-hover:text-cyan transition-colors duration-300" size={18}/>
                <span className="font-medium">{language === 'es' ? 'Español' : 'English'}</span>
                <div className="w-2 h-2 bg-white/40 rounded-full group-hover:bg-cyan transition-colors duration-300"></div>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
