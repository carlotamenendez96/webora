
import React, { useEffect, useRef } from 'react';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useTranslations } from '../hooks/useTranslations';
import SectionTitle from '../components/SectionTitle';
import { MOCK_BLOG_POSTS } from '../constants';
import { Translation } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { gsap } from '../utils/gsap';

const Blog: React.FC = () => {
  const { t } = useTranslations();
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
  }, []);

  // Set document head metadata
  useDocumentHead({
    title: `${t.nav_blog} | Webora`,
    description: t.blog_page_subtitle,
  });

  return (
    <>
      <div ref={pageRef} className="py-20 pt-32 bg-gray-100">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.blog_page_title} subtitle={t.blog_page_subtitle} />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
            {MOCK_BLOG_POSTS.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
                <img loading="lazy" src={post.image} alt={t[post.titleKey as keyof Translation]} className="w-full h-56 object-cover" />
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h3 className="mt-2 text-xl font-poppins font-bold text-blue-deep group-hover:text-magenta transition-colors">
                    {t[post.titleKey as keyof Translation]}
                  </h3>
                  <p className="mt-2 text-gray-600 flex-grow">{t[post.excerptKey as keyof Translation]}</p>
                  <Link to="#" className="mt-4 font-bold text-magenta flex items-center">
                    {t.read_more} <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
