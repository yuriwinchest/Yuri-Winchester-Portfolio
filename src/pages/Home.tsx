import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IMAGES } from '../constants';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Home: React.FC = () => {
  // Theme: Orange, Light background
  const primaryColor = "#FB923C"; // orange-400
  const [profileImage, setProfileImage] = useState(IMAGES.PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'profile_image')
        .single();

      if (data && data.value) {
        setProfileImage(data.value);
      }
    } catch (error) {
      console.error("Erro ao carregar imagem de perfil", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7ED] text-zinc-800 font-sans">
      <Navbar primaryColor={primaryColor} />

      <main className="flex-grow flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
                Olá, eu sou<br />Yuri Winchester
              </h1>
              <h2 className="mt-6 text-2xl sm:text-3xl font-semibold text-orange-600">
                Desenvolvedor Full Stack
              </h2>
              <p className="mt-4 text-lg sm:text-xl text-zinc-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Especializado em <span className="font-semibold text-orange-600">Soluções para Saúde, Comércio e Sistemas Empresariais Personalizados</span>
              </p>
              <p className="mt-4 text-base text-zinc-600 max-w-xl mx-auto lg:mx-0">
                Transformo desafios complexos em soluções tecnológicas robustas e escaláveis. Com experiência em desenvolvimento de sistemas completos, desde a arquitetura até a implementação, entrego produtos que fazem a diferença no seu negócio.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-white font-medium rounded-md shadow-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: primaryColor }}
                >
                  Ver Meus Projetos
                  <span className="material-icons ml-2">arrow_forward</span>
                </Link>
                <Link
                  to="/skills"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-zinc-200 text-zinc-800 font-medium rounded-md hover:bg-zinc-300 transition-colors"
                >
                  Explorar Habilidades
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square rounded-lg shadow-2xl overflow-hidden bg-zinc-200">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center animate-pulse text-zinc-400">Carregando...</div>
                ) : (
                  <img
                    src={profileImage}
                    alt="Yuri Winchester"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer primaryColor={primaryColor} />
    </div>
  );
};

export default Home;