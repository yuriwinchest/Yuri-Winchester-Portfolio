import React, { useState } from 'react';

interface FooterProps {
  primaryColor: string;
  isDark?: boolean;
}

const SocialLink: React.FC<{ href: string; children: React.ReactNode; primaryColor: string; textColor: string }> = ({ href, children, primaryColor, textColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className={`${textColor} transition-colors`}
      style={{ color: isHovered ? primaryColor : undefined }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
};

const Footer: React.FC<FooterProps> = ({ primaryColor, isDark = false }) => {
  const textColor = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const borderColor = isDark ? 'border-zinc-800' : 'border-zinc-200';

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className={`border-t ${borderColor} pt-6 flex flex-col sm:flex-row justify-between items-center gap-4`}>
        <p className={`text-sm ${textColor}`}>© 2025 Yuri Winchester. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;