let bird = document.querySelector('.bird');
let sound = true;
const soundMems = new Audio();
soundMems.volume = 0.5;
const mems = {
    0: 'sounds/1.mp3',
    2: 'sounds/2.mp3',
    3: 'sounds/3.mp3',
    4: 'sounds/4.mp3',
    5: 'sounds/5.mp3',
    6: 'sounds/6.mp3',
    7: 'sounds/7.mp3',
    8: 'sounds/8.mp3',
    9: 'sounds/9.mp3',
    10: 'sounds/10.mp3',
    11: 'sounds/11.mp3',

  }

  function getRandom(num)
  { 
    console.log(Math.floor(Math.random() * Math.floor(num)))
    return Math.floor(Math.random() * Math.floor(num));
    
  }
  

  
function playMems() {
    soundMems.src = mems[`${getRandom(11)}`];
    if (sound) {
      soundMems.play();
    }
  }
  bird.addEventListener('click', playMems);