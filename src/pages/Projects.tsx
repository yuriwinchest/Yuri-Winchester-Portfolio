import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PROJECTS as STATIC_PROJECTS, IMAGES } from '../constants';
import { supabase } from '../supabaseClient';
import { Project } from '../types';

const Projects: React.FC = () => {
  // Theme: Amber, Cool gray background
  const primaryColor = "#f59e0b"; // amber-500
  const [projects, setProjects] = useState<Project[]>([]);
  const [profileImage, setProfileImage] = useState(IMAGES.PROFILE);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 1. Fetch Profile Image
    const { data: imgData } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'profile_image')
      .single();

    if (imgData?.value) setProfileImage(imgData.value);

    // 2. Fetch Projects
    const { data: projectData, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });

    if (projectData && projectData.length > 0) {
      setProjects(projectData);
    } else {
      setProjects(STATIC_PROJECTS);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6] text-gray-800 font-sans">
      {/* Header Section */}
      <div className="p-8 sm:p-12 pb-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={profileImage}
              alt="Yuri"
              className="w-16 h-16 rounded-full object-cover border-2"
              style={{ borderColor: primaryColor }}
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Yuri Winchester</h1>
              <p className="text-gray-600">Engenheiro de Software & Desenvolvedor Web</p>
            </div>
          </div>
          <div className="hidden md:block">
            <Navbar primaryColor={primaryColor} />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <Navbar primaryColor={primaryColor} />
      </div>


      <main className="py-12 px-8 sm:px-12 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Meus Projetos - ATUALIZADO</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Uma seleção dos meus trabalhos recentes. Sou apaixonado por construir aplicações limpas, eficientes e fáceis de usar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4 h-fit">
                    <p className="text-red-700 text-sm font-bold leading-tight flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">shopping_cart</span>
                      ESTE SISTEMA PODE SER SEU!
                    </p>
                    <p className="text-red-600 text-xs mt-1 font-medium italic">
                      Personalize com suas cores, sua logo e suas funcionalidades.
                    </p>
                    <Link
                      to="/contact"
                      className="mt-3 inline-flex items-center gap-2 text-white bg-red-600 px-4 py-2 rounded-md font-bold hover:bg-red-700 text-xs transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">contact_support</span>
                      ADQUIRIR AGORA
                    </Link>
                  </div>

                  <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <a href={project.details_link || "#"} className="font-semibold inline-flex items-center hover:underline" style={{ color: primaryColor }}>
                      Ver Detalhes
                      <span className="material-symbols-outlined ml-1 text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </a>
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center gap-2 hover:opacity-90"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <span className="material-symbols-outlined text-base">open_in_new</span>
                        Demo do Sistema
                      </a>
                    )}
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