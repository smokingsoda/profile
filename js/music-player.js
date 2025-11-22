// Music Player functionality
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const floatingPlayer = document.getElementById('floating-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const closePlayerBtn = document.getElementById('close-player');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playerTitle = document.getElementById('player-title');
    const playerAlbum = document.getElementById('player-album');
    const playerCover = document.getElementById('player-cover');
    const minimizeBtn = document.getElementById('minimize-btn');
    const expandBtn = document.getElementById('expand-btn');
    const playerFull = document.querySelector('.player-full');
    const playerMini = document.querySelector('.player-mini');
    const playerCoverMini = document.getElementById('player-cover-mini');
    const playerTitleMini = document.getElementById('player-title-mini');
    const playPauseMini = document.getElementById('play-pause-mini');

    let playlist = [];
    let currentTrackIndex = 0;

    // Default playlist (always available)
    const defaultPlaylist = [
        {
            src: 'music/三个时间的坐标/01 - 春之流.wav',
            title: '春之流',
            album: '三个时间的坐标',
            cover: 'music/三个时间的坐标/407E76AB-74EC-4032-962B-8CF2C4480B67_1_105_c.jpeg'
        },
        {
            src: 'music/三个时间的坐标/02 - 夏之蓝.wav',
            title: '夏之蓝',
            album: '三个时间的坐标',
            cover: 'music/三个时间的坐标/407E76AB-74EC-4032-962B-8CF2C4480B67_1_105_c.jpeg'
        },
        {
            src: 'music/三个时间的坐标/03 - 冬之云.wav',
            title: '冬之云',
            album: '三个时间的坐标',
            cover: 'music/三个时间的坐标/407E76AB-74EC-4032-962B-8CF2C4480B67_1_105_c.jpeg'
        }
    ];

    // Initialize playlist from track elements or use default
    function initPlaylist() {
        const tracks = document.querySelectorAll('.track');
        if (tracks.length > 0) {
            playlist = Array.from(tracks).map(track => ({
                src: track.dataset.src,
                title: track.dataset.title,
                album: track.dataset.album,
                cover: 'music/三个时间的坐标/407E76AB-74EC-4032-962B-8CF2C4480B67_1_105_c.jpeg'
            }));
        } else {
            playlist = defaultPlaylist;
        }
    }

    // Load track
    function loadTrack(index) {
        if (playlist.length === 0) return;
        
        const track = playlist[index];
        audioPlayer.src = track.src;
        playerTitle.textContent = track.title;
        playerAlbum.textContent = track.album;
        playerCover.src = track.cover;
        
        // Update mini player
        if (playerTitleMini) playerTitleMini.textContent = track.title;
        if (playerCoverMini) playerCoverMini.src = track.cover;
        
        // Update active track in tracklist
        document.querySelectorAll('.track').forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }

    // Play track
    function playTrack() {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸';
        if (playPauseMini) playPauseMini.textContent = '⏸';
        floatingPlayer.classList.remove('hidden');
    }

    // Pause track
    function pauseTrack() {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶';
        if (playPauseMini) playPauseMini.textContent = '▶';
    }

    // Minimize player
    function minimizePlayer() {
        if (playerFull && playerMini) {
            playerFull.classList.add('hidden');
            playerMini.classList.remove('hidden');
        }
    }

    // Expand player
    function expandPlayer() {
        if (playerFull && playerMini) {
            playerFull.classList.remove('hidden');
            playerMini.classList.add('hidden');
        }
    }

    // Toggle play/pause
    function togglePlayPause() {
        if (audioPlayer.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    }

    // Previous track
    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    }

    // Next track
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    }

    // Format time
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Update progress bar
    function updateProgress() {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progress;
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
            durationEl.textContent = formatTime(audioPlayer.duration);
        }
    }

    // Seek audio
    function seekAudio(e) {
        if (audioPlayer.duration) {
            const seekTime = (e.target.value / 100) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
        }
    }

    // Event Listeners
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevTrack);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextTrack);
    }

    if (closePlayerBtn) {
        closePlayerBtn.addEventListener('click', () => {
            pauseTrack();
            floatingPlayer.classList.add('hidden');
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', minimizePlayer);
    }

    if (expandBtn) {
        expandBtn.addEventListener('click', expandPlayer);
    }

    if (playPauseMini) {
        playPauseMini.addEventListener('click', togglePlayPause);
    }

    // Click mini player to expand
    if (playerMini) {
        playerMini.addEventListener('click', (e) => {
            // Don't expand if clicking on play button
            if (e.target === playPauseMini || e.target === expandBtn) return;
            expandPlayer();
        });
    }

    if (progressBar) {
        progressBar.addEventListener('input', seekAudio);
    }

    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', nextTrack);
        audioPlayer.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audioPlayer.duration);
        });
    }

    // Track play buttons
    document.querySelectorAll('.track-play-btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentTrackIndex === index && !audioPlayer.paused) {
                pauseTrack();
            } else {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                playTrack();
            }
        });
    });

    // Track click to play
    document.querySelectorAll('.track').forEach((track, index) => {
        track.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playTrack();
        });
    });

    // Initialize
    initPlaylist();
    if (playlist.length > 0) {
        loadTrack(0);
    }

    // Expose function for external use (SPA)
    window.playTrackByIndex = function(index) {
        if (index >= 0 && index < playlist.length) {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playTrack();
        }
    };

    // Store player state in sessionStorage (on any state change)
    function savePlayerState() {
        if (playlist.length > 0) {
            sessionStorage.setItem('musicPlayerState', JSON.stringify({
                currentTrack: currentTrackIndex,
                currentTime: audioPlayer.currentTime,
                isPlaying: !audioPlayer.paused,
                playerVisible: !floatingPlayer.classList.contains('hidden')
            }));
        }
    }

    // Save state periodically and on key events
    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', () => {
            if (audioPlayer.currentTime % 5 < 0.5) { // Save every 5 seconds
                savePlayerState();
            }
        });
        audioPlayer.addEventListener('play', savePlayerState);
        audioPlayer.addEventListener('pause', savePlayerState);
    }

    window.addEventListener('beforeunload', savePlayerState);

    // Restore player state if exists
    const savedState = sessionStorage.getItem('musicPlayerState');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            currentTrackIndex = state.currentTrack || 0;
            loadTrack(currentTrackIndex);
            
            if (state.currentTime) {
                audioPlayer.currentTime = state.currentTime;
            }
            
            if (state.playerVisible) {
                floatingPlayer.classList.remove('hidden');
            }
            
            if (state.isPlaying) {
                // Auto-play might be blocked, so we just show the player
                audioPlayer.play().catch(() => {
                    // Auto-play was blocked, just show the player UI
                    floatingPlayer.classList.remove('hidden');
                });
            }
        } catch (e) {
            console.error('Failed to restore player state:', e);
        }
    }
});

