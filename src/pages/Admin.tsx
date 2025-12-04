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
    const { data: proj } = await supabase.from('projects').select('*').order('id', {ascending: true});
    if (proj) setProjects(proj);
    
    // 2. Messages
    const { data: msg } = await supabase.from('messages').select('*').order('created_at', {ascending: false});
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
      alert('Incorrect Password');
    }
  };

  const handleUpdateProfilePhoto = async () => {
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'profile_image', value: profilePhotoUrl });
    
    if (!error) alert('Profile photo updated!');
    else alert('Error updating photo');
  };

  const handleAddProject = async () => {
    if (!newProject.title) return;
    const { error } = await supabase.from('projects').insert([newProject]);
    if (!error) {
      alert('Project added!');
      setNewProject({ title: '', description: '', image: '', live_link: '', details_link: '' });
      fetchData();
    }
  };

  const handleDeleteProject = async (id: number) => {
    if(!window.confirm("Are you sure?")) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchData();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
          <h2 className="text-xl mb-4">Admin Login</h2>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="border p-2 w-full mb-4 rounded" 
            placeholder="Enter PIN (1234)"
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded">Enter</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* --- Profile Photo Section --- */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Profile Photo</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input 
                type="text" 
                value={profilePhotoUrl}
                onChange={e => setProfilePhotoUrl(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="https://..."
              />
            </div>
            <button onClick={handleUpdateProfilePhoto} className="bg-blue-600 text-white px-4 py-2 rounded h-10">Save</button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Tip: Upload your image to a service like Imgur or use Supabase Storage manually and paste the link here.</p>
        </section>

        {/* --- Projects Section --- */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
          
          {/* Add New */}
          <div className="bg-gray-50 p-4 rounded mb-6 border">
            <h3 className="font-semibold mb-2">Add New Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                placeholder="Title" 
                className="border p-2 rounded" 
                value={newProject.title} 
                onChange={e => setNewProject({...newProject, title: e.target.value})} 
              />
              <input 
                placeholder="Image URL" 
                className="border p-2 rounded" 
                value={newProject.image} 
                onChange={e => setNewProject({...newProject, image: e.target.value})} 
              />
              <input 
                placeholder="Live Link" 
                className="border p-2 rounded" 
                value={newProject.live_link} 
                onChange={e => setNewProject({...newProject, live_link: e.target.value})} 
              />
               <input 
                placeholder="Details Link (optional)" 
                className="border p-2 rounded" 
                value={newProject.details_link} 
                onChange={e => setNewProject({...newProject, details_link: e.target.value})} 
              />
              <textarea 
                placeholder="Description" 
                className="border p-2 rounded md:col-span-2" 
                value={newProject.description} 
                onChange={e => setNewProject({...newProject, description: e.target.value})} 
              />
            </div>
            <button onClick={handleAddProject} className="bg-green-600 text-white px-4 py-2 rounded mt-4">Add Project</button>
          </div>

          {/* List */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Links</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map(p => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{p.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.live_link && <a href={p.live_link} target="_blank" className="text-blue-500 hover:underline mr-2">Live</a>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleDeleteProject(p.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Messages Section --- */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Contact Messages</h2>
          <div className="space-y-4">
            {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
            {messages.map(msg => (
              <div key={msg.id} className="border-b pb-4">
                <div className="flex justify-between">
                  <span className="font-bold">{msg.name}</span>
                  <span className="text-sm text-gray-500">{new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-blue-600">{msg.email}</p>
                <p className="mt-1 text-gray-700">{msg.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;