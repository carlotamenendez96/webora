
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-blue-deep/98 backdrop-blur-xl shadow-2xl border-t border-white/10">
          <nav className="flex flex-col items-center space-y-6 py-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to} 
                to={link.to} 
                onClick={() => setIsMenuOpen(false)}
                className="relative font-poppins text-xl text-white hover:text-cyan transition-all duration-300 font-medium group"
                style={({ isActive }) => isActive ? activeLinkStyle : {}}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Indicador de hover y estado activo móvil */}
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan to-magenta transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </>
                )}
              </NavLink>
            ))}
            <Link
              to="/contacto"
              onClick={() => setIsMenuOpen(false)}
              className="relative group overflow-hidden bg-gradient-to-r from-magenta to-pink-600 text-white font-bold mt-4 py-3 px-8 rounded-full font-poppins
                        transform hover:scale-105 hover:shadow-xl hover:shadow-magenta/30 transition-all duration-300"
            >
              <span className="relative z-10">{t.cta_button}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
             <div className="relative mt-4">
                <button
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  className="relative bg-white/10 text-white rounded-full py-3 px-6 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan/50 cursor-pointer transition-all duration-300 border border-white/30 text-lg font-medium min-w-[100px] flex items-center justify-center space-x-3"
                >
                  <Globe className="text-white/80" size={18}/>
                  <span className="font-bold">{language === 'es' ? 'Español' : 'English'}</span>
                </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
