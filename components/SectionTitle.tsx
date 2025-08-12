
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-poppins font-bold text-blue-deep">{title}</h2>
      <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
      <div className="mt-4 mx-auto w-24 h-1 bg-magenta rounded-full"></div>
    </div>
  );
};

export default SectionTitle;
