// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var musicList = [{
    "src": "http://music.163.com/song/media/outer/url?id=28949444.mp3",
    "title": "喜欢你",
    "auther": "邓紫棋",
    "img": "http://p1.music.126.net/iZ12K9e6Ry6z82yKCzYu4A==/109951167325809355.jpg?param=130y1300"
}, {
    "src": "http://music.163.com/song/media/outer/url?id=441491828.mp3",
    "title": "水星记",
    "auther": "郭顶",
    "img": "http://p1.music.126.net/4bbnee1CMWOceU34Oulvrg==/109951163093593499.jpg"
}, {
    "src": "http://music.163.com/song/media/outer/url?id=1313107594.mp3",
    "title": "倒数Live",
    "auther": "邓紫棋",
    "img": "https://p1.music.126.net/-KITGdgldiYFnuN_uk5t7w==/109951164441895314.jpg?param=200y200"
}];

var $ = function $(selector) {
    return document.querySelector(selector);
};

var $playingBtn = $('.player .icon-playing');
var $preBtn = $('.player .icon-player-left');
var $nextBtn = $('.player .icon-player-right');
var $title = $('.player .text h3');
var $auther = $('.player .text p');
var $time = $('.player .time');
var $current = $('.player .current');

var index = 0;
var clock = null;
var audioObject = new Audio();
audioObject.autoplay = false;
setMusic();

function setMusic() {
    // loadMusic
    var currentMusic = musicList[index];
    currentMusic = musicList[index];
    console.log(currentMusic);
    audioObject.src = currentMusic.src;
    $auther.innerText = currentMusic.auther;
    $title.innerText = currentMusic.title;
    audioObject.play();
}

function TimeToText(second) {
    second = Number.parseInt(second);
    var min = Number.parseInt(second / 60);
    var sec = second % 60; // 分钟
    sec = sec < 10 ? '0' + sec : sec + ''; // 得到秒数
    return min + ':' + sec;
}

$playingBtn.onclick = function (e) {
    if ($playingBtn.classList.contains('icon-playing')) {
        this.classList.remove('icon-playing');
        this.classList.add('icon-pause');
        audioObject.play();
        clock = setInterval(function () {
            var curTime = audioObject.currentTime;
            var totalTime = audioObject.duration;
            var percent = curTime / totalTime;
            $current.style.width = percent * 100 + '%';

            $time.innerText = TimeToText(curTime) + ' / ' + TimeToText(totalTime);
        }, 1000);
    } else {
        this.classList.remove('icon-pause');
        this.classList.add('icon-playing');
        audioObject.pause();
        clearInterval(clock);
    }
};

$preBtn.onclick = function (e) {
    index -= 1;
    index = (index + musicList.length) % musicList.length; // 循环播放
    setMusic();
};

$nextBtn.onclick = function (e) {
    index += 1;
    index = index % musicList.length; // 循环播放
    setMusic();
};

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
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.2050b881.map