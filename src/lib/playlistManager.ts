interface Track {
  id: number;
  title: string;
  artist: string;
  timestamp: string;
  time: string;
}

class PlaylistManager {
  private tracks: Track[] = [];
  private listeners: Array<(tracks: Track[]) => void> = [];
  private trackIdCounter = 1;

  constructor() {
    this.startMockUpdates();
  }

  addTrack(title: string, artist: string): void {
    const now = new Date();
    const newTrack: Track = {
      id: this.trackIdCounter++,
      title,
      artist,
      timestamp: now.toISOString(),
      time: now.toLocaleTimeString('ro-RO', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    this.tracks.unshift(newTrack);

    if (this.tracks.length > 10) {
      this.tracks = this.tracks.slice(0, 10);
    }

    this.notifyListeners();
  }

  subscribe(callback: (tracks: Track[]) => void): () => void {
    this.listeners.push(callback);
    
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  getTracks(): Track[] {
    return [...this.tracks];
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback([...this.tracks]));
  }

  private startMockUpdates(): void {
    const mockSongs = [
      { title: "Plânge Chitara", artist: "Gheorghe Zamfir" },
      { title: "Dragostea Din Tei", artist: "O-Zone" },
      { title: "Numa Numa", artist: "Dan Balan" },
      { title: "Ma Ya Hi", artist: "O-Zone" },
      { title: "Căluțul", artist: "Gica Petrescu" },
      { title: "Ciobănașul", artist: "Maria Tănase" },
      { title: "Hora din Moldova", artist: "Rapsozii Moldovei" },
      { title: "Balada", artist: "Cargo" },
      { title: "Floare de Colț", artist: "Phoenix" },
      { title: "Pe-o Margine de Lume", artist: "Voltaj" },
      { title: "Mirabela", artist: "Vunk" },
      { title: "Apa", artist: "Carla's Dreams" },
      { title: "Luna mi-a zâmbit", artist: "O-Zone" },
      { title: "Să nu-mi iei niciodată dragostea", artist: "Corina" },
      { title: "Doar ea", artist: "Smiley" },
    ];

    let songIndex = 0;

    setTimeout(() => {
      const song = mockSongs[songIndex % mockSongs.length];
      this.addTrack(song.title, song.artist);
      songIndex++;
    }, 1000);

    setInterval(() => {
      const song = mockSongs[songIndex % mockSongs.length];
      this.addTrack(song.title, song.artist);
      songIndex++;
    }, 30000); 
  }
}


export const playlistManager = new PlaylistManager();
export type { Track }; 