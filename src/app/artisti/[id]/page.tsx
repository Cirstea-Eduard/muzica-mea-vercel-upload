'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Music, ExternalLink, Instagram, Youtube, Facebook } from 'lucide-react';
import ArtistMusicPlayer from '../../../components/artists/ArtistMusicPlayer';

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

const ArtistPage = () => {
  const params = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadArtist = async () => {
      try {
        const response = await fetch('/data/artisti.json');
        const artisti: Artist[] = await response.json();
        const foundArtist = artisti.find(a => a.id === params.id);
        
        if (foundArtist) {
          setArtist(foundArtist);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Eroare la încărcarea artistului:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadArtist();
    }
  }, [params.id]);



  const getLinkIcon = (url: string) => {
    if (url.includes('instagram.com')) {
      return <Instagram className="h-5 w-5" />;
    } else if (url.includes('facebook.com')) {
      return <Facebook className="h-5 w-5" />;
    } else if (url.includes('tiktok.com')) {
      return <span className="text-2xl">🎵</span>;
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return <Youtube className="h-5 w-5" />;
    } else if (url.includes('spotify.com')) {
      return <span className="text-2xl">🎵</span>;
    } else if (url.includes('soundcloud.com')) {
      return <span className="text-2xl">🎵</span>;
    }
    return <ExternalLink className="h-5 w-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-white text-xl">Se încarcă artistul...</div>
      </div>
    );
  }

  if (notFound || !artist) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Artistul nu a fost găsit</h1>
          <p className="text-gray-400 mb-8">Artistul căutat nu există în baza noastră de date.</p>
          <Link 
            href="/artisti"
            className="inline-flex items-center px-6 py-3 bg-[#d62828] text-white rounded-full hover:bg-[#b91c1c] transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Înapoi la Artiști
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <div className="absolute top-24 left-4 z-10">
        <Link 
          href="/artisti"
          className="inline-flex items-center px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Înapoi
        </Link>
      </div>

      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={artist.imagine}
            alt={artist.nume}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/default-artist.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent"></div>
        </div>

        <div className="relative h-full flex items-end">
          <div className="max-w-6xl mx-auto w-full px-4 pb-24">
            <div className="flex flex-col lg:flex-row items-center lg:items-end space-y-6 lg:space-y-0 lg:space-x-6 text-center lg:text-left">
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
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

              <div className="flex-1">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {artist.nume}
                </h1>

                <div className="flex items-center justify-center lg:justify-start text-gray-300 mb-6">
                  <Music className="h-6 w-6 mr-3 text-[#d62828]" />
                  <span className="text-xl lg:text-2xl font-medium">{artist.titluPiesa}</span>
                </div>

                <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
                  Membru al familiei Muzica Mea din {new Date(artist.dataInregistrare).toLocaleDateString('ro-RO')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ArtistMusicPlayer
                songUrl={artist.linkPiesa || ''}
                songTitle={artist.titluPiesa}
                artistName={artist.nume}
                className="mb-8"
              />

              {artist.descriere && (
                <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-gray-800 mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-[#d62828]">Despre Artist</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {artist.descriere}
                  </p>
                </div>
              )}


            </div>

            <div className="space-y-8">
              <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-[#d62828]">Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-[#d62828] mr-3" />
                    <a 
                      href={`mailto:${artist.email}`}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {artist.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-[#d62828] mr-3" />
                    <a 
                      href={`tel:${artist.telefon}`}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {artist.telefon}
                    </a>
                  </div>
                </div>
              </div>

              {(artist.packageType === 'plus' || artist.packageType === 'premium') && (artist.linkConnectare || artist.linkMuzica) && (
                <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-gray-800">
                  <h3 className="text-2xl font-bold mb-6 text-[#d62828]">Link-uri</h3>
                  <div className="space-y-4">
                    {artist.linkConnectare && (
                      <a
                        href={artist.linkConnectare}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-xl hover:bg-[#3A3A3A] transition-colors duration-300 group"
                      >
                        <div className="flex items-center">
                          {getLinkIcon(artist.linkConnectare)}
                          <span className="ml-3 text-gray-300 group-hover:text-white">
                            Conectează-te
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white" />
                      </a>
                    )}
                    {artist.linkMuzica && (
                      <a
                        href={artist.linkMuzica}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-xl hover:bg-[#3A3A3A] transition-colors duration-300 group"
                      >
                        <div className="flex items-center">
                          {getLinkIcon(artist.linkMuzica)}
                          <span className="ml-3 text-gray-300 group-hover:text-white">
                            Ascultă Muzica
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistPage;
