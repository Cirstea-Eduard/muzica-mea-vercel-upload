'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Music, Clock, Disc3 } from 'lucide-react';

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

interface PlaylistProps {
  className?: string;
  variant?: 'homepage' | 'fullpage';
}

const Playlist: React.FC<PlaylistProps> = ({ className = '', variant = 'homepage' }) => {
  const [radioStatus, setRadioStatus] = useState<RadioStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const RADIO_API_URL = process.env.NEXT_PUBLIC_RADIO_API_URL;

  const fetchPlaylistData = useCallback(async () => {
    try {
      if (!RADIO_API_URL) {
        throw new Error('URL-ul API pentru radio nu este configurat');
      }
      
      const response = await fetch(RADIO_API_URL);
      if (!response.ok) {
        throw new Error('Nu s-au putut încărca informațiile despre playlist');
      }
      const data: RadioStatus = await response.json();
      setRadioStatus(data);
      setError(null);
    } catch (err) {
      console.error('Eroare la încărcarea playlist-ului:', err);
      setError('Nu s-au putut încărca informațiile despre playlist');
    } finally {
      setLoading(false);
    }
  }, [RADIO_API_URL]);

  useEffect(() => {
    fetchPlaylistData();
    
    const interval = setInterval(fetchPlaylistData, 30000);
    
    return () => clearInterval(interval);
  }, [fetchPlaylistData]);

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('ro-RO', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    } catch {
      return 'Acum';
    }
  };

  const getDisplayTracks = () => {
    if (!radioStatus) return [];
    
    const tracks = [];
    
    if (radioStatus.now_playing) {
      const artistTitle = radioStatus.now_playing?.song?.artist 
        ? `${radioStatus.now_playing.song.artist} - ${radioStatus.now_playing.song.title}`
        : radioStatus.now_playing?.song?.title || 'Muzică în curs...';
      
      tracks.push({
        title: artistTitle,
        time: `${Math.floor((radioStatus.now_playing?.elapsed || 0) / 60)}:${String((radioStatus.now_playing?.elapsed || 0) % 60).padStart(2, '0')}`,
        isCurrent: true
      });
    }
    
    if (radioStatus.song_history) {
      const historyTracks = radioStatus.song_history.slice(0, 9).map(historyItem => {
        const artistTitle = historyItem?.song?.artist 
          ? `${historyItem.song.artist} - ${historyItem.song.title}`
          : historyItem?.song?.title || 'Piesă necunoscută';
        
        return {
          title: artistTitle,
          time: formatTime(new Date((historyItem?.played_at || 0) * 1000).toISOString()),
          isCurrent: false
        };
      });
      tracks.push(...historyTracks);
    }
    
    return tracks;
  };

  const displayTracks = getDisplayTracks();

  if (loading) {
    return (
      <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-[#d62828]/30 rounded-lg p-6 shadow-xl ${className}`}>
        <h3 className="text-xl font-semibold text-[#d62828] mb-4 flex items-center">
          <Music className="mr-2 h-5 w-5" />
          Playlist Live
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-[#d62828]/20 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-[#d62828]/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-[#d62828]/30 rounded-lg p-6 shadow-xl ${className}`}>
        <h3 className="text-xl font-semibold text-[#d62828] mb-4 flex items-center">
          <Music className="mr-2 h-5 w-5" />
          Playlist Live
        </h3>
        <div className="text-center py-8">
          <div className="mb-4">⚠️</div>
          <p className="text-red-400 text-sm">{error}</p>
          <button 
            onClick={fetchPlaylistData}
            className="mt-4 px-4 py-2 bg-[#d62828] text-white rounded-lg text-sm hover:bg-[#b61e1e] transition-colors"
          >
            Încearcă din nou
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-[#d62828]/30 rounded-lg p-6 shadow-xl ${variant === 'fullpage' ? 'flex flex-col h-full' : ''} ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-[#d62828] flex items-center">
          <Music className="mr-2 h-5 w-5" />
          Playlist Live
        </h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${radioStatus?.is_online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs text-[#f0f0f0]/60">
            {radioStatus?.is_online ? 'Live' : 'Offline'}
          </span>
        </div>
      </div>
      
      {displayTracks.length === 0 ? (
        <div className="text-center py-8">
          <div className="mb-4">🎵</div>
          <p className="text-[#f0f0f0]/70">
            Momentan nu sunt disponibile informații despre playlist
          </p>
        </div>
      ) : (
        <div className={`space-y-3 overflow-y-auto custom-scrollbar ${variant === 'fullpage' ? 'flex-1' : 'max-h-96'}`}>
          {displayTracks.map((track, index) => (
            <div 
              key={`${track.title}-${index}`}
              className={`
                flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg transition-all duration-300 group cursor-pointer
                ${track.isCurrent 
                  ? 'bg-[#d62828]/20 shadow-lg shadow-[#d62828]/10' 
                  : 'bg-[#0D0D0D]/50 hover:bg-[#2a2a2a]'
                }
              `}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0 mb-2 sm:mb-0">
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${track.isCurrent 
                    ? 'bg-[#d62828] text-white animate-pulse' 
                    : 'bg-[#333] text-[#f0f0f0] group-hover:bg-[#d62828] group-hover:text-white'
                  }
                `}>
                  {track.isCurrent ? (
                    <Disc3 className="h-4 w-4 animate-spin" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    {track.isCurrent && (
                      <span className="text-xs text-[#d62828] font-bold uppercase tracking-wide">
                        ● LIVE
                      </span>
                    )}
                    <p className={`
                      font-medium truncate transition-colors duration-300
                      ${track.isCurrent 
                        ? 'text-[#d62828] font-semibold' 
                        : 'text-[#f0f0f0] group-hover:text-[#d62828]'
                      }
                    `}>
                      {track.title}
                    </p>
                  </div>
                  {track.isCurrent && (
                    <p className="text-[#d62828]/80 text-xs mt-1">
                      Cântă acum pe MuzicaMea Radio
                    </p>
                  )}
                </div>
              </div>
              <div className={`
                flex items-center text-sm transition-colors duration-300 self-end sm:self-auto
                ${track.isCurrent 
                  ? 'text-[#d62828]' 
                  : 'text-[#f0f0f0]/50 group-hover:text-[#d62828]'
                }
              `}>
                <Clock className="mr-1 h-3 w-3" />
                {track.time}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d62828;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b61e1e;
        }
      `}</style>
    </div>
  );
};

export default Playlist;