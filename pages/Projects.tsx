import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PROJECTS, IMAGES } from '../constants';

const Projects: React.FC = () => {
  // Theme: Amber, Cool gray background
  const primaryColor = "#f59e0b"; // amber-500

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6] text-gray-800 font-sans">
      {/* Header Section */}
      <div className="p-8 sm:p-12 pb-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={IMAGES.PROFILE}
              alt="Yuri"
              className="w-16 h-16 rounded-full object-cover border-2"
              style={{ borderColor: primaryColor }}
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Yuri Winchester</h1>
              <p className="text-gray-600">Software Engineer & Web Developer</p>
            </div>
          </div>
          <div className="hidden md:block">
            <Navbar primaryColor={primaryColor} />
          </div>
          {/* Mobile nav handled by main Navbar component in a slightly different layout, 
                but for consistency with the design image, we embed the Navbar logic or use standard nav.
                The image shows a specific header layout. Let's reuse the responsive Navbar but style it.
            */}
        </div>
      </div>

      {/* Since the design has a unique header structure, we might need a custom nav or just reuse the logic.
          For simplicity and code reuse, let's assume the Navbar component handles the links, 
          and we just position it manually or let standard Navbar handle it. 
          Actually, the screenshot shows the Nav links on the right. 
          The Navbar component I built has the logo on left. 
          Let's just put the main Navbar here to handle navigation behavior.
      */}
      <div className="md:hidden">
        <Navbar primaryColor={primaryColor} />
      </div>


      <main className="py-12 px-8 sm:px-12 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">My Projects</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A selection of my recent work. I'm passionate about building clean, efficient, and user-friendly applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title} <span className="text-red-600">[ADQUIRIR]</span></h3>

                  <div className="bg-red-600 p-4 rounded-lg mb-4 text-white shadow-lg">
                    <p className="font-bold text-sm uppercase">Este sistema pode ser seu!</p>
                    <a
                      href="/contact"
                      className="mt-2 block text-center bg-white text-red-600 py-1 rounded font-bold text-xs"
                    >
                      CLIQUE PARA ADQUIRIR
                    </a>
                  </div>

                  <p className="text-gray-600 mb-6 flex-grow">{project.description}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <a href="#" className="font-semibold inline-flex items-center hover:underline" style={{ color: primaryColor }}>
                      View Details
                      <span className="material-symbols-outlined ml-1 text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </a>
                    <a
                      href="#"
                      className="text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center gap-2 hover:opacity-90"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <span className="material-symbols-outlined text-base">open_in_new</span>
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="bg-gray-200 border-t border-gray-300 mt-20">
        <Footer primaryColor={primaryColor} />
      </div>
    </div>
  );
};

export default Projects;