let songs = [];
let currentSongIndex = 0;

const audio = document.getElementById('audio');
const songName = document.getElementById('song-name');
const artistName = document.getElementById('artist-name');
const songDuration = document.getElementById('song-duration');
const albumArt = document.getElementById('album-art');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const volumeSlider = document.getElementById('volume');

async function fetchSongs() {
    const response = await fetch('songs.json');
    songs = await response.json();
    loadSong(currentSongIndex);
}

function loadSong(songIndex) {
    const song = songs[songIndex];
    songName.textContent = song.name;
    artistName.textContent = song.artist;
    songDuration.textContent = `Durada: ${song.duration}`;
    albumArt.src = song.img;
    audio.src = song.path;
    audio.volume = volumeSlider.value;
}

function playPauseSong() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'play_arrow';
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.pause();
    playPauseButton.textContent = 'play_arrow';
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.pause();
    playPauseButton.textContent = 'play_arrow';
}

playPauseButton.addEventListener('click', playPauseSong);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// Carrega les cançons quan la pàgina estigui llesta
window.addEventListener('DOMContentLoaded', fetchSongs);
