import React from 'react';

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  alignment = 'center',
  className = '',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
  };

  return (
    <div className={`mb-12 max-w-3xl ${alignmentClasses[alignment]} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-zinc-400 mt-2 font-open-sans">{subtitle}</p>
      )}
      <div className={`w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mt-6 mb-4 rounded-full ${alignment === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionHeading;