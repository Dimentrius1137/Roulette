const snow = document.querySelector('.snow');
let switcher = document.querySelector('.nav-item');
let flag = true;

function SpawnSnowflakes()
{
    let particle = document.createElement("div");

    particle.style.left = Math.floor(Math.random() * 100) + "%";
    particle.classList.add("falling")
    snow.appendChild(particle);
    setTimeout(()=>{particle.remove()}, 15000)
}

let vkl;
function start()
{
    vkl = setInterval(SpawnSnowflakes, 300);
}
start();

switcher.addEventListener('click', () => {
    flag = !flag;
    switcher.innerHTML = "Effects: ON";
    if(!flag)
    {
        switcher.innerHTML = "Effects: OFF";
        clearInterval(vkl)
    }
    else{
        
        start();

    }
    console.log(flag)
})
