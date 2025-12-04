import React from 'react';
import Navbar from '../components/Navbar';
import { IMAGES } from '../constants';

const Contact: React.FC = () => {
  // Theme: Blue, Slate background
  const primaryColor = "#3b82f6"; // blue-500
  
  return (
    <div className="min-h-screen flex flex-col bg-[#f1f5f9] dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 font-display transition-colors duration-300">
       <div className="absolute w-full top-0">
         <Navbar primaryColor={primaryColor} />
       </div>

      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 mt-16">
        <div className="w-full max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <img 
              src={IMAGES.CONTACT_PROFILE} 
              alt="Yuri" 
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg" 
            />
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Get in Touch</h1>
            <p className="mt-4 text-lg text-slate-600">Let's build something amazing together.</p>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Info Column */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-slate-700">
                  <span className="material-icons-outlined text-2xl" style={{ color: primaryColor }}>mail</span>
                  <span>yuri.winchester@email.dev</span>
                </div>
                <div className="flex items-center space-x-4 text-slate-700">
                  <span className="material-icons-outlined text-2xl" style={{ color: primaryColor }}>location_on</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mt-10 mb-4">Find me on</h3>
              <div className="flex space-x-4">
                 {/* GitHub Icon SVG */}
                <a href="#" className="p-3 bg-slate-200 rounded-full text-slate-600 hover:text-white transition-colors duration-300" style={{ ':hover': { backgroundColor: primaryColor } } as any}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path clipRule="evenodd" fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.218.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.31.678.922.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"></path></svg>
                </a>
                {/* LinkedIn Icon SVG */}
                <a href="#" className="p-3 bg-slate-200 rounded-full text-slate-600 hover:text-white transition-colors duration-300" style={{ ':hover': { backgroundColor: primaryColor } } as any}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                  <input type="text" name="name" id="name" autoComplete="name" placeholder="Jane Doe" className="mt-1 block w-full rounded-md border-slate-300 bg-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                  <input type="email" name="email" id="email" autoComplete="email" placeholder="you@example.com" className="mt-1 block w-full rounded-md border-slate-300 bg-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                  <textarea id="message" name="message" rows={4} placeholder="Your message here..." className="mt-1 block w-full rounded-md border-slate-300 bg-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"></textarea>
                </div>
                <div>
                  <button 
                    type="submit" 
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Send Message
                    <span className="material-icons-outlined ml-2 text-base">send</span>
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Contact;