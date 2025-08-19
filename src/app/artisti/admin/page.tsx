'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Plus, Edit2, Trash2, Save, X, Search, Lock } from 'lucide-react';

interface Artist {
  id: string;
  nume: string;
  imagine: string;
  titluPiesa: string;
  descriere: string;
  email: string;
  telefon: string;
  linkConnectare?: string;
  linkMuzica?: string;
  linkPiesa?: string;
  packageType: 'basic' | 'plus' | 'premium';
  dataInregistrare: string;
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [artisti, setArtisti] = useState<Artist[]>([]);
  const [filteredArtisti, setFilteredArtisti] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<Artist>>({});

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadArtisti();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filtered = artisti.filter(artist =>
      artist.nume.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.titluPiesa.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtisti(filtered);
  }, [searchTerm, artisti]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expectedId = process.env.NEXT_PUBLIC_AUTH_ID;
    const expectedPassword = process.env.NEXT_PUBLIC_AUTH_PASS;
    
    if (loginData.id === expectedId && loginData.password === expectedPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      loadArtisti();
      setLoginError('');
    } else {
      setLoginError('ID sau parolă incorectă');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setLoginData({ id: '', password: '' });
    setArtisti([]);
    setFilteredArtisti([]);
  };

  const loadArtisti = async () => {
    try {
      const response = await fetch('/data/artisti.json');
      const data = await response.json();
      setArtisti(data);
      setFilteredArtisti(data);
    } catch (error) {
      console.error('Eroare la încărcarea artiștilor:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveArtistsToFile = async (newArtisti: Artist[]) => {
    try {
      const response = await fetch('/api/update-artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artists: newArtisti }),
      });

      if (!response.ok) {
        throw new Error('Eroare la salvarea datelor');
      }

      setArtisti(newArtisti);
      return true;
    } catch (error) {
      console.error('Eroare la salvare:', error);
      alert('Eroare la salvarea datelor');
      return false;
    }
  };

  const handleEditArtist = (artist: Artist) => {
    setEditingArtist(artist);
    setFormData(artist);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    const newArtist: Partial<Artist> = {
      id: Date.now().toString(),
      nume: '',
      imagine: '/images/default-artist.jpg',
      titluPiesa: '',
      descriere: '',
      email: '',
      telefon: '',
      linkConnectare: '',
      linkMuzica: '',
      linkPiesa: '',
      packageType: 'basic',
      dataInregistrare: new Date().toISOString().split('T')[0],
    };
    setFormData(newArtist);
    setIsAddingNew(true);
    setEditingArtist(null);
  };

  const handleSaveArtist = async () => {
    if (!formData.nume || !formData.titluPiesa || !formData.email) {
      alert('Completează toate câmpurile obligatorii');
      return;
    }

    const artistData = formData as Artist;
    let newArtisti: Artist[];

    if (isAddingNew) {
      newArtisti = [...artisti, artistData];
    } else {
      newArtisti = artisti.map(artist => 
        artist.id === artistData.id ? artistData : artist
      );
    }

    const success = await saveArtistsToFile(newArtisti);
    if (success) {
      setEditingArtist(null);
      setIsAddingNew(false);
      setFormData({});
    }
  };

  const handleDeleteArtist = async (id: string) => {
    if (!confirm('Ești sigur că vrei să ștergi acest artist?')) {
      return;
    }

    const newArtisti = artisti.filter(artist => artist.id !== id);
    await saveArtistsToFile(newArtisti);
  };

  const handleCancelEdit = () => {
    setEditingArtist(null);
    setIsAddingNew(false);
    setFormData({});
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800 w-full max-w-md">
          <div className="text-center mb-6">
            <Lock className="h-12 w-12 text-[#d62828] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Admin Artiști
            </h1>
            <p className="text-gray-400">
              Introdu credențialele pentru acces
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ID Admin
              </label>
              <input
                type="text"
                value={loginData.id}
                onChange={(e) => setLoginData(prev => ({ ...prev, id: e.target.value }))}
                className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors"
                placeholder="Introdu ID-ul"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Parolă
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors pr-12"
                  placeholder="Introdu parola"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#d62828] text-white py-3 rounded-lg font-semibold hover:bg-[#b91c1c] transition-colors duration-300"
            >
              Autentifică-te
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-white text-xl">Se încarcă...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#d62828] to-[#f77f00] bg-clip-text text-transparent">
              Admin Artiști
            </h1>
            <p className="text-gray-400">
              Gestionează artiștii înregistrați ({artisti.length} total)
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Deconectează-te
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Caută artiști după nume, email sau titlu piesă..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors"
            />
          </div>
          <button
            onClick={handleAddNew}
            className="px-6 py-3 bg-[#d62828] text-white rounded-lg font-semibold hover:bg-[#b91c1c] transition-colors duration-300 inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Adaugă Artist
          </button>
        </div>

        {(editingArtist || isAddingNew) && (
          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#d62828]">
                {isAddingNew ? 'Adaugă Artist Nou' : 'Editează Artist'}
              </h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nume Artist *
                </label>
                <input
                  type="text"
                  value={formData.nume || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, nume: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors"
                  placeholder="Numele artistului"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Titlu Piesă *
                </label>
                <input
                  type="text"
                  value={formData.titluPiesa || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, titluPiesa: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors"
                  placeholder="Titlul piesei"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={formData.telefon || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefon: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors"
                  placeholder="+40722123456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Imagine URL
                </label>
                <input
                  type="url"
                  value={formData.imagine || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, imagine: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors"
                  placeholder="/images/artist.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pachet
                </label>
                <select
                  value={formData.packageType || 'basic'}
                  onChange={(e) => setFormData(prev => ({ ...prev, packageType: e.target.value as 'basic' | 'plus' | 'premium' }))}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#d62828] transition-colors"
                >
                  <option value="basic">Basic</option>
                  <option value="plus">Plus</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Link Conectare
                </label>
                <input
                  type="url"
                  value={formData.linkConnectare || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkConnectare: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors"
                  placeholder="Ex: https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Link Muzică
                </label>
                <input
                  type="url"
                  value={formData.linkMuzica || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkMuzica: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors"
                  placeholder="Ex: https://youtube.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Link Piesă (MP3/Audio)
                </label>
                <input
                  type="url"
                  value={formData.linkPiesa || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkPiesa: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors"
                  placeholder="https://example.com/song.mp3"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descriere
                </label>
                <textarea
                  rows={4}
                  value={formData.descriere || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, descriere: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors resize-none"
                  placeholder="Descrierea artistului sau piesei..."
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={handleCancelEdit}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Anulează
              </button>
              <button
                onClick={handleSaveArtist}
                className="px-6 py-2 bg-[#d62828] text-white rounded-lg font-semibold hover:bg-[#b91c1c] transition-colors duration-300 inline-flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvează
              </button>
            </div>
          </div>
        )}

        <div className="bg-[#1A1A1A] rounded-2xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2A2A2A]">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-300">Artist</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-300">Piesă</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-300">Contact</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-300">Pachet</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-300">Data Înregistrare</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {filteredArtisti.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">
                      {searchTerm ? 'Nu am găsit artiști pentru termenul de căutare.' : 'Nu există artiști înregistrați.'}
                    </td>
                  </tr>
                ) : (
                  filteredArtisti.map((artist) => (
                    <tr key={artist.id} className="border-t border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold">
                            {artist.nume.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-white">{artist.nume}</div>
                            <div className="text-sm text-gray-400">ID: {artist.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{artist.titluPiesa}</div>
                        {artist.descriere && (
                          <div className="text-sm text-gray-400 truncate max-w-xs">
                            {artist.descriere}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">{artist.email}</div>
                        {artist.telefon && (
                          <div className="text-sm text-gray-400">{artist.telefon}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          artist.packageType === 'basic' ? 'bg-gray-500' :
                          artist.packageType === 'plus' ? 'bg-blue-500' :
                          'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}>
                          {artist.packageType === 'basic' ? 'Basic' :
                           artist.packageType === 'plus' ? 'Plus' : 'Premium'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(artist.dataInregistrare).toLocaleDateString('ro-RO')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditArtist(artist)}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            title="Editează"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteArtist(artist.id)}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            title="Șterge"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
