import { useMusic } from '../../contexts/MusicContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Music.module.css';

export default function Music() {
  const { playTrackByIndex, currentTrackIndex, isPlaying } = useMusic();
  const { t } = useLanguage();

  const tracks = [
    { key: 'track1', number: '01' },
    { key: 'track2', number: '02' },
    { key: 'track3', number: '03' },
  ];

  return (
    <>
      <section className={styles['music-section']}>
        <div className="container">
          <div className={styles.album}>
            <div className={styles['album-cover']}>
              <img
                src="music/三个时间的坐标/407E76AB-74EC-4032-962B-8CF2C4480B67_1_105_c.jpeg"
                alt={t('album-title')}
              />
            </div>
            <div className={styles['album-info']}>
              <h2 className={styles['album-title']}>{t('album-title')}</h2>
              <div className={styles['album-tracklist']}>
                {tracks.map((track, index) => {
                  const active = currentTrackIndex === index;
                  return (
                    <div
                      key={track.key}
                      className={`${styles.track}${active ? ' ' + styles.active : ''}`}
                      onClick={() => playTrackByIndex(index)}
                    >
                      <span className={styles['track-number']}>{track.number}</span>
                      <span className={styles['track-title']}>{t(track.key)}</span>
                      <button
                        className={styles['track-play-btn']}
                        onClick={(e) => {
                          e.stopPropagation();
                          playTrackByIndex(index);
                        }}
                      >
                        {active && isPlaying ? '⏸' : '▶'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <p>{t('footer')}</p>
      </footer>
    </>
  );
}
