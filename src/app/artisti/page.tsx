'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, User, Music } from 'lucide-react';

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

const ArtistiPage = () => {
  const [artisti, setArtisti] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArtisti, setFilteredArtisti] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    loadArtisti();
  }, []);

  useEffect(() => {
    const filtered = artisti.filter(artist =>
      artist.nume.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtisti(filtered);
  }, [searchTerm, artisti]);

  const getPackageColor = (packageType: string) => {
    switch (packageType) {
      case 'basic':
        return 'bg-gray-500';
      case 'plus':
        return 'bg-blue-500';
      case 'premium':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPackageLabel = (packageType: string) => {
    switch (packageType) {
      case 'basic':
        return 'Basic';
      case 'plus':
        return 'Plus';
      case 'premium':
        return 'Premium';
      default:
        return 'Basic';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-white text-xl">Se încarcă artiștii...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#d62828] to-[#f77f00] bg-clip-text text-transparent">
            Artiștii Noștri
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Descoperă talentele care fac parte din familia Muzica Mea
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Caută artiști după nume..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-400 focus:outline-none focus:border-[#d62828] transition-colors duration-300"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredArtisti.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                Nu am găsit artiști
              </h3>
              <p className="text-gray-400">
                {searchTerm ? 'Încearcă alt termen de căutare' : 'Nu există artiști înregistrați momentan'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtisti.map((artist) => (
                <Link href={`/artisti/${artist.id}`} key={artist.id}>
                  <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden hover:bg-[#2A2A2A] transition-all duration-300 transform hover:scale-105 border border-gray-800 hover:border-[#d62828]/50">
                    {/* Artist Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={artist.imagine}
                        alt={artist.nume}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/default-artist.jpg';
                        }}
                      />

                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {artist.nume}
                      </h3>
                      
                      <div className="flex items-center text-gray-300 mb-3">
                        <Music className="h-4 w-4 mr-2 text-[#d62828]" />
                        <span className="text-sm font-medium">{artist.titluPiesa}</span>
                      </div>

                      {artist.descriere && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {artist.descriere}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Înregistrat: {new Date(artist.dataInregistrare).toLocaleDateString('ro-RO')}
                        </span>
                        <span className="text-[#d62828] text-sm font-medium hover:text-[#f77f00] transition-colors">
                          Vezi profil →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArtistiPage;
