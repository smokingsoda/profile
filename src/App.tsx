import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { MusicProvider } from './contexts/MusicContext';
import { LightboxProvider } from './contexts/LightboxContext';
import Nav from './components/Nav/Nav';
import Lightbox from './components/Lightbox/Lightbox';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Home from './pages/Home/Home';
import Poetry from './pages/Poetry/Poetry';
import Music from './pages/Music/Music';

export default function App() {
  return (
    <LanguageProvider>
      <LightboxProvider>
        <MusicProvider>
          <HashRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/poetry" element={<Poetry />} />
              <Route path="/music" element={<Music />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <MusicPlayer />
            <Lightbox />
          </HashRouter>
        </MusicProvider>
      </LightboxProvider>
    </LanguageProvider>
  );
}
