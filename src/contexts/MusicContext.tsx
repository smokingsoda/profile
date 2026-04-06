import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

export interface Track {
  src: string;
  title: string;
  titleKey: string; // i18n key
  album: string;
  albumKey: string;
  cover: string;
}

const DEFAULT_PLAYLIST: Track[] = [
  {
    src: 'music/三个时间的坐标/01 - 春之流.wav',
    title: '春之流',
    titleKey: 'track1',
    album: '三个时间的坐标',
    albumKey: 'album-title',
    cover: 'music/三个时间的坐标/407E76AB-74EC-4032-962B-8CF2C4480B67_1_105_c.jpeg',
  },
  {
    src: 'music/三个时间的坐标/02 - 夏之蓝.wav',
    title: '夏之蓝',
    titleKey: 'track2',
    album: '三个时间的坐标',
    albumKey: 'album-title',
    cover: 'music/三个时间的坐标/407E76AB-74EC-4032-962B-8CF2C4480B67_1_105_c.jpeg',
  },
  {
    src: 'music/三个时间的坐标/03 - 冬之云.wav',
    title: '冬之云',
    titleKey: 'track3',
    album: '三个时间的坐标',
    albumKey: 'album-title',
    cover: 'music/三个时间的坐标/407E76AB-74EC-4032-962B-8CF2C4480B67_1_105_c.jpeg',
  },
];

interface MusicContextValue {
  playlist: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  playerVisible: boolean;
  isMini: boolean;
  currentTime: number;
  duration: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playTrackByIndex: (index: number) => void;
  togglePlayPause: () => void;
  prevTrack: () => void;
  nextTrack: () => void;
  seekTo: (value: number) => void;
  minimize: () => void;
  expand: () => void;
  closePlayer: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [isMini, setIsMini] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playlist = DEFAULT_PLAYLIST;

  // Load a track into the audio element
  const loadTrack = useCallback((index: number) => {
    const audio = audioRef.current;
    if (!audio || !playlist[index]) return;
    audio.src = playlist[index].src;
  }, [playlist]);

  // Play
  const doPlay = useCallback(() => {
    audioRef.current?.play().then(() => {
      setIsPlaying(true);
      setPlayerVisible(true);
    }).catch(() => {
      setPlayerVisible(true);
    });
  }, []);

  // Pause
  const doPause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const playTrackByIndex = useCallback((index: number) => {
    if (index < 0 || index >= playlist.length) return;
    setCurrentTrackIndex(index);
    loadTrack(index);
    // play in next tick after src is set
    setTimeout(() => doPlay(), 0);
  }, [playlist.length, loadTrack, doPlay]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      doPause();
    } else {
      if (!audioRef.current?.src) {
        loadTrack(currentTrackIndex);
        setTimeout(() => doPlay(), 0);
      } else {
        doPlay();
      }
    }
  }, [isPlaying, doPause, doPlay, loadTrack, currentTrackIndex]);

  const prevTrack = useCallback(() => {
    const newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrackByIndex(newIndex);
  }, [currentTrackIndex, playlist.length, playTrackByIndex]);

  const nextTrack = useCallback(() => {
    const newIndex = (currentTrackIndex + 1) % playlist.length;
    playTrackByIndex(newIndex);
  }, [currentTrackIndex, playlist.length, playTrackByIndex]);

  const seekTo = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (value / 100) * audio.duration;
  }, []);

  const minimize = useCallback(() => setIsMini(true), []);
  const expand = useCallback(() => setIsMini(false), []);
  const closePlayer = useCallback(() => {
    doPause();
    setPlayerVisible(false);
  }, [doPause]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => nextTrack();
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [nextTrack]);

  // sessionStorage save/restore
  useEffect(() => {
    const saved = sessionStorage.getItem('musicPlayerState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        const idx = state.currentTrack ?? 0;
        setCurrentTrackIndex(idx);
        loadTrack(idx);

        if (state.playerVisible) setPlayerVisible(true);

        if (state.currentTime && audioRef.current) {
          audioRef.current.currentTime = state.currentTime;
        }

        if (state.isPlaying) {
          setTimeout(() => doPlay(), 300);
        }
      } catch {
        // ignore
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save state periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        sessionStorage.setItem('musicPlayerState', JSON.stringify({
          currentTrack: currentTrackIndex,
          currentTime: audioRef.current.currentTime,
          isPlaying,
          playerVisible,
        }));
      }
    }, 5000);

    const onUnload = () => {
      if (audioRef.current) {
        sessionStorage.setItem('musicPlayerState', JSON.stringify({
          currentTrack: currentTrackIndex,
          currentTime: audioRef.current.currentTime,
          isPlaying,
          playerVisible,
        }));
      }
    };

    window.addEventListener('beforeunload', onUnload);
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [currentTrackIndex, isPlaying, playerVisible]);

  // Initialize first track on mount
  useEffect(() => {
    loadTrack(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MusicContext.Provider
      value={{
        playlist,
        currentTrackIndex,
        isPlaying,
        playerVisible,
        isMini,
        currentTime,
        duration,
        audioRef,
        playTrackByIndex,
        togglePlayPause,
        prevTrack,
        nextTrack,
        seekTo,
        minimize,
        expand,
        closePlayer,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}
