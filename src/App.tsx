import React, { useState } from 'react';
import { Download, Music, Youtube, FolderOpen, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Navbar from './components/Navbar';

interface DownloadStatus {
  status: 'idle' | 'downloading' | 'success' | 'error';
  message: string;
}

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>({
    status: 'idle',
    message: ''
  });

  const validateYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleDownload = async () => {
    if (!videoUrl.trim()) {
      setDownloadStatus({
        status: 'error',
        message: 'Lütfen bir YouTube video URL\'si girin!'
      });
      return;
    }

    if (!validateYouTubeUrl(videoUrl)) {
      setDownloadStatus({
        status: 'error',
        message: 'Geçerli bir YouTube URL\'si girin!'
      });
      return;
    }

    setDownloadStatus({
      status: 'downloading',
      message: 'Video indiriliyor...'
    });

    // Simulated download process (in real implementation, this would call a backend API)
    setTimeout(() => {
      setDownloadStatus({
        status: 'success',
        message: 'Video başarıyla MP3 olarak indirildi!'
      });
    }, 3000);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVideoUrl(e.target.value);
    if (downloadStatus.status !== 'idle') {
      setDownloadStatus({ status: 'idle', message: '' });
    }
  };

  const getStatusIcon = () => {
    switch (downloadStatus.status) {
      case 'downloading':
        return <Loader className="w-5 h-5 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (downloadStatus.status) {
      case 'downloading':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Video İndirici
            </h1>
            <p className="text-gray-600 text-lg">
              YouTube videolarını MP3 formatında indirin
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              {/* URL Input */}
              <div>
                <label htmlFor="videoUrl" className="block text-sm font-semibold text-gray-700 mb-3">
                  YouTube Video URL'si
                </label>
                <div className="relative">
                  <textarea
                    id="videoUrl"
                    value={videoUrl}
                    onChange={handleUrlChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-0 resize-none transition-colors duration-200"
                    rows={4}
                    disabled={downloadStatus.status === 'downloading'}
                  />
                  <div className="absolute top-3 right-3">
                    <Youtube className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={downloadStatus.status === 'downloading'}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                {downloadStatus.status === 'downloading' ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>İndiriliyor...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>MP3 Olarak İndir</span>
                  </>
                )}
              </button>

              {/* Status Message */}
              {downloadStatus.message && (
                <div className={`flex items-center space-x-2 p-4 rounded-xl ${
                  downloadStatus.status === 'success' ? 'bg-green-50 border border-green-200' :
                  downloadStatus.status === 'error' ? 'bg-red-50 border border-red-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  {getStatusIcon()}
                  <span className={`font-medium ${getStatusColor()}`}>
                    {downloadStatus.message}
                  </span>
                </div>
              )}

              {/* Features */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Özellikler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">Yüksek kalite MP3</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Download className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Hızlı indirme</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Music className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700">Sadece ses dosyası</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <FolderOpen className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-gray-700">Kolay erişim</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500">
            <p className="text-sm">
              Telif hakkı korumalı içerikleri indirmeden önce gerekli izinleri aldığınızdan emin olun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;