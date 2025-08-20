'use client';

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

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

interface RadioContextType {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  radioStatus: RadioStatus | null;
  error: string | null;
  localElapsed: number;
  togglePlay: () => Promise<void>;
  handleVolumeChange: (volume: number) => void;
  toggleMute: () => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export const useRadio = () => {
  const context = useContext(RadioContext);
  if (context === undefined) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
};

export const RadioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [radioStatus, setRadioStatus] = useState<RadioStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [localElapsed, setLocalElapsed] = useState(0);
  
  const RADIO_STREAM_URL = process.env.NEXT_PUBLIC_RADIO_STREAM_URL;
  const RADIO_API_URL = process.env.NEXT_PUBLIC_RADIO_API_URL;

  const initializeAudio = useCallback(() => {
    if (!audioRef.current && typeof window !== 'undefined') {
      audioRef.current = new Audio();
      audioRef.current.src = RADIO_STREAM_URL || '';
      audioRef.current.preload = 'none';
      audioRef.current.volume = volume;

      const audio = audioRef.current;

      const handleCanPlay = () => {
        setIsLoading(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };

      const handleLoadStart = () => setIsLoading(true);
      const handleWaiting = () => setIsLoading(true);
      
      const handlePlaying = () => {
        setIsLoading(false);
        setIsPlaying(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };

      const handleError = () => {
        setIsLoading(false);
        setIsPlaying(false);
        setError('Eroare la încărcarea stream-ului');
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };

      const handlePlay = () => setIsPlaying(true);
      
      const handlePause = () => {
        setIsPlaying(false);
        setIsLoading(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('waiting', handleWaiting);
      audio.addEventListener('playing', handlePlaying);
      audio.addEventListener('error', handleError);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('waiting', handleWaiting);
        audio.removeEventListener('playing', handlePlaying);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, [RADIO_STREAM_URL, volume]);

  const fetchRadioStatus = useCallback(async () => {
    try {
      if (!RADIO_API_URL) {
        throw new Error('URL-ul API pentru radio nu este configurat');
      }
      
      const response = await fetch(RADIO_API_URL);
      if (!response.ok) {
        throw new Error('Nu s-au putut încărca informațiile radio');
      }
      const data: RadioStatus = await response.json();
      setRadioStatus(data);
      setLocalElapsed(data.now_playing?.elapsed || 0);
      setError(null);
    } catch (err) {
      console.error('Eroare la încărcarea statusului radio:', err);
      setError('Nu s-au putut încărca informațiile radio');
    }
  }, [RADIO_API_URL]);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) {
      initializeAudio();
      if (!audioRef.current) return;
    }

    const audio = audioRef.current;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    try {
      if (isPlaying) {
        audio.pause();
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          await playPromise;
        }
        
        timeoutRef.current = setTimeout(() => {
          if (isLoading && !isPlaying) {
            setIsLoading(false);
            setError('Stream-ul se încarcă lent. Încercați din nou.');
          }
        }, 8000);
      }
    } catch (err) {
      console.error('Eroare la redarea audio:', err);
      setError('Nu s-a putut reda stream-ul. Încercați din nou.');
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [isPlaying, isLoading, initializeAudio]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      handleVolumeChange(0.7);
    } else {
      handleVolumeChange(0);
    }
  }, [isMuted, handleVolumeChange]);

  useEffect(() => {
    initializeAudio();
    fetchRadioStatus();
    
    intervalRef.current = setInterval(fetchRadioStatus, 30000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (elapsedIntervalRef.current) {
        clearInterval(elapsedIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [initializeAudio, fetchRadioStatus]);

  useEffect(() => {
    if (isPlaying && radioStatus?.now_playing) {
      elapsedIntervalRef.current = setInterval(() => {
        setLocalElapsed(prev => {
          const newElapsed = prev + 1;
          const duration = radioStatus.now_playing?.duration || 0;
          return newElapsed <= duration ? newElapsed : duration;
        });
      }, 1000);
    } else {
      if (elapsedIntervalRef.current) {
        clearInterval(elapsedIntervalRef.current);
        elapsedIntervalRef.current = null;
      }
    }

    return () => {
      if (elapsedIntervalRef.current) {
        clearInterval(elapsedIntervalRef.current);
      }
    };
  }, [isPlaying, radioStatus?.now_playing]);

  const value: RadioContextType = {
    isPlaying,
    isLoading,
    volume,
    isMuted,
    radioStatus,
    error,
    localElapsed,
    togglePlay,
    handleVolumeChange,
    toggleMute,
  };

  return (
    <RadioContext.Provider value={value}>
      {children}
    </RadioContext.Provider>
  );
};
