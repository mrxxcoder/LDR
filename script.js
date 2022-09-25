const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration'); 
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const showVolume = document.querySelector("#show-volume");
const volumeIcon = document.querySelector("#volume-icon");
const currentVolume = document.querySelector("#volume");

// Music 

const songs = [
    {
        name:'1',
        displayName : 'California'
    },
    {
        name:'2',
        displayName : 'Cinnamon Girl'
    },
    {
        name:'3',
        displayName : 'Dark Paradise'
    },
    {
        name:'4',
        displayName : 'Blue Jeans'
    },
    {
        name:'5',
        displayName : 'Born To Die'
    },
    {
        name:'6',
        displayName : 'Brooklyn Baby'
    },
    {
        name:'7',
        displayName : 'Summertime Sadness'
    },
    {
        name:'8',
        displayName : 'Video Games'
    },
    {
        name:'9',
        displayName : 'Love Song'
    },
    {
        name:'10',
        displayName : 'National Anthem'
    },
    {
        name:'11',
        displayName : 'Burning Desire'
    },
    {
        name:'12',
        displayName : 'Money Power Glory'
    },
    {
        name:'13',
        displayName : 'White Mustang'
    },
    {
        name:'14',
        displayName : 'Cherry'
    },
    {
        name:'15',
        displayName : 'Doin Time'
    },
    {
        name:'16',
        displayName : 'Ride'
    },
    {
        name:'17',
        displayName : 'The Blackest Day'
    },
    {
        name:'18',
        displayName : 'Diet Mountain Dew'
    },
    {
        name:'19',
        displayName : 'In My Feelings'
    },
    {
        name:'20',
        displayName : 'Young And Beautiful'
    },
];
let isPlaying = false;



// Play

const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or pause Event Listeners 

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Update DOM

const loadSong = (song) => {
    title.textContent = song.displayName;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// currentSong 

let songIndex = 0;

// Previous song

const prevSong = () => {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// next song

const nextSong = () => {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Mute Sound
function muteSound() {
    music.volume = 0;
    showVolume.innerHTML = 0;
    currentVolume.value = 0;
}

  // Change Volume
function changeVolume() {
    showVolume.value = currentVolume.value;
    music.volume = currentVolume.value / 100;
}

// On Load - Select First Song

// Update progress bar & time

const updateProgressBar = (e) => {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // Update prog Bar Width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration element to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set Progress Bar 
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const{duration} = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
volumeIcon.addEventListener("click", muteSound);
currentVolume.addEventListener("change", changeVolume);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

