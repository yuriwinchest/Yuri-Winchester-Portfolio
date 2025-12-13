import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { IMAGES, CONTACT_INFO } from '../constants';
import { supabase } from '../supabaseClient';

const Contact: React.FC = () => {
  const primaryColor = "#3b82f6"; // blue-500

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [profileImage, setProfileImage] = useState(IMAGES.CONTACT_PROFILE);

  useEffect(() => {
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'profile_image')
        .single();

      if (data?.value) {
        setProfileImage(data.value);
      }
    } catch (error) {
      console.error("Erro ao carregar imagem de perfil", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('messages')
        .insert([formData]);

      if (error) throw error;

      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        throw new Error('Falha ao enviar e-mail');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-800 font-sans">
      <div className="absolute w-full top-0 z-10">
        <Navbar primaryColor={primaryColor} />
      </div>

      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-24">
        <div className="w-full max-w-6xl mx-auto">

          {/* Header */}
          <header className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block mb-6">
              <img
                src={profileImage}
                alt="Yuri Winchester"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              Vamos Conversar? 💬
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Tem um projeto em mente? Quer colaborar? Ou apenas dizer olá? Estou sempre aberto a novas oportunidades!
            </p>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* Info Column */}
            <div className="lg:col-span-2 space-y-6">

              {/* Contact Cards */}
              <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="material-icons-outlined text-blue-500">contact_mail</span>
                  Informações de Contato
                </h2>

                <div className="space-y-4">
                  <a
                    href={`mailto:${CONTACT_INFO.EMAIL}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-icons-outlined text-white">email</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Email</p>
                      <p className="text-slate-900 font-semibold">{CONTACT_INFO.EMAIL}</p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${CONTACT_INFO.WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-icons-outlined text-white">phone</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">WhatsApp</p>
                      <p className="text-slate-900 font-semibold">+{CONTACT_INFO.WHATSAPP}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="material-icons-outlined text-white">location_on</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Localização</p>
                      <p className="text-slate-900 font-semibold">{CONTACT_INFO.LOCATION}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Redes Sociais</h3>
                <div className="flex gap-3">
                  <a
                    href={CONTACT_INFO.GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 hover:scale-110 transition-all"
                    title="GitHub"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.218.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.31.678.922.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"></path>
                    </svg>
                  </a>
                  <a
                    href={CONTACT_INFO.LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="material-icons-outlined text-blue-500">send</span>
                  Envie sua Mensagem
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Conte-me sobre seu projeto ou ideia..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none text-slate-900"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="material-icons-outlined animate-spin">refresh</span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <span className="material-icons-outlined">send</span>
                        Enviar Mensagem
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {status === 'success' && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg animate-fade-in">
                      <span className="material-icons-outlined text-green-500">check_circle</span>
                      <div>
                        <p className="font-semibold text-green-800">Mensagem enviada com sucesso!</p>
                        <p className="text-sm text-green-600">Entrarei em contato em breve.</p>
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-fade-in">
                      <span className="material-icons-outlined text-red-500">error</span>
                      <div>
                        <p className="font-semibold text-red-800">Erro ao enviar mensagem</p>
                        <p className="text-sm text-red-600">Tente novamente ou entre em contato por email.</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Contact;
