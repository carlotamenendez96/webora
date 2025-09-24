
import React, { useState, useEffect, useRef } from 'react';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useTranslations } from '../hooks/useTranslations';
import SectionTitle from '../components/SectionTitle';
import { Mail, Phone, MapPin } from 'lucide-react';

import { gsap } from '../utils/gsap';

const Contact: React.FC = () => {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const pageRef = useRef(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    // Let Formspree handle the submission
    // The form will submit naturally to Formspree
  };
  
  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    
    // Check if form was submitted successfully (from Formspree redirect)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setIsSuccess(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  }, []);

  // Set document head metadata
  useDocumentHead({
    title: `${t.nav_contact} | Webora`,
    description: t.contact_page_subtitle,
  });

  return (
    <>
      <div ref={pageRef} className="py-20 pt-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.contact_page_title} subtitle={t.contact_page_subtitle} />
          
          <div className="grid lg:grid-cols-3 gap-12 mt-12 max-w-6xl mx-auto">
            <div className="lg:col-span-2 bg-gray-100 p-8 rounded-lg shadow-md">
              <form 
                action="https://formspree.io/f/xovlrzyz"
                method="POST"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="_subject" value="Nuevo mensaje de contacto desde Webora" />
                <input type="hidden" name="_next" value="?success=true" />
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t.contact_form_name}</label>
                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-deep focus:border-blue-deep" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t.contact_form_email}</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-deep focus:border-blue-deep" />
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">{t.contact_form_subject}</label>
                  <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-deep focus:border-blue-deep" />
                </div>
                <div className="mt-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t.contact_form_message}</label>
                  <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-deep focus:border-blue-deep"></textarea>
                </div>
                <div className="mt-6">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-magenta text-white font-bold py-3 px-6 rounded-full font-poppins transform hover:scale-105 hover:shadow-lg hover:shadow-magenta/50 transition-all duration-300 disabled:bg-gray-400 disabled:scale-100 disabled:shadow-none">
                    {isSubmitting ? t.contact_form_sending : t.contact_form_send}
                  </button>
                </div>
                {isSuccess && (
                  <div className="mt-4 text-center p-3 bg-green-100 text-green-800 rounded-md">
                    {t.contact_form_success}
                  </div>
                )}
              </form>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl font-poppins font-bold text-blue-deep">{t.contact_info_title}</h3>
              <div className="flex items-start">
                <Mail className="text-magenta mt-1 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold">Email</h4>
                  <a href="mailto:carlotamenendezalvarez96@gmail.com" className="text-gray-600 hover:text-magenta">carlotamenendezalvarez96@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="text-magenta mt-1 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold">Teléfono</h4>
                  <a href="tel:+34123456789" className="text-gray-600 hover:text-magenta">+34 645 47 51 53</a>
                </div>
              </div>
              {/* <div className="flex items-start">
                <MapPin className="text-magenta mt-1 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold">Oficina</h4>
                  <p className="text-gray-600">{t.contact_info_address}</p>
                </div>
              </div> */}
            </div>
          </div>

          {/* <div className="mt-16 h-96 rounded-lg overflow-hidden shadow-xl">
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086431209355!2d-122.4194154846813!3d37.77492957975949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c1c0e3ab3%3A0x41ecf3c4c01758f!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1678886400000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
            ></iframe>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Contact;
