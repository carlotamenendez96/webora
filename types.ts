
import React from 'react';

export interface Project {
  id: number;
  titleKey: string;
  categoryKey: string;
  image: string;
  descriptionKey: string;
  url: string;
}

export interface Service {
  id: number;
  titleKey: string;
  descriptionKey: string;
  icon: React.ElementType;
  details: {
    processKey: string;
    deliverablesKey: string;
  };
}

export interface Testimonial {
  id: number;
  quoteKey: string;
  name: string;
  companyKey: string;
}

export interface BlogPost {
  id: number;
  titleKey: string;
  excerptKey: string;
  date: string;
  image: string;
}

export interface Translation {
  // General
  nav_home: string;
  nav_services: string;
  nav_portfolio: string;
  nav_about: string;
  nav_blog: string;
  nav_contact: string;
  cta_button: string;
  view_case_study: string;
  read_more: string;

  // Home Page
  home_hero_title: string;
  home_hero_subtitle: string;
  home_services_title: string;
  home_services_subtitle: string;
  home_results_title: string;
  home_results_subtitle: string;
  home_results_metric1_label: string;
  home_results_metric2_label: string;
  home_results_metric3_label: string;
  home_portfolio_title: string;
  home_portfolio_subtitle: string;
  home_testimonials_title: string;
  home_testimonials_subtitle: string;
  home_cta_strip_title: string;
  home_cta_subtitle: string;
  home_cta_stats_projects: string;
  home_cta_stats_projects_label: string;
  home_cta_stats_satisfaction: string;
  home_cta_stats_satisfaction_label: string;
  home_cta_stats_support: string;
  home_cta_stats_support_label: string;
  home_cta_button_portfolio: string;
  home_cta_trust_text: string;
  
  // Sección de proceso
  home_process_title: string;
  home_process_subtitle: string;
  home_process_step1_title: string;
  home_process_step1_desc: string;
  home_process_step2_title: string;
  home_process_step2_desc: string;
  home_process_step3_title: string;
  home_process_step3_desc: string;
  home_process_step4_title: string;
  home_process_step4_desc: string;
  home_process_step5_title: string;
  home_process_step5_desc: string;

  // Services Page
  services_page_title: string;
  services_page_subtitle: string;
  service_title_design: string;
  service_desc_design: string;
  service_process_design: string;
  service_deliverables_design: string;
  service_title_dev: string;
  service_desc_dev: string;
  service_process_dev: string;
  service_deliverables_dev: string;
  service_title_seo: string;
  service_desc_seo: string;
  service_process_seo: string;
  service_deliverables_seo: string;
  service_title_social: string;
  service_desc_social: string;
  service_process_social: string;
  service_deliverables_social: string;
  service_process_title: string;
  service_deliverables_title: string;
  service_cta_title: string;
  service_cta_description: string;
  service_cta_button: string;

  // Portfolio Page
  portfolio_page_title: string;
  portfolio_page_subtitle: string;
  portfolio_filter_all: string;
  portfolio_filter_web: string;
  portfolio_filter_ecommerce: string;
  portfolio_filter_ai: string;
  project_title_1: string;
  project_desc_1: string;
  project_category_1: string;
  project_title_2: string;
  project_desc_2: string;
  project_category_2: string;
  project_title_3: string;
  project_desc_3: string;
  project_category_3: string;
  project_title_4: string;
  project_desc_4: string;
  project_category_4: string;
  project_title_5: string;
  project_desc_5: string;
  project_category_5: string;
  project_title_6: string;
  project_desc_6: string;
  project_category_6: string;

  // About Page
  about_page_title: string;
  about_page_subtitle: string;
  about_philosophy_title: string;
  about_philosophy_text: string;
  about_timeline_title: string;
  about_timeline_subtitle: string;
  about_milestone1_year: string;
  about_milestone1_title: string;
  about_milestone1_desc: string;
  about_milestone2_year: string;
  about_milestone2_title: string;
  about_milestone2_desc: string;
  about_milestone3_year: string;
  about_milestone3_title: string;
  about_milestone3_desc: string;
  about_story_title: string;
  about_story_paragraph1: string;
  about_story_paragraph2: string;
  about_story_paragraph3: string;
  about_story_paragraph4: string;
  
  // Sección de texto motivacional
  about_motivational_title: string;
  about_motivational_paragraph1: string;
  about_motivational_paragraph2: string;
  about_motivational_paragraph3: string;
  about_motivational_paragraph4: string;
  about_motivational_question: string;
  about_motivational_paragraph5: string;
  about_motivational_cta: string;

  // Blog Page
  blog_page_title: string;
  blog_page_subtitle: string;
  post1_title: string;
  post1_excerpt: string;
  post2_title: string;
  post2_excerpt: string;
  post3_title: string;
  post3_excerpt: string;
  post4_title: string;
  post4_excerpt: string;

  // Contact Page
  contact_page_title: string;
  contact_page_subtitle: string;
  contact_form_name: string;
  contact_form_email: string;
  contact_form_subject: string;
  contact_form_message: string;
  contact_form_send: string;
  contact_form_sending: string;
  contact_form_success: string;
  contact_info_title: string;
  contact_info_address: string;

  // Testimonials
  testimonial1_quote: string;
  testimonial1_company: string;
  testimonial2_quote: string;
  testimonial2_company: string;
  testimonial3_quote: string;
  testimonial3_company: string;
  
  // Footer
  footer_description: string;
  footer_links_title: string;
  footer_social_title: string;
  footer_copyright: string;
  
  // Tags para TagsPhysics
  tag_fluid_animations: string;
  tag_design: string;
  tag_gsap: string;
  tag_startup: string;
  tag_backend: string;
  tag_framer: string;
  tag_animations: string;
  tag_vue: string;
  tag_saas: string;
  tag_web_development: string;
  tag_react: string;
  tag_typescript: string;
  tag_tailwind: string;
  tag_nodejs: string;
  tag_api: string;
  tag_seo: string;
  tag_marketing: string;
  tag_branding: string;
  tag_wordpress: string;
  tag_ecommerce: string;
  tag_mobile: string;
}
