import React from 'react';
import Navbar from '../components/Navbar';
import { SKILLS, IMAGES } from '../constants';

const Skills: React.FC = () => {
  // Theme: Teal, Dark background
  const primaryColor = "#14b8a6"; // teal-500
  const isDark = true;
  
  return (
    <div className="min-h-screen flex flex-col bg-[#18181b] text-gray-200 font-sans">
      {/* We need to force standard navbar to look good here, passing isDark prop */}
      <Navbar primaryColor={primaryColor} isDark={isDark} />

      <main className="container mx-auto px-4 py-12 md:py-20 lg:py-24 flex-grow">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src={IMAGES.PROFILE_SKILLS} 
            alt="Yuri" 
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 shadow-lg"
            style={{ borderColor: primaryColor }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white">Yuri Winchester</h1>
          <p className="mt-2 text-xl font-medium" style={{ color: primaryColor }}>Technical Skills</p>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            A passionate programmer with a diverse skill set, spanning from modern frontend frameworks to scalable backend architectures and cutting-edge AI technologies.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((category, index) => (
            <div 
              key={category.title} 
              className={`bg-zinc-800/50 p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${index === SKILLS.length - 1 ? 'md:col-span-2 lg:col-span-3' : ''}`}
            >
              <div className="flex items-center mb-4">
                <span className="material-icons-outlined text-3xl mr-3" style={{ color: primaryColor }}>
                  {category.icon}
                </span>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              
              <ul className={`grid ${category.skills.length > 5 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6' : 'space-y-2'}`}>
                {category.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center text-gray-300">
                    <span className="material-icons-outlined text-sm mr-2" style={{ color: primaryColor }}>
                      check_circle
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Skills;