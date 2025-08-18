'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface ArtistMusicPlayerProps {
  songUrl: string;
  songTitle: string;
  artistName: string;
  className?: string;
}

const ArtistMusicPlayer: React.FC<ArtistMusicPlayerProps> = ({
  songUrl,
  songTitle,
  artistName,
  className = ''
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const isDisabled = !songUrl || songUrl === '';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    
    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
    };
    const handleCanPlayThrough = () => {
      setIsLoading(false);
      setError(null);
    };
    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setError('Eroare la încărcarea piesei');
    };
    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleLoadStart = () => {
      if (isPlaying) {
        setIsLoading(true);
      }
    };
    const handleWaiting = () => {
      if (isPlaying) {
        setIsLoading(true);
      }
    };
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
    };
  }, [volume, isPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || isDisabled) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      }
    } catch (err) {
      console.error('Eroare la redarea audio:', err);
      setError('Nu s-a putut reda piesa. Încercați din nou.');
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || isDisabled) return;
    
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isDisabled) {
    return (
      <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-gray-700 rounded-lg p-6 shadow-xl opacity-50 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <Music className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-500">{songTitle}</h3>
              <p className="text-sm text-gray-600">{artistName}</p>
            </div>
          </div>
        </div>
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">
            Piesa nu este disponibilă momentan
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-[#d62828]/30 rounded-lg p-6 shadow-xl ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#d62828] rounded-full flex items-center justify-center">
            <Music className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#f0f0f0]">{songTitle}</h3>
            <p className="text-sm text-[#f0f0f0]/70">{artistName}</p>
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
          <div className="relative w-20 h-1 bg-[#333] rounded-lg overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[#d62828] rounded-lg"
              style={{ width: `${volume * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-[#f0f0f0]/60 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="relative w-full h-1 bg-[#333] rounded-lg overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#d62828] rounded-lg transition-all duration-100 ease-linear"
            style={{ 
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' 
            }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={togglePlay}
          disabled={isLoading}
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

      {error && (
        <div className="mt-4 text-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <audio
        ref={audioRef}
        src={songUrl}
        preload="metadata"
        className="hidden"
      />


    </div>
  );
};

export default ArtistMusicPlayer;
