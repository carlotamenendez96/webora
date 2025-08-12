
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
    { href: '#', icon: <Twitter size={20} /> },
    { href: '#', icon: <Linkedin size={20} /> },
    { href: '#', icon: <Github size={20} /> },
  ];

  return (
    <footer className="bg-blue-deep text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-poppins font-bold">Webora<span className="text-magenta">.</span></h3>
            <p className="mt-4 text-white/80 max-w-md">{t.footer_description}</p>
          </div>
          <div>
            <h4 className="font-poppins font-bold text-lg">{t.footer_links_title}</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-cyan transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-bold text-lg">{t.footer_social_title}</h4>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="hover:text-cyan transition-colors" target="_blank" rel="noopener noreferrer">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/20 pt-8 text-center text-white/60">
          <p>{t.footer_copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
