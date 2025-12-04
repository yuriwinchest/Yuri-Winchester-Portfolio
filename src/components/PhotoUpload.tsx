import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface PhotoUploadProps {
    currentPhotoUrl: string;
    onPhotoUpdated: (newUrl: string) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ currentPhotoUrl, onPhotoUpdated }) => {
    const [photoUrl, setPhotoUrl] = useState(currentPhotoUrl);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    React.useEffect(() => {
        setPhotoUrl(currentPhotoUrl);
    }, [currentPhotoUrl]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);

            // Criar preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadPhoto = async () => {
        if (!selectedFile) {
            alert('Selecione uma foto primeiro!');
            return;
        }

        setUploading(true);
        try {
            // 1. Upload para o Supabase Storage
            const fileName = `profile-${Date.now()}.${selectedFile.name.split('.').pop()}`;

            // Tentar criar o bucket primeiro (vai dar erro se já existir, mas tudo bem)
            try {
                await supabase.storage.createBucket('profile-images', {
                    public: true,
                    fileSizeLimit: 5242880 // 5MB
                });
            } catch (bucketError) {
                console.log('Bucket já existe ou erro ao criar:', bucketError);
            }

            const { error: uploadError } = await supabase.storage
                .from('profile-images')
                .upload(fileName, selectedFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // 2. Pegar URL pública
            const { data: urlData } = supabase.storage
                .from('profile-images')
                .getPublicUrl(fileName);

            const publicUrl = urlData.publicUrl;

            // 3. Atualizar no banco
            const { error: dbError } = await supabase
                .from('site_settings')
                .upsert({ key: 'profile_image', value: publicUrl });

            if (dbError) throw dbError;

            setPhotoUrl(publicUrl);
            setSelectedFile(null);
            setPreviewUrl(null);
            onPhotoUpdated(publicUrl);
            alert('✅ Foto enviada com sucesso!');
        } catch (error: any) {
            console.error('Erro ao fazer upload:', error);
            alert(`❌ Erro ao fazer upload: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleUpdateUrl = async () => {
        if (!photoUrl.trim()) {
            alert('Digite uma URL válida!');
            return;
        }

        setUploading(true);
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({ key: 'profile_image', value: photoUrl });

            if (error) throw error;

            onPhotoUpdated(photoUrl);
            alert('✅ Foto de perfil atualizada!');
        } catch (error: any) {
            alert(`❌ Erro ao atualizar foto: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📸 Foto de Perfil</h2>

            {/* Preview da foto atual */}
            {(photoUrl || previewUrl) && (
                <div className="mb-4 flex justify-center">
                    <img
                        src={previewUrl || photoUrl}
                        alt="Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                    />
                </div>
            )}

            {/* Opção 1: Upload de Arquivo */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-3 text-gray-700">📁 Opção 1: Enviar do Computador</h3>
                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="flex-grow p-2 border border-gray-300 rounded-md text-sm"
                    />
                    <button
                        onClick={handleUploadPhoto}
                        disabled={!selectedFile || uploading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        {uploading ? '⏳ Enviando...' : '📤 Enviar Foto'}
                    </button>
                </div>
                {selectedFile && (
                    <p className="text-sm text-gray-600 mt-2">
                        Arquivo selecionado: {selectedFile.name}
                    </p>
                )}
            </div>

            {/* Opção 2: URL */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3 text-gray-700">🔗 Opção 2: Usar URL de Imagem</h3>
                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        type="text"
                        value={photoUrl}
                        onChange={e => setPhotoUrl(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-md"
                        placeholder="https://exemplo.com/minha-foto.jpg"
                    />
                    <button
                        onClick={handleUpdateUrl}
                        disabled={uploading}
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        {uploading ? '⏳ Salvando...' : '💾 Salvar URL'}
                    </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Dica: Use Imgur, Supabase Storage ou qualquer serviço de hospedagem de imagens
                </p>
            </div>
        </section>
    );
};
