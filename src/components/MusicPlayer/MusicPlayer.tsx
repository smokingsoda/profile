
import { useMusic } from '../../contexts/MusicContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './MusicPlayer.module.css';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const {
    playlist,
    currentTrackIndex,
    isPlaying,
    playerVisible,
    isMini,
    currentTime,
    duration,
    audioRef,
    togglePlayPause,
    prevTrack,
    nextTrack,
    seekTo,
    minimize,
    expand,
    closePlayer,
  } = useMusic();
  const { t } = useLanguage();

  const track = playlist[currentTrackIndex];

  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0;

  const trackTitle = track ? t(track.titleKey) : '未播放';
  const trackAlbum = track ? t(track.albumKey) : '---';
  const trackCover = track?.cover ?? '';

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Floating player */}
      <div
        className={`${styles['floating-player']} ${!playerVisible ? styles['floating-player-hidden'] : ''}`}
      >
        {/* Full player */}
        {!isMini && (
          <div className={styles['player-full']}>
            <div className={styles['player-header']}>
              <button className={styles['minimize-btn']} onClick={minimize} title="最小化">
                −
              </button>
              <button className={styles['close-player-btn']} onClick={closePlayer} title="关闭">
                ✕
              </button>
            </div>

            <div className={styles['player-info']}>
              <img className={styles['player-cover']} src={trackCover} alt="" />
              <div className={styles['player-text']}>
                <div className={styles['player-title']}>{trackTitle}</div>
                <div className={styles['player-album']}>{trackAlbum}</div>
              </div>
            </div>

            <div className={styles['player-controls']}>
              <button className={styles['control-btn']} onClick={prevTrack}>⏮</button>
              <button
                className={`${styles['control-btn']} ${styles['control-btn-play']}`}
                onClick={togglePlayPause}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button className={styles['control-btn']} onClick={nextTrack}>⏭</button>
            </div>

            <div className={styles['player-progress']}>
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                className={styles['progress-bar']}
                min={0}
                max={100}
                value={progressValue}
                onChange={(e) => seekTo(Number(e.target.value))}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}

        {/* Mini player */}
        {isMini && (
          <div
            className={styles['player-mini']}
            onClick={(e) => {
              // Don't expand if clicking on play or expand button
              const target = e.target as HTMLElement;
              if (
                target.classList.contains(styles['control-btn-mini']) ||
                target.classList.contains(styles['expand-btn'])
              )
                return;
              expand();
            }}
          >
            <img className={styles['player-cover-mini']} src={trackCover} alt="" />
            <div className={styles['player-mini-info']}>
              <div className={styles['player-title-mini']}>{trackTitle}</div>
            </div>
            <button
              className={styles['control-btn-mini']}
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              className={styles['expand-btn']}
              onClick={(e) => {
                e.stopPropagation();
                expand();
              }}
              title="展开"
            >
              ▲
            </button>
          </div>
        )}
      </div>
    </>
  );
}
