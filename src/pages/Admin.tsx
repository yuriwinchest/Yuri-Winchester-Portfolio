import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Project } from '../types';
import { PhotoUpload } from '../components/PhotoUpload';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '', description: '', image: '', live_link: '', details_link: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    // 1. Projects
    const { data: proj } = await supabase.from('projects').select('*').order('id', { ascending: true });
    if (proj) setProjects(proj);

    // 2. Messages
    const { data: msg } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (msg) setMessages(msg);

    // 3. Settings (Photo)
    const { data: settings } = await supabase.from('site_settings').select('value').eq('key', 'profile_image').single();
    if (settings) setProfilePhotoUrl(settings.value);

    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check for demonstration. Real apps should use Supabase Auth.
    if (password === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  const handleUpdateProfilePhoto = async () => {
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'profile_image', value: profilePhotoUrl });

    if (!error) alert('Foto de perfil atualizada!');
    else alert('Erro ao atualizar foto');
  };

  const handleAddProject = async () => {
    console.log('🎨 Tentando adicionar projeto:', newProject);

    if (!newProject.title) {
      alert('❌ Título é obrigatório!');
      return;
    }

    if (!newProject.description) {
      alert('❌ Descrição é obrigatória!');
      return;
    }

    if (!newProject.image) {
      alert('❌ URL da imagem é obrigatória!');
      return;
    }

    try {
      const { data, error } = await supabase.from('projects').insert([newProject]).select();

      console.log('📊 Resposta do Supabase:', { data, error });

      if (error) {
        console.error('❌ Erro ao adicionar:', error);
        alert(`❌ Erro: ${error.message}`);
        return;
      }

      alert('✅ Projeto adicionado com sucesso!');
      setNewProject({ title: '', description: '', image: '', live_link: '', details_link: '' });
      fetchData();
    } catch (err: any) {
      console.error('❌ Erro completo:', err);
      alert(`❌ Erro: ${err.message}`);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este projeto?")) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchData();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-xl mb-4 font-bold text-center">Login Administrativo</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
            placeholder="Digite o PIN (1234)"
            autoComplete="current-password"
            aria-label="Senha de acesso"
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-red-600 hover:underline">Sair</button>
        </div>

        {loading && <div className="mb-4 text-blue-600 font-semibold animate-pulse">Carregando dados...</div>}

        {/* --- Profile Photo Section --- */}
        <PhotoUpload
          currentPhotoUrl={profilePhotoUrl}
          onPhotoUpdated={(newUrl) => setProfilePhotoUrl(newUrl)}
        />

        {/* --- Projects Section --- */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">🎨 Gerenciar Projetos</h2>
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'}
            </span>
          </div>

          {/* Add/Edit Form */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl mb-6 border-2 border-purple-200">
            <h3 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span className="material-icons-outlined text-purple-600">add_circle</span>
              Adicionar Novo Projeto
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título do Projeto *</label>
                <input
                  placeholder="Ex: Sistema de Gestão"
                  className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  value={newProject.title}
                  onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem (Capa) *</label>
                <input
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  value={newProject.image}
                  onChange={e => setNewProject({ ...newProject, image: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link da Demo (opcional)</label>
                <input
                  placeholder="https://projeto-demo.com"
                  className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  value={newProject.live_link}
                  onChange={e => setNewProject({ ...newProject, live_link: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link de Detalhes (opcional)</label>
                <input
                  placeholder="https://detalhes.com"
                  className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  value={newProject.details_link}
                  onChange={e => setNewProject({ ...newProject, details_link: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Projeto *</label>
                <textarea
                  placeholder="Descreva o projeto, tecnologias usadas, funcionalidades..."
                  className="border-2 border-gray-300 p-3 rounded-lg w-full h-24 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>

              {/* Preview da Imagem */}
              {newProject.image && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preview da Imagem:</label>
                  <img
                    src={newProject.image}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Imagem+Inválida';
                    }}
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleAddProject}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg mt-4 hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              <span className="material-icons-outlined">add</span>
              Adicionar Projeto
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length === 0 && (
              <div className="col-span-full text-center py-12">
                <span className="text-6xl mb-4 block">📂</span>
                <p className="text-gray-500 italic">Nenhum projeto cadastrado ainda.</p>
              </div>
            )}

            {projects.map(p => (
              <div key={p.id} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Project Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Sem+Imagem';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-600">
                    ID: {p.id}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{p.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{p.description}</p>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.live_link && (
                      <a
                        href={p.live_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200 transition flex items-center gap-1"
                      >
                        <span className="material-icons-outlined text-sm">open_in_new</span>
                        Demo
                      </a>
                    )}
                    {p.details_link && (
                      <a
                        href={p.details_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition flex items-center gap-1"
                      >
                        <span className="material-icons-outlined text-sm">info</span>
                        Detalhes
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-1 text-sm font-medium"
                    >
                      <span className="material-icons-outlined text-sm">delete</span>
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Messages Section --- */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">📬 Mensagens Recebidas</h2>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {messages.length} {messages.length === 1 ? 'mensagem' : 'mensagens'}
            </span>
          </div>

          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📭</span>
                <p className="text-gray-500 italic">Nenhuma mensagem recebida ainda.</p>
              </div>
            )}

            {messages.map(msg => (
              <div key={msg.id} className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-icons-outlined text-blue-500">person</span>
                    <span className="font-bold text-gray-900">{msg.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                    {new Date(msg.created_at).toLocaleDateString('pt-BR')} às {new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="material-icons-outlined text-sm text-gray-400">email</span>
                  <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 hover:underline">
                    {msg.email}
                  </a>
                </div>

                <div className="bg-white p-4 rounded border border-gray-200 text-gray-700 whitespace-pre-wrap mb-3">
                  {msg.message}
                </div>

                <div className="flex gap-2">
                  <a
                    href={`mailto:${msg.email}?subject=Re: Contato via Portfolio`}
                    className="flex items-center gap-1 text-sm bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition"
                  >
                    <span className="material-icons-outlined text-sm">reply</span>
                    Responder
                  </a>
                  <button
                    onClick={async () => {
                      if (window.confirm('Deseja deletar esta mensagem?')) {
                        await supabase.from('messages').delete().eq('id', msg.id);
                        fetchData();
                      }
                    }}
                    className="flex items-center gap-1 text-sm bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition"
                  >
                    <span className="material-icons-outlined text-sm">delete</span>
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;

