export class MusicPlayer {
    constructor(options = {}) {
        this.options = {
            audioSelector: '#background-music',
            toggleSelector: '#music-toggle',
            muteSelector: '#mute-toggle',
            volumeSelector: '#volume-slider',
            defaultVolume: 0.5,
            ...options
        };

        this.audio = document.querySelector(this.options.audioSelector);
        this.toggleBtn = document.querySelector(this.options.toggleSelector);
        this.muteBtn = document.querySelector(this.options.muteSelector);
        this.volumeSlider = document.querySelector(this.options.volumeSelector);

        this.isPlaying = false;
        this.isMuted = false;
        this.lastVolume = this.options.defaultVolume;
    }

    init() {
        if (!this.audio || !this.toggleBtn || !this.muteBtn || !this.volumeSlider) {
            console.error('Music player elements not found');
            return;
        }

        this.audio.volume = this.options.defaultVolume;
        this.volumeSlider.value = this.options.defaultVolume * 100;

        this.addEventListeners();
        return this;
    }

    addEventListeners() {
        // Play/Pause
        this.toggleBtn.addEventListener('click', () => this.togglePlay());

        // Mute/Unmute
        this.muteBtn.addEventListener('click', () => this.toggleMute());

        // Volume Control
        this.volumeSlider.addEventListener('input', (e) => this.handleVolumeChange(e));

        // Audio state changes
        this.audio.addEventListener('play', () => this.updatePlayState(true));
        this.audio.addEventListener('pause', () => this.updatePlayState(false));
        this.audio.addEventListener('ended', () => this.handleEnded());
        this.audio.addEventListener('error', (e) => this.handleError(e));
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(e => this.handleError(e));
        }
    }

    toggleMute() {
        if (this.isMuted) {
            this.audio.volume = this.lastVolume;
            this.muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.volumeSlider.value = this.lastVolume * 100;
        } else {
            this.lastVolume = this.audio.volume;
            this.audio.volume = 0;
            this.muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            this.volumeSlider.value = 0;
        }
        this.isMuted = !this.isMuted;
    }

    handleVolumeChange(event) {
        const volume = event.target.value / 100;
        this.audio.volume = volume;
        this.lastVolume = volume;
        
        this.updateVolumeIcon(volume);
    }

    updateVolumeIcon(volume) {
        if (volume === 0) {
            this.muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            this.isMuted = true;
        } else {
            this.muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.isMuted = false;
        }
    }

    updatePlayState(playing) {
        this.isPlaying = playing;
        this.toggleBtn.innerHTML = playing ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
        this.toggleBtn.classList.toggle('playing', playing);
    }

    handleEnded() {
        this.updatePlayState(false);
        // Auto-replay if needed
        if (this.options.autoReplay) {
            this.audio.play().catch(e => this.handleError(e));
        }
    }

    handleError(error) {
        console.error('Music player error:', error);
        this.updatePlayState(false);
    }

    destroy() {
        this.audio.pause();
        this.audio.currentTime = 0;
        // Remove event listeners if needed
    }
}

export function initMusicPlayer() {
  // Add music player HTML to body
  let player = document.querySelector('.music-player');
  if (!player) {
    player = document.createElement('div');
    player.className = 'music-player';
    player.innerHTML = `
      <audio id="background-music" loop>
        <source src="./music/africanqueen.mp3" type="audio/mp3">
      </audio>
      <div class="music-controls">
        <button id="music-toggle" aria-label="Play/Pause"><i class="fas fa-play"></i></button>
        <div class="volume-control">
          <button id="mute-toggle" aria-label="Mute/Unmute"><i class="fas fa-volume-up"></i></button>
          <input type="range" id="volume-slider" min="0" max="100" value="50">
        </div>
      </div>
    `;
    document.body.appendChild(player);
  }
  const music = document.getElementById('background-music');
  const musicToggle = document.getElementById('music-toggle');
  const muteToggle = document.getElementById('mute-toggle');
  const volumeSlider = document.getElementById('volume-slider');
  let isPlaying = false;
  let isMuted = false;
  let lastVolume = 0.5;
  // Initialize volume
  music.volume = volumeSlider.value / 100;
  // Play/Pause
  musicToggle.onclick = () => {
    if (isPlaying) {
      music.pause();
      musicToggle.innerHTML = '<i class="fas fa-play"></i>';
      musicToggle.classList.remove('playing');
    } else {
      music.play();
      musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
      musicToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
  };
  // Mute/Unmute
  muteToggle.onclick = () => {
    if (isMuted) {
      music.volume = lastVolume;
      muteToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
      volumeSlider.value = lastVolume * 100;
    } else {
      lastVolume = music.volume;
      music.volume = 0;
      muteToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
      volumeSlider.value = 0;
    }
    isMuted = !isMuted;
  };
  // Volume Control
  volumeSlider.oninput = (e) => {
    const volume = e.target.value / 100;
    music.volume = volume;
    lastVolume = volume;
    if (volume === 0) {
      muteToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
      isMuted = true;
    } else {
      muteToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
      isMuted = false;
    }
  };
  // Try to autoplay (may be blocked by browser)
  setTimeout(() => {
    music.play().then(() => {
      isPlaying = true;
      musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
      musicToggle.classList.add('playing');
    }).catch(() => {});
  }, 500);
} 