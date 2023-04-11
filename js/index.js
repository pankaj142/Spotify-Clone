console.log("spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio(`/assets/audio/${songIndex+1}.mp3`);
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let playingGif = document.getElementById("playingGif");
let songItems = Array.from( document.getElementsByClassName("songItem"))
let songPlay = Array.from(document.getElementsByClassName("songPlay"));
let masterSongName = document.getElementById("masterSongName");

//songs info
let songs = [
    {
      songName: "Waala song",
      filePath: "assets/audio/1.mp3",
      coverPath: "/assets/images/covers/1.jpg",
      duration: 90
    },
    {
      songName: "eaque rerum! song",
      filePath: "assets/audio/2.mp3",
      coverPath: "/assets/images/covers/2.jpg",
      duration: 101
    },
    {
      songName: "harum nesciunt song",
      filePath: "assets/audio/3.mp3",
      coverPath: "/assets/images/covers/3.jpg",
      duration: 70
    },
    {
      songName: "error repudiandae song",
      filePath: "assets/audio/4.mp3",
      coverPath: "/assets/images/covers/4.jpg",
      duration: 72
    },
    {
      songName: "harum maxime song",
      filePath: "assets/audio/5.mp3",
      coverPath: "/assets/images/covers/5.jpg",
      duration: 72
    },
    {
      songName: "quas vel sint song",
      filePath: "assets/audio/6.mp3",
      coverPath: "/assets/images/covers/6.jpg",
      duration: 107
    },
    {
      songName: "dolor sit amet song",
      filePath: "assets/audio/1.mp3",
      coverPath: "/assets/images/covers/7.jpg",
      duration: 90
    },
    {
      songName: "odit fugiat iusto song",
      filePath: "assets/audio/2.mp3",
      coverPath: "/assets/images/covers/8.jpg",
      duration: 101
    },
    {
      songName: "sit sunt quaerat song",
      filePath: "assets/audio/3.mp3",
      coverPath: "/assets/images/covers/9.jpg",
      duration: 70
    },
  ];

const getDuration = (duration) =>{
    return parseInt(duration/60) + ":" + duration%60;
}

songItems.forEach((element, index)=>{
    element.getElementsByTagName("img")[0].src = songs[index].coverPath
    element.getElementsByClassName("songName")[0].textContent = songs[index].songName;
    element.getElementsByClassName("timestamp")[0].textContent = getDuration(songs[index].duration)
    element.getElementsByClassName("songPlay")[0].setAttribute("id", index+1)
})


// Handle play/pause click
masterPlay.addEventListener("click", (e) => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    //audio is paused OR audio is not started

    // play audio
    audioElement.play();

    // change master play icon to pause
    changeButtonIcon("masterPlay", "pause")

    // show playing gif
    playingGif.style.opacity = 1;
  } else {
    // audio is playing

    // pause audio
    audioElement.pause();

    // change master play icon to play
    changeButtonIcon("masterPlay", "play")

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

  // change master play icon to play
  changeButtonIcon("masterPlay", "play")
  
  // hide playing gif
  playingGif.style.opacity = 0;
});


// make all song item icon play
const makeAllPlay = () =>{
    songPlay.forEach((element, index)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

// Handle each song play /pause click 
songPlay.forEach((element, index)=>{
    element.addEventListener("click", (e)=>{
        songIndex = e.target.id
        console.log("songIndex",songIndex)
        // console.log("e.target.classList",e.target.classList)
        if(e.target.classList.contains("fa-circle-play")){ // song item is not playing
            console.log("song is not playing",audioElement.src)
            // console.log("audioElement",audioElement.src.split('/audio/')[1].split('.'))
            //make all songs icon play
            makeAllPlay();

            playAudioElement(songIndex)

            // master song name updated
            updateMasterSongName(songIndex);

            // change song icon from play to pause
            changeButtonIcon("songPlay", "pause", e)

            // change master play icon to pause
            changeButtonIcon("masterPlay", "pause")

        }else{ // song item is playing
            console.log("song is playing")

            audioElement.pause();

            // change song icon from pause to play
            changeButtonIcon("songPlay", "play", e)
            
            // change master play icon to play
            changeButtonIcon("masterPlay", "play")
        }
    })
})

// handle master previous button click
document.getElementById("previous").addEventListener("click", (e)=>{
    if(songIndex >1){
        songIndex--;
    }else{
        songIndex = 9
    }
    
    playAudioElement(songIndex)

    // master song name updated
    updateMasterSongName(songIndex);

    // change master play icon to pause
    changeButtonIcon("masterPlay", "pause")

    console.log("previous", songIndex)
})

// handle master next button click
document.getElementById("next").addEventListener("click", (e)=>{
    if(songIndex <9){
        songIndex++;
    }else{
        songIndex = 1;
    }

    playAudioElement(songIndex)

    // master song name updated
    updateMasterSongName(songIndex);

    // change master play icon to pause
    changeButtonIcon("masterPlay", "pause")
})

let updateMasterSongName = (songIndex) =>{
    masterSongName.innerText = songs[songIndex -1].songName;
}

let playAudioElement = (songIndex) =>{
    audioElement.src = `/assets/audio/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
}

let changeButtonIcon = (button, type, songElement) =>{
    console.log("changeButtonIcon",button, type)
    if(button === "masterPlay"){
        console.log("changeButtonIcon in masterPlay")
        if(type === "play"){ // make icon as play
            console.log("changeButtonIcon in masterPlay in type as play")

            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        }else if(type === "pause"){ //make icon as pause
            console.log("changeButtonIcon in masterPlay in type as pause")

            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        }
    }else if(button === "songPlay"){ //indivisual song play button
        if(songElement){
            if(type === "play"){ // change song element icon from pause to play
                songElement.target.classList.remove("fa-circle-pause");
                songElement.target.classList.add("fa-circle-play");
            }else if(type === "pause"){ // change song element icon from play to pause
                songElement.target.classList.remove("fa-circle-play");
                songElement.target.classList.add("fa-circle-pause");
            }
        }
    }

}