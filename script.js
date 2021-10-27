const videoPlayer = document.querySelector('.video-player')
const video = document.querySelector('.video')
const videoLineTotal = document.querySelector('.video-line-total')
const rightProgVideoLine = document.querySelector('.right-prog-video-line')
const playPauseBtn = document.getElementById('play-pause')
const volumeUp = document.getElementById('volume-up')
const volumeRange = document.querySelector('.volume-range')
const volumeRangeLine = document.getElementById('volume-range-line')
const rightTime = document.querySelector('.right-time')
const totalTime = document.querySelector('.total-time')
const select = document.querySelector('.select');
const fullscreenBtn = document.querySelector('.fullscreen')

// fullscreen
//input from https://www.w3schools.com/howto/howto_js_fullscreen.asp
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    videoPlayer.classList.add('video-fullscreen')
  }

function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    videoPlayer.classList.remove('video-fullscreen');
  }

function fullscreen() {
    if (!videoPlayer.classList.contains('video-fullscreen')) {
        openFullscreen(videoPlayer)
    } else {
        closeFullscreen()
    }
}

document.addEventListener('keydown', function (e) {
    if  (e.key === 'Escape' && videoPlayer.classList.contains('video-fullscreen')) {
        closeFullscreen()
        videoPlayer.classList.remove('video-fullscreen')
    }
})

fullscreenBtn.addEventListener('click', fullscreen)

// speed of video
function changeSpeed() {
    video.playbackRate = select.value
}
select.addEventListener('change', changeSpeed)

// volume
let lastVol = 1

function changeVol(e) {
    let volume = e.offsetX / volumeRange.offsetWidth
    if (volume < 0.1) {
        volume = 0
        volumeUp.classList.replace('fa-volume-up','fa-volume-mute')
    } else {
        volumeUp.classList.replace('fa-volume-mute','fa-volume-up')
    }
    if (volume > 0.9) {
        volume = 1
    }
    volumeRangeLine.style.width = `${volume * 100}%`
    video.volume = volume
    lastVol = volume
}

volumeRange.addEventListener('click', changeVol)

// volume mute
function muteUnmute() {
    if (video.volume === 0 && lastVol === 0) {
    } else if (video.volume) {
        lastVol = video.volume;
        video.volume = 0;
        volumeRangeLine.style.width = 0;
        volumeUp.classList.replace('fa-volume-up','fa-volume-mute')
    } else {
        video.volume = lastVol;
        volumeRangeLine.style.width = `${lastVol * 100}%`;
        volumeUp.classList.replace('fa-volume-mute','fa-volume-up')
    }
}

volumeUp.addEventListener('click', muteUnmute)

// click progress video line
function videoProgress(e) {
    const newTime = e.offsetX / videoLineTotal.offsetWidth
    rightProgVideoLine.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration
}

videoLineTotal.addEventListener('click', videoProgress)

// time
function timeProgressCalc(time) {
    const minutes = Math.floor(time/60)
    let seconds = Math.floor(time%60)
    if (seconds > 9) {
        seconds = seconds
    } else {
        seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`
}

// video progress line
function videoProgressTime() {
    rightProgVideoLine.style.width = `${(video.currentTime / video.duration) * 100}%` 
    rightTime.textContent = `${timeProgressCalc(video.currentTime)} /`
    totalTime.textContent = `${timeProgressCalc(video.duration)}`
}

video.addEventListener('timeupdate', videoProgressTime)
video.addEventListener('canplay', videoProgressTime)

// play and pause video
function playPause() {
    if (video.paused) {
        video.play()
        playPauseBtn.classList.replace('fa-play','fa-pause')
    } else {
        video.pause()
        playPauseBtn.classList.replace('fa-pause', 'fa-play')
    }
}

playPauseBtn.addEventListener('click', playPause)
video.addEventListener('click', playPause)
video.addEventListener('ended', () => {
    playPauseBtn.classList.replace('fa-pause', 'fa-play')
})