let musicList = [
    {
        "src": "http://music.163.com/song/media/outer/url?id=28949444.mp3",
        "title": "喜欢你",
        "auther": "邓紫棋",
        "img": "http://p1.music.126.net/iZ12K9e6Ry6z82yKCzYu4A==/109951167325809355.jpg?param=130y1300"
    },
    {
        "src":  "http://music.163.com/song/media/outer/url?id=441491828.mp3",
        "title": "水星记",
        "auther": "郭顶",
        "img": "http://p1.music.126.net/4bbnee1CMWOceU34Oulvrg==/109951163093593499.jpg"
    },
    {
        "src":  "http://music.163.com/song/media/outer/url?id=1313107594.mp3",
        "title": "倒数Live",
        "auther": "邓紫棋",
        "img": "https://p1.music.126.net/-KITGdgldiYFnuN_uk5t7w==/109951164441895314.jpg?param=200y200"
    }
]


const $ = (selector) => document.querySelector(selector)

const $playingBtn = $('.player .icon-playing')
const $preBtn = $('.player .icon-player-left')
const $nextBtn = $('.player .icon-player-right')
const $title = $('.player .text h3')
const $auther = $('.player .text p')
const $time = $('.player .time')
const $current  = $('.player .current')

let index = 0
let clock = null
let audioObject = new Audio()
audioObject.autoplay = false
setMusic()


function setMusic(){
    // loadMusic
    let currentMusic = musicList[index]
    currentMusic = musicList[index]
    console.log(currentMusic)
    audioObject.src = currentMusic.src
    $auther.innerText = currentMusic.auther
    $title.innerText = currentMusic.title
    audioObject.play()
}

function TimeToText(second){
    second = Number.parseInt(second)
    let min = Number.parseInt(second/60)
    let sec = second%60     // 分钟
    sec = sec < 10 ? '0' + sec : sec+'' // 得到秒数
    return min+ ':' +sec
}



$playingBtn.onclick = function (e) {
    if ($playingBtn.classList.contains('icon-playing')) {
        this.classList.remove('icon-playing')
        this.classList.add('icon-pause')
        audioObject.play()
        clock = setInterval(()=>{
            let curTime = audioObject.currentTime
            let totalTime = audioObject.duration
            let percent = curTime/totalTime
            $current.style.width = percent*100 + '%'

            $time.innerText = TimeToText(curTime)  + ' / '  + TimeToText(totalTime)


        },1000)
    } else {
        this.classList.remove('icon-pause')
        this.classList.add('icon-playing')
        audioObject.pause()
        clearInterval(clock)
    }
}

$preBtn.onclick = (e)=> {
    index -=1
    index = (index+musicList.length) % musicList.length // 循环播放
   setMusic()
}

$nextBtn.onclick = (e)=> {
    index +=1
    index = index % musicList.length // 循环播放
   setMusic()
}














/*
let a = 1
let $playingBtn = document.querySelector('.icon-playing')
let $$btns = document.querySelectorAll('.iconfont')
let $nextBtn = document.querySelector('.icon-player-right')



// console.log($playingBtn.classList.contains('icon-pause'));
// $playingBtn.classList.remove('icon-playing')
// $playingBtn.classList.add('icon-pause')
let audioObject = new Audio('http://m701.music.126.net/20230630124436/627263a0e5ccd633648e90b6a3eeb5c2/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/22259960319/efe5/11de/7f21/74fb6084c59dc7c850ce8b53edc931c9.mp3')
// 爱情转移

$playingBtn.onclick = function (e) {
    if ($playingBtn.classList.contains('icon-playing')) {
        $playingBtn.classList.remove('icon-playing')
        $playingBtn.classList.add('icon-pause')
        audioObject.play()
        console.log(audioObject.duration)
        console.log(audioObject.currentTime)
    } else {
        $playingBtn.classList.remove('icon-pause')
        $playingBtn.classList.add('icon-playing')
        audioObject.pause()
    }
}

$nextBtn.onclick = ()=>{
    audioObject.src = "http://m801.music.126.net/20230630124758/9acd5d2aa34cc0e321b9d6aebeab6805/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/15230975977/6904/8af9/94d4/14d2a10eae6effe1057aee140f53b0bc.mp3"
    audioObject.play()
}


 */
