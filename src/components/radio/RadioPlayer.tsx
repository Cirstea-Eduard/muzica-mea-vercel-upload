'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, Radio, Music } from 'lucide-react';
import { useRadio } from '@/contexts/RadioContext';

interface RadioPlayerProps {
  className?: string;
  variant?: 'compact' | 'expanded';
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ className = '', variant = 'compact' }) => {
  const {
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
  } = useRadio();



  if (variant === 'expanded') {
    return (
      <div className={`radio-player-container h-full flex flex-col relative ${className}`}>
        
        {radioStatus?.now_playing && (
          <div className="absolute top-0 left-0 z-10">
            <div className="inline-flex items-center space-x-2 bg-[#d62828]/20 px-3 py-2 rounded-br-lg border-b border-r border-[#d62828]/30">
              <Music className="h-4 w-4 text-[#d62828]" />
              <span className="text-sm text-[#d62828] font-bold uppercase tracking-wide">ACUM CÂNTĂ:</span>
              <span className="text-sm text-[#f0f0f0] font-medium">
                {radioStatus.now_playing?.song?.artist ? `${radioStatus.now_playing.song.artist} - ` : ''}
                {radioStatus.now_playing?.song?.title || 'Muzică în curs...'}
              </span>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center items-center space-y-6 lg:space-y-8 pb-32 lg:pb-40">
          
          <div className="text-center">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-[#d62828] to-[#b61e1e] rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-2xl shadow-[#d62828]/25">
              <Radio className="h-10 w-10 lg:h-12 lg:w-12 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#f0f0f0] mb-2">Ascultă Live</h2>
            <div className="flex items-center justify-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${radioStatus?.is_online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-base lg:text-lg text-[#f0f0f0]/80">
                În direct • {radioStatus?.station?.name || 'MuzicaMea Radio'}
              </span>
            </div>
          </div>

          {radioStatus?.now_playing && (
            <div className="w-40 h-40 lg:w-48 lg:h-48 bg-[#d62828]/20 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-[#d62828]/30 shadow-2xl">
              {radioStatus.now_playing?.song?.art ? (
                <Image 
                  src={radioStatus.now_playing.song.art} 
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
              <Music className="h-20 w-20 lg:h-24 lg:w-24 text-[#d62828] hidden" />
            </div>
          )}

        </div>

        <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4 lg:space-y-6 w-full max-w-xs px-4">
          
          <button
            onClick={togglePlay}
            disabled={isLoading || !radioStatus?.is_online}
            className={`
              w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-white font-semibold text-lg
              transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
              shadow-2xl shadow-[#d62828]/30
              ${isPlaying 
                ? 'bg-gradient-to-r from-[#d62828] to-[#b61e1e] hover:from-[#b61e1e] hover:to-[#a01818]' 
                : 'bg-gradient-to-r from-[#d62828] to-[#b61e1e] hover:from-[#b61e1e] hover:to-[#a01818]'
              }
            `}
          >
            {isLoading ? (
              <div className="w-5 h-5 lg:w-6 lg:h-6 border-2 lg:border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <Pause className="h-5 w-5 lg:h-6 lg:w-6" />
            ) : (
              <Play className="h-5 w-5 lg:h-6 lg:w-6 ml-1" />
            )}
          </button>

          <div className="flex items-center justify-center space-x-3 w-full max-w-xs">
            <button
              onClick={toggleMute}
              className="p-2 text-[#f0f0f0] hover:text-[#d62828] transition-colors rounded-full hover:bg-[#d62828]/10 flex-shrink-0"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <div className="flex items-center space-x-2 flex-1">
              <span className="text-xs text-[#f0f0f0]/60 min-w-[1rem] text-center">0</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-[#333] rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-xs text-[#f0f0f0]/60 min-w-[1.5rem] text-center">100</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 w-full">
              <p className="text-red-400 text-sm font-medium text-center">{error}</p>
            </div>
          )}

          {isLoading && !error && (
            <p className="text-sm text-[#d62828] font-medium text-center">Se încarcă stream-ul...</p>
          )}

        </div>

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
              <h3 className="text-xl font-bold text-[#f0f0f0]">{radioStatus?.station?.name || 'MuzicaMea Radio'}</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${radioStatus?.is_online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm text-[#f0f0f0]/70">
                  {radioStatus?.is_online ? 'Live' : 'Offline'}
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

        {radioStatus?.now_playing && (
          <div className="bg-[#0D0D0D]/50 rounded-lg p-4 mb-6 border border-[#d62828]/20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#d62828]/20 rounded-lg flex items-center justify-center overflow-hidden">
                {radioStatus.now_playing?.song?.art ? (
                  <Image 
                    src={radioStatus.now_playing.song.art} 
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
                  {radioStatus.now_playing?.song?.artist ? `${radioStatus.now_playing.song.artist} - ` : ''}
                  {radioStatus.now_playing?.song?.title || 'Muzică în curs...'}
                </h4>
                <p className="text-sm text-[#f0f0f0]/60">
                  {Math.floor(localElapsed / 60)}:{String(localElapsed % 60).padStart(2, '0')} / 
                  {Math.floor((radioStatus.now_playing?.duration || 0) / 60)}:{String(Math.floor(radioStatus.now_playing?.duration || 0) % 60).padStart(2, '0')}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={togglePlay}
            disabled={isLoading || !radioStatus?.is_online}
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