class AudioManager {
  private static instance: AudioManager;
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<(isPlaying: boolean, isLoading: boolean) => void> = new Set();
  private isPlaying = false;
  private isLoading = false;
  private volume = 0.7;
  private isMuted = false;
  private isInitialized = false;
  private activePlayerCount = 0;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private initAudio() {
    if (this.audio) return;

    const streamUrl = process.env.NEXT_PUBLIC_RADIO_STREAM_URL;
    if (!streamUrl) return;

    this.audio = new Audio(streamUrl);
    this.audio.volume = this.volume;
    this.audio.preload = 'none';

    this.audio.addEventListener('canplay', () => {
      if (this.isInitialized) {
        this.setIsLoading(false);
      }
    });

    this.audio.addEventListener('waiting', () => {
      if (this.isInitialized) {
        this.setIsLoading(true);
      }
    });

    this.audio.addEventListener('playing', () => {
      this.setIsLoading(false);
      this.setIsPlaying(true);
      this.isInitialized = true;
    });

    this.audio.addEventListener('pause', () => {
      this.setIsPlaying(false);
      this.setIsLoading(false);
    });

    this.audio.addEventListener('error', () => {
      this.setIsLoading(false);
      this.setIsPlaying(false);
    });

    this.isPlaying = false;
    this.isLoading = false;
  }

  private setIsPlaying(playing: boolean) {
    this.isPlaying = playing;
    this.notifyListeners();
  }

  private setIsLoading(loading: boolean) {
    this.isLoading = loading;
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.isPlaying, this.isLoading));
  }

  subscribe(listener: (isPlaying: boolean, isLoading: boolean) => void) {
    this.listeners.add(listener);
    this.activePlayerCount++;
    
    listener(this.isPlaying, this.isLoading);
    
    return () => {
      this.listeners.delete(listener);
      this.activePlayerCount--;
      
      if (this.activePlayerCount === 0 && this.isPlaying && this.audio) {
        this.audio.pause();
      }
    };
  }

  async togglePlay(): Promise<void> {
    if (!this.audio) {
      this.initAudio();
      if (!this.audio) return;
    }

    this.isInitialized = true;

    try {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.setIsLoading(true);
        await this.audio.play();
      }
    } catch (error) {
      console.error('Eroare la redarea audio:', error);
      this.setIsLoading(false);
      this.setIsPlaying(false);
    }
  }

  setVolume(volume: number) {
    this.volume = volume;
    if (this.audio) {
      this.audio.volume = volume;
    }
    this.isMuted = volume === 0;
  }

  toggleMute() {
    if (this.isMuted) {
      this.setVolume(0.7);
    } else {
      this.setVolume(0);
    }
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      isLoading: this.isLoading,
      volume: this.volume,
      isMuted: this.isMuted
    };
  }

  getVolume() {
    return this.volume;
  }

  getIsMuted() {
    return this.isMuted;
  }
}

export default AudioManager;
