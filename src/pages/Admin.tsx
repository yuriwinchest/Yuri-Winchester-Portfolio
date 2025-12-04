import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Project } from '../types';

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
    if (!newProject.title) return;
    const { error } = await supabase.from('projects').insert([newProject]);
    if (!error) {
      alert('Projeto adicionado!');
      setNewProject({ title: '', description: '', image: '', live_link: '', details_link: '' });
      fetchData();
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
          <h2 className="text-xl font-bold mb-4 text-gray-800">Gerenciar Projetos</h2>

          {/* Add New */}
          <div className="bg-gray-50 p-4 rounded mb-6 border border-gray-200">
            <h3 className="font-semibold mb-2 text-gray-700">Adicionar Novo Projeto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Título do Projeto"
                className="border p-2 rounded"
                value={newProject.title}
                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
              />
              <input
                placeholder="URL da Imagem (Capa)"
                className="border p-2 rounded"
                value={newProject.image}
                onChange={e => setNewProject({ ...newProject, image: e.target.value })}
              />
              <input
                placeholder="Link da Demo (Botão Demo)"
                className="border p-2 rounded"
                value={newProject.live_link}
                onChange={e => setNewProject({ ...newProject, live_link: e.target.value })}
              />
              <input
                placeholder="Link de Detalhes (Botão Ver Detalhes)"
                className="border p-2 rounded"
                value={newProject.details_link}
                onChange={e => setNewProject({ ...newProject, details_link: e.target.value })}
              />
              <textarea
                placeholder="Descrição do projeto..."
                className="border p-2 rounded md:col-span-2 h-24"
                value={newProject.description}
                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>
            <button onClick={handleAddProject} className="bg-green-600 text-white px-6 py-2 rounded mt-4 hover:bg-green-700 transition">
              + Adicionar Projeto
            </button>
          </div>

          {/* List */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projeto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Links</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map(p => (
                  <tr key={p.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{p.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{p.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col gap-1">
                      {p.live_link && <a href={p.live_link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Demo</a>}
                      {p.details_link && <a href={p.details_link} target="_blank" rel="noreferrer" className="text-purple-500 hover:underline">Detalhes</a>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleDeleteProject(p.id)} className="text-red-600 hover:text-red-900 font-medium">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Messages Section --- */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Mensagens Recebidas</h2>
          <div className="space-y-4">
            {messages.length === 0 && <p className="text-gray-500 italic">Nenhuma mensagem recebida ainda.</p>}
            {messages.map(msg => (
              <div key={msg.id} className="border-b pb-4 hover:bg-gray-50 p-2 rounded transition">
                <div className="flex flex-col sm:flex-row justify-between mb-1">
                  <span className="font-bold text-gray-900">{msg.name}</span>
                  <span className="text-sm text-gray-500">{new Date(msg.created_at).toLocaleDateString('pt-BR')} às {new Date(msg.created_at).toLocaleTimeString('pt-BR')}</span>
                </div>
                <p className="text-sm text-blue-600 mb-2">{msg.email}</p>
                <div className="bg-gray-100 p-3 rounded text-gray-700 whitespace-pre-wrap">
                  {msg.message}
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

