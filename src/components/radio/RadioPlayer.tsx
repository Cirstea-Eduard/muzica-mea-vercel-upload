'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, Radio, Music } from 'lucide-react';

interface CurrentTrack {
  title: string;
  start_time: string;
  artwork_url: string;
  artwork_url_large: string;
}

interface RadioStatus {
  status: 'online' | 'offline';
  current_track: CurrentTrack;
  history: Array<{
    title: string;
  }>;
  logo_url: string;
  streaming_hostname: string;
  outputs: Array<{
    name: string;
    format: string;
    bitrate: number;
  }>;
}

interface RadioPlayerProps {
  className?: string;
  onStatusUpdate?: (status: RadioStatus) => void;
  variant?: 'compact' | 'expanded';
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ className = '', onStatusUpdate, variant = 'compact' }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [radioStatus, setRadioStatus] = useState<RadioStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const RADIO_STREAM_URL = 'https://streamer.radio.co/s3f6df73e3/listen';
  const RADIO_API_URL = 'https://public.radio.co/stations/s3f6df73e3/status';

  const fetchRadioStatus = useCallback(async () => {
    try {
      const response = await fetch(RADIO_API_URL);
      if (!response.ok) {
        throw new Error('Nu s-au putut încărca informațiile radio');
      }
      const data: RadioStatus = await response.json();
      setRadioStatus(data);
      setError(null);
      
      if (onStatusUpdate) {
        onStatusUpdate(data);
      }
    } catch (err) {
      console.error('Eroare la încărcarea statusului radio:', err);
      setError('Nu s-au putut încărca informațiile radio');
    }
  }, [onStatusUpdate]);

  useEffect(() => {
    fetchRadioStatus();
    
    const interval = setInterval(fetchRadioStatus, 30000);
    
    return () => clearInterval(interval);
  }, [fetchRadioStatus]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setError('Eroare la încărcarea stream-ului');
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        setIsLoading(true);
        setError(null);
        await audio.play();
      }
    } catch (err) {
      console.error('Eroare la redarea audio:', err);
      setError('Nu s-a putut reda stream-ul. Încercați din nou.');
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      handleVolumeChange(0.7);
    } else {
      handleVolumeChange(0);
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('ro-RO', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  if (variant === 'expanded') {
    return (
      <div className={`radio-player-container h-full flex flex-col relative ${className}`}>
        
        {radioStatus?.current_track && (
          <div className="absolute top-0 left-0 z-10">
            <div className="inline-flex items-center space-x-2 bg-[#d62828]/20 px-3 py-2 rounded-br-lg border-b border-r border-[#d62828]/30">
              <Music className="h-4 w-4 text-[#d62828]" />
              <span className="text-sm text-[#d62828] font-bold uppercase tracking-wide">ACUM CÂNTĂ:</span>
              <span className="text-sm text-[#f0f0f0] font-medium">{radioStatus.current_track.title}</span>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center items-center space-y-8">
          
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-[#d62828] to-[#b61e1e] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#d62828]/25">
              <Radio className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[#f0f0f0] mb-2">Ascultă Live</h2>
            <div className="flex items-center justify-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${radioStatus?.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-lg text-[#f0f0f0]/80">
                În direct • MuzicaMea Radio
              </span>
            </div>
          </div>

          {radioStatus?.current_track && (
            <div className="w-48 h-48 bg-[#d62828]/20 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-[#d62828]/30 shadow-2xl">
              {radioStatus.current_track.artwork_url ? (
                <Image 
                  src={radioStatus.current_track.artwork_url} 
                  alt="Album Art"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <Music className="h-24 w-24 text-[#d62828] hidden" />
            </div>
          )}



        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4 pb-4 w-full max-w-xs">
          
          <button
            onClick={togglePlay}
            disabled={isLoading || radioStatus?.status !== 'online'}
            className={`
              w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center text-white font-semibold text-lg lg:text-xl
              transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
              shadow-2xl shadow-[#d62828]/30
              ${isPlaying 
                ? 'bg-gradient-to-r from-[#d62828] to-[#b61e1e] hover:from-[#b61e1e] hover:to-[#a01818]' 
                : 'bg-gradient-to-r from-[#d62828] to-[#b61e1e] hover:from-[#b61e1e] hover:to-[#a01818]'
              }
            `}
          >
            {isLoading ? (
              <div className="w-6 h-6 lg:w-8 lg:h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <Pause className="h-6 w-6 lg:h-8 lg:w-8" />
            ) : (
              <Play className="h-6 w-6 lg:h-8 lg:w-8 ml-1" />
            )}
          </button>

          <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
            <button
              onClick={toggleMute}
              className="p-2 text-[#f0f0f0] hover:text-[#d62828] transition-colors rounded-full hover:bg-[#d62828]/10"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-[#f0f0f0]/60 min-w-[2rem]">0%</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-20 lg:w-24 h-2 bg-[#333] rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-xs text-[#f0f0f0]/60 min-w-[3rem]">100%</span>
            </div>
          </div>

          <div className="text-center mt-4 h-8 flex items-center justify-center">
            {error ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            ) : isLoading ? (
              <p className="text-sm text-[#d62828] font-medium">Se încarcă stream-ul...</p>
            ) : null}
          </div>

        </div>

        <audio
          ref={audioRef}
          src={RADIO_STREAM_URL}
          preload="none"
          className="hidden"
        />

        <style jsx>{`
          .slider {
            background: linear-gradient(to right, #d62828 0%, #d62828 ${(volume * 100)}%, #333 ${(volume * 100)}%, #333 100%);
            border-radius: 6px;
          }
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #d62828;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(214, 40, 40, 0.3);
          }
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #d62828;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 6px rgba(214, 40, 40, 0.3);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`radio-player-container ${className}`}>
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-[#d62828]/30 rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#d62828] rounded-full flex items-center justify-center">
              <Radio className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#f0f0f0]">MuzicaMea Radio</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${radioStatus?.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm text-[#f0f0f0]/70">
                  {radioStatus?.status === 'online' ? 'Live' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-2 text-[#f0f0f0] hover:text-[#d62828] transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-1 bg-[#333] rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {radioStatus?.current_track && (
          <div className="bg-[#0D0D0D]/50 rounded-lg p-4 mb-6 border border-[#d62828]/20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#d62828]/20 rounded-lg flex items-center justify-center overflow-hidden">
                {radioStatus.current_track.artwork_url ? (
                  <Image 
                    src={radioStatus.current_track.artwork_url} 
                    alt="Album Art"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <Music className="h-8 w-8 text-[#d62828] hidden" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Music className="h-4 w-4 text-[#d62828]" />
                  <span className="text-sm text-[#d62828] font-medium">ACUM CÂNTĂ</span>
                </div>
                <h4 className="text-lg font-semibold text-[#f0f0f0] mb-1">
                  {radioStatus.current_track.title}
                </h4>
                {radioStatus.current_track.start_time && (
                  <p className="text-sm text-[#f0f0f0]/60">
                    Începută la {formatTime(radioStatus.current_track.start_time)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={togglePlay}
            disabled={isLoading || radioStatus?.status !== 'online'}
            className={`
              w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg
              transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
              ${isPlaying 
                ? 'bg-[#d62828] hover:bg-[#b61e1e] shadow-lg shadow-[#d62828]/25' 
                : 'bg-[#d62828] hover:bg-[#b61e1e] shadow-lg shadow-[#d62828]/25'
              }
            `}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </button>
        </div>

        <div className="mt-4 text-center">
          {error ? (
            <p className="text-sm text-red-400">{error}</p>
          ) : isLoading ? (
            <p className="text-sm text-[#f0f0f0]/70">Se încarcă stream-ul...</p>
          ) : (
            <p className="text-sm text-[#f0f0f0]/70">
              Muzică românească autentică • Fără reclame
            </p>
          )}
        </div>

        <audio
          ref={audioRef}
          src={RADIO_STREAM_URL}
          preload="none"
          className="hidden"
        />
      </div>

      <style jsx>{`
        .slider {
          background: linear-gradient(to right, #d62828 0%, #d62828 ${(volume * 100)}%, #333 ${(volume * 100)}%, #333 100%);
          border-radius: 4px;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #d62828;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #d62828;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default RadioPlayer;