import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IMAGES } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // Theme: Orange, Light background
  const primaryColor = "#FB923C"; // orange-400
  
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7ED] text-zinc-800 font-sans">
      <Navbar primaryColor={primaryColor} />
      
      <main className="flex-grow flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
                Hi, I'm Yuri<br />Winchester
              </h1>
              <p className="mt-4 text-lg text-zinc-600 max-w-xl mx-auto lg:mx-0">
                A creative programmer passionate about building beautiful and functional web experiences. I turn complex problems into elegant software solutions.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-white font-medium rounded-md shadow-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: primaryColor }}
                >
                  View My Projects
                  <span className="material-icons ml-2">arrow_forward</span>
                </Link>
                <Link
                  to="/skills"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-zinc-200 text-zinc-800 font-medium rounded-md hover:bg-zinc-300 transition-colors"
                >
                  Explore Skills
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square rounded-lg shadow-2xl overflow-hidden">
                <img 
                  src={IMAGES.PROFILE} 
                  alt="Yuri Winchester" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
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