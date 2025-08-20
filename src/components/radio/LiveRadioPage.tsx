'use client';

import React, { useState } from 'react';
import RadioPlayer from './RadioPlayer';
import Playlist from './Playlist';
import { Music, Radio, Volume2 } from 'lucide-react';

interface Song {
  id: string;
  art: string;
  artist: string;
  title: string;
  album: string;
  genre: string;
}

interface NowPlaying {
  sh_id: number;
  played_at: number;
  duration: number;
  playlist: string;
  streamer: string;
  is_request: boolean;
  song: Song;
  elapsed: number;
  remaining: number;
}

interface PlayingNext {
  cued_at: number;
  played_at: number;
  duration: number;
  playlist: string;
  is_request: boolean;
  song: Song;
}

interface SongHistory {
  sh_id: number;
  played_at: number;
  duration: number;
  playlist: string;
  streamer: string;
  is_request: boolean;
  song: Song;
}

interface Station {
  id: number;
  name: string;
  shortcode: string;
  description: string;
  listen_url: string;
  is_public: boolean;
}

interface RadioStatus {
  station: Station;
  listeners: {
    total: number;
    unique: number;
    current: number;
  };
  live: {
    is_live: boolean;
    streamer_name: string;
    broadcast_start: string | null;
    art: string | null;
  };
  now_playing: NowPlaying;
  playing_next: PlayingNext;
  song_history: SongHistory[];
  is_online: boolean;
}

const LiveRadioPage = () => {
  const [radioStatus, setRadioStatus] = useState<RadioStatus | null>(null);

  const handleStatusUpdate = (status: RadioStatus) => {
    setRadioStatus(status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0D0D0D] to-[#1a1a1a] text-[#f0f0f0] overflow-hidden">
      <div className="fixed inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#d62828] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-[#d62828] rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-[#d62828] rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#d62828] to-[#b61e1e] rounded-full flex items-center justify-center shadow-lg shadow-[#d62828]/25 mb-4">
                <Radio className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] mb-2 text-center">
                Ascultă <span className="text-[#d62828]">Live</span>
              </h1>
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${radioStatus?.is_online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-lg text-[#f0f0f0]/70">
                  În direct • {radioStatus?.station.name || 'MuzicaMea Radio'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 min-h-0">
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-5 gap-8 h-full">
            
            <div className="lg:col-span-3">
              <div className="h-full flex flex-col">
                <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-[#0D0D0D]/80 backdrop-blur-lg border border-[#d62828]/30 rounded-2xl p-8 shadow-2xl shadow-[#d62828]/10 flex-1 min-h-[600px] lg:min-h-[calc(100vh-300px)]">
                  <div className="h-full flex flex-col justify-center">
                    <RadioPlayer 
                      variant="expanded"
                      className="h-full" 
                      onStatusUpdate={handleStatusUpdate}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="h-full flex flex-col">
                <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-[#0D0D0D]/80 backdrop-blur-lg border border-[#d62828]/30 rounded-2xl p-6 shadow-2xl shadow-[#d62828]/10 flex-1 min-h-[600px] lg:min-h-[calc(100vh-300px)]">
                  <div className="h-full flex flex-col">
                    <Playlist variant="fullpage" className="h-full" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="bg-[#0D0D0D]/80 border-t border-[#d62828]/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Volume2 className="h-5 w-5 text-[#d62828]" />
                <span className="text-[#f0f0f0]/80">Calitate HD • 128 kbps</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Music className="h-5 w-5 text-[#d62828]" />
                <span className="text-[#f0f0f0]/80">Muzică românească autentică</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Radio className="h-5 w-5 text-[#d62828]" />
                <span className="text-[#f0f0f0]/80">24/7 • Fără reclame</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRadioPage;
