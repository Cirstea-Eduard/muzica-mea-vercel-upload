'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Upload, Music, Image as ImageIcon, AlertCircle, Home, Mail } from 'lucide-react';
import Link from 'next/link';

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

interface ArtistData {
  artistName: string;
  songTitle: string;
  email: string;
  phone: string;
  description: string;
  package: string;
  hasImage: boolean;
}

function ArtistSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [loading, setLoading] = useState(true);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadResults, setUploadResults] = useState<{
    music?: UploadResult;
    image?: UploadResult;
  }>({});

  useEffect(() => {
    if (sessionId) {
      fetchSessionData(sessionId);
    }
  }, [sessionId]);

  const fetchSessionData = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
      const data = await response.json();
      
      if (data.success) {
        setArtistData(data.artistData);
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!musicFile || !artistData) return;

    setUploading(true);
    const results: { music?: UploadResult; image?: UploadResult } = {};

    try {
      const musicFormData = new FormData();
      musicFormData.append('file', musicFile);
      musicFormData.append('type', 'music');
      musicFormData.append('artistName', artistData.artistName);
      musicFormData.append('songTitle', artistData.songTitle);

      const musicResponse = await fetch('/api/upload-to-cloudinary', {
        method: 'POST',
        body: musicFormData,
      });

      const musicResult = await musicResponse.json();
      results.music = musicResult;

      if (imageFile && artistData.hasImage) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        imageFormData.append('type', 'image');
        imageFormData.append('artistName', artistData.artistName);

        const imageResponse = await fetch('/api/upload-to-cloudinary', {
          method: 'POST',
          body: imageFormData,
        });

        const imageResult = await imageResponse.json();
        results.image = imageResult;
      }

      setUploadResults(results);

      if (results.music?.success || results.image?.success) {
        await fetch('/api/update-artist-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: artistData.email,
            linkPiesa: results.music?.success ? results.music.url : '',
            imagine: results.image?.success ? results.image.url : '/logo.png'
          }),
        });
      }

      await fetch('/api/send-artist-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistData,
          uploadResults: results,
        }),
      });

      setUploadComplete(true);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#d62828] mx-auto mb-4"></div>
          <p className="text-xl">Se verifică plata...</p>
        </div>
      </div>
    );
  }

  if (!artistData) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Eroare la verificarea plății</h1>
          <Link href="/" className="text-[#d62828] hover:underline">
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] mb-4">
            Plata <span className="text-green-500">realizată cu succes!</span>
          </h1>
          <p className="text-xl text-[#f0f0f0]/80 mb-6">
            Mulțumim, {artistData.artistName}! Acum să încărcăm fișierele tale.
          </p>
        </div>

        {!uploadComplete ? (
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#d62828]/30 mb-8">
            <h2 className="text-2xl font-bold text-[#d62828] mb-6 flex items-center">
              <Upload className="mr-2 h-6 w-6" />
              Încarcă fișierele
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-[#f0f0f0] mb-3 flex items-center">
                  <Music className="mr-2 h-5 w-5 text-[#d62828]" />
                  Muzica &quot;{artistData.songTitle}&quot; (obligatoriu)
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#d62828]/30 rounded-lg focus:ring-2 focus:ring-[#d62828] text-[#f0f0f0]"
                />
                {musicFile && (
                  <p className="text-green-400 text-sm mt-2">
                    ✓ Fișier selectat: {musicFile.name}
                  </p>
                )}
              </div>

              {artistData.hasImage && (
                <div>
                  <label className="block text-lg font-semibold text-[#f0f0f0] mb-3 flex items-center">
                    <ImageIcon className="mr-2 h-5 w-5 text-[#d62828]" />
                    Imagine artist (opțional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#d62828]/30 rounded-lg focus:ring-2 focus:ring-[#d62828] text-[#f0f0f0]"
                  />
                  {imageFile && (
                    <p className="text-green-400 text-sm mt-2">
                      ✓ Fișier selectat: {imageFile.name}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={handleFileUpload}
                disabled={!musicFile || uploading}
                className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center ${
                  !musicFile || uploading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-[#d62828] hover:bg-[#b61e1e] hover:transform hover:scale-105'
                } text-white`}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Se încarcă fișierele...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Încarcă fișierele
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#d62828]/30 mb-8">
            <h2 className="text-2xl font-bold text-green-500 mb-6 flex items-center">
              <CheckCircle className="mr-2 h-6 w-6" />
              Încărcare completă!
            </h2>

            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${
                uploadResults.music?.success 
                  ? 'bg-green-600/20 border-green-600/30' 
                  : 'bg-red-600/20 border-red-600/30'
              }`}>
                <div className="flex items-center">
                  <Music className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Muzică:</span>
                  <span className={`ml-2 ${
                    uploadResults.music?.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {uploadResults.music?.success ? 'Încărcată cu succes!' : 'Eroare la încărcare'}
                  </span>
                </div>
              </div>

              {artistData.hasImage && uploadResults.image && (
                <div className={`p-4 rounded-lg border ${
                  uploadResults.image.success 
                    ? 'bg-green-600/20 border-green-600/30' 
                    : 'bg-red-600/20 border-red-600/30'
                }`}>
                  <div className="flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Imagine:</span>
                    <span className={`ml-2 ${
                      uploadResults.image.success ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {uploadResults.image.success ? 'Încărcată cu succes!' : 'Eroare la încărcare'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
              <div className="flex items-center text-blue-300">
                <Mail className="h-5 w-5 mr-2" />
                <p>Un email cu toate detaliile a fost trimis către echipa noastră!</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#d62828]/30 mb-8">
          <h3 className="text-xl font-bold text-[#d62828] mb-4">Detaliile înregistrării</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Artist:</strong> {artistData.artistName}</p>
              <p><strong>Piesă:</strong> {artistData.songTitle}</p>
              <p><strong>Email:</strong> {artistData.email}</p>
            </div>
            <div>
              <p><strong>Telefon:</strong> {artistData.phone}</p>
              <p><strong>Pachet:</strong> {artistData.package.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center bg-[#d62828] hover:bg-[#b61e1e] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105"
          >
            <Home className="h-5 w-5 mr-2" />
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ArtistSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0D0D0D] text-[#f0f0f0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d62828] mx-auto mb-4"></div>
          <p className="text-lg">Se încarcă...</p>
        </div>
      </div>
    }>
      <ArtistSuccessContent />
    </Suspense>
  );
}
