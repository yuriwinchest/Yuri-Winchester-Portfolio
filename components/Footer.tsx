import React from 'react';

interface FooterProps {
  primaryColor: string;
  isDark?: boolean;
}

const Footer: React.FC<FooterProps> = ({ primaryColor, isDark = false }) => {
  const textColor = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const borderColor = isDark ? 'border-zinc-800' : 'border-zinc-200';

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className={`border-t ${borderColor} pt-6 flex flex-col sm:flex-row justify-between items-center gap-4`}>
        <p className={`text-sm ${textColor}`}>© 2024 Yuri Winchester. All rights reserved.</p>
        <div className="flex space-x-4">
          {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
            <a 
              key={social} 
              href="#" 
              className={`${textColor} transition-colors hover:opacity-100`}
              style={{ ':hover': { color: primaryColor } } as any}
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;