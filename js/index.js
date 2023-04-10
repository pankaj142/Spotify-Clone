console.log("spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio("/assets/audio/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let playingGif = document.getElementById("playingGif");

let songs = [
  {
    songName: "Waala song",
    filePath: "assets/audio/1.mp3",
    coverPath: "assets/images/covers/1.mp3",
  },
  {
    songName: "eaque rerum! song",
    filePath: "assets/audio/2.mp3",
    coverPath: "assets/images/covers/2.mp3",
  },
  {
    songName: "harum nesciunt song",
    filePath: "assets/audio/3.mp3",
    coverPath: "assets/images/covers/3.mp3",
  },
  {
    songName: "error repudiandae song",
    filePath: "assets/audio/4.mp3",
    coverPath: "assets/images/covers/4.mp3",
  },
  {
    songName: "harum maxime song",
    filePath: "assets/audio/5.mp3",
    coverPath: "assets/images/covers/5.mp3",
  },
  {
    songName: "quas vel sint song",
    filePath: "assets/audio/6.mp3",
    coverPath: "assets/images/covers/6.mp3",
  },
  {
    songName: "dolor sit amet song",
    filePath: "assets/audio/7.mp3",
    coverPath: "assets/images/covers/7.mp3",
  },
  {
    songName: "odit fugiat iusto song",
    filePath: "assets/audio/8.mp3",
    coverPath: "assets/images/covers/8.mp3",
  },
  {
    songName: "sit sunt quaerat song",
    filePath: "assets/audio/9.mp3",
    coverPath: "assets/images/covers/9.mp3",
  },
  {
    songName: "maxime adipisci song",
    filePath: "assets/audio/10.mp3",
    coverPath: "assets/images/covers/10.mp3",
  },
];

// Handle play/pause click
masterPlay.addEventListener("click", (e) => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    //audio is paused OR audio is not started

    // play audio
    audioElement.play();

    // change play icon to pause
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

    // show playing gif
    playingGif.style.opacity = 1;
  } else {
    // audio is playing

    // pause audio
    audioElement.pause();

    // change pause icon to play
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");

    // hide playing gif
    playingGif.style.opacity = 0;
  }
});

// Listen to Audio Progress and accordingly update the myProgressBar
audioElement.addEventListener("timeupdate", () => {
  let progress =
    (parseInt(audioElement.currentTime) / parseInt(audioElement.duration)) *
    100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * parseInt(audioElement.duration)) / 100;
});

// handle song end
audioElement.addEventListener("ended", () => {
  console.log("song end");

  // change pause icon to play
  masterPlay.classList.remove("fa-circle-pause");
  masterPlay.classList.add("fa-circle-play");

  // hide playing gif
  playingGif.style.opacity = 0;
});

