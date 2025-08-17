// JavaScript Music Player Logic

// Create audio object
const audio = new Audio('./assets/Woh Kisna Hai - Kisna 320 Kbps.mp3');  // Replace 'sample.mp3' with your actual file name
let lastVolume = 0.5;
// Get DOM elements
const playBtn = document.getElementById('playBtn');
const progressBar = document.querySelector('.progress-bar');
const currTime = document.querySelectorAll('.curr-time')[0];
const totalTime = document.querySelectorAll('.curr-time')[1];
const volumeBar = document.querySelector('.volume-bar');
const volumeIcon = document.getElementById('volumeIcon');

let isPlaying = false;

// Format seconds to MM:SS
function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
}

// Play or pause the audio
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.src = './assets/player_icon3.png'; // Play icon
    } else {
        audio.play();
        playBtn.src = './assets/video-pause-button-Photoroom.png'; // Pause icon you added
    }
    isPlaying = !isPlaying;
}
function toggleMute() {
    if (isMuted) {
        audio.volume = lastVolume;
        volumeBar.value = lastVolume * 100;
    } else {
        lastVolume = audio.volume;
        audio.volume = 0;
        volumeBar.value = 0;
    }
}

function updateVolumeIcon() {
    if (isMuted || audio.volume === 0) {
        volumeIcon.classList.remove('fa-volume-high', 'fa-volume-low');
        volumeIcon.classList.add('fa-volume-xmark');
    } else if (audio.volume < 0.5) {
        volumeIcon.classList.remove('fa-volume-high', 'fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-low');
    } else {
        volumeIcon.classList.remove('fa-volume-low', 'fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-high');
    }
}

// Update progress bar and current time
audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currTime.textContent = formatTime(audio.currentTime);
    totalTime.textContent = formatTime(audio.duration);
});

// Seek when user interacts with progress bar
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Update total duration after metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    totalTime.textContent = formatTime(audio.duration);
});



// Button click event
playBtn.addEventListener('click', togglePlay);

volumeBar.addEventListener('input', () => { audio.volume = volumeBar.value / 100; });
audio.addEventListener('volumechange', () => { isMuted = audio.volume === 0; updateVolumeIcon(); });
volumeIcon.addEventListener('click', toggleMute);

// Gemini Modal Listeners
aiPlaylistBtn.addEventListener('click', () => openModal(aiPlaylistModal));
closeAiPlaylistModal.addEventListener('click', () => closeModal(aiPlaylistModal));
generatePlaylistBtn.addEventListener('click', generatePlaylist);

songInfoBtn.addEventListener('click', getSongInfo);
closeSongInfoModal.addEventListener('click', () => closeModal(songInfoModal));

// --- Initial Setup ---
audio.volume = 0.5;
volumeBar.value = 50;
updateVolumeIcon();
