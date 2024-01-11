const roulette = document.querySelector('.roulette');
const open = document.querySelector('.open');
const modalWindow = document.querySelector('.modalWindow');
const gift = document.querySelector('.open-item');
const continueButton = document.querySelector('button');
const spinning = document.querySelector('.spin');
const addBtn = document.querySelector('.add');
const addUniqueBtn = document.querySelector('.uniqueItem');
const removeBtn = document.querySelector('.removeR');
const createBtn = document.querySelector('.createR');
const input = document.querySelector('input');
const createMenu = document.querySelector('.create');
const hideArrow = document.querySelector('.switch');
let items = document.querySelectorAll('.item');

let elements = [];
let sum = 0;

hideArrow.addEventListener('click', (event) => { 
    createMenu.classList.toggle('hide'); 
    event.target.classList.toggle('switch-move');
})
function ClearRoulette()
{
    roulette.innerHTML = "";
    if (localStorage.getItem('lastArr')) 
    {   
        localStorage.removeItem('lastArr')
    }
}
function AddNewItem()
{
    elements.push(`<li class="item">${input.value}</li>`);
}
function addUniqueItem()
{
    elements.push(`<li class="item" style="border-bottom: 5px solid red;">${input.value}</li>`);
}
addBtn.addEventListener('click', () => { AddNewItem() });

addUniqueBtn.addEventListener('click', () => { addUniqueItem() });

function SaveData()
{
	localStorage.setItem('lastArr', elements)
}

if (localStorage.getItem('lastArr')) 
{
	let lastArrayState = localStorage.getItem('lastArr');
	lastArrayState.split(",").forEach(el => {
        elements.push(el);
    })
    Init()
}

function FillArr()
{
    sum = 0;
    roulette.innerHTML = "";
    elements.forEach((item) =>{ 
        
        roulette.innerHTML += item;
        sum+= 100;
    })
    roulette.innerHTML += '<div class="arrow"></div>'
    
} 

createBtn.onclick = Init;

function Init()
{

    FillArr();
    RouletteState(elements.length);
    items = document.querySelectorAll('.item');
    Otstup(items);
}

function Otstup(array)
{
    
    let otstup = 0; 
    array.forEach((item) => {
        item.style.left = otstup + "px";
        otstup += 100;
    })

}


function RemoveElement(counter){
    open.innerHTML = "Последнее открытие: ";
    open.innerHTML += items[counter].innerHTML;
    document.querySelector('.text').innerHTML = items[counter].innerHTML;
        elements.splice(counter, 1);
        roulette.innerHTML = "";
        FillArr();
        items = document.querySelectorAll('.item');
        Otstup(items)
        RouletteState(elements.length);
        SaveData()
}

function RouletteState(itemsLength)
{
    if(window.innerWidth <= 720)
    {
        roulette.style.width = 90 + "%";
    }
    else if(itemsLength > 7)
    {
        roulette.style.width = 700 + "px"
    }
    else
    {
        roulette.style.width = (sum - 100) + "px";
    }

    if(itemsLength < 5)
    {
        roulette.style.width = 300 + "px"
    }
    if(itemsLength < 4)
    {
        roulette.style.width = 200 + "px"
    }
    if(itemsLength < 3)
    {
        roulette.style.width = 100 + "px"
    }
}

let speed = 10;
let min = 5;
let max = 12;
let time = 0;
let RAW;
function Scroll()
{
    spinning.disabled = true;
    for(let i = 0; i < items.length; i++)
    {
       
        items[i].style.left = `${parseInt(items[i].style.left) + speed}px`;
        if(parseInt(items[i].style.left) > (sum-100))
        {
            items[i].style.left = -90 + "px" 

        }
    }
    RAW = requestAnimationFrame(Scroll);
    
}


function ModalWindowState()
{

    modalWindow.classList.toggle("open-state-for-parent");
    gift.classList.toggle("open-state-for-child");
}



function Stop()
{
    cancelAnimationFrame(RAW);
    let inertiaInterval = setInterval(Inertia, 50);
    setTimeout(function(){
    clearInterval(inertiaInterval, 1000);
    }, 500);
    setTimeout(function(){
        
        console.log("stop");
        let arrow = document.querySelector('.arrow');
        for(let i = 0; i < items.length; i++)
        {
            let itemLeft = items[i].getBoundingClientRect().left;
            let itemRight = items[i].getBoundingClientRect().right;
            let arrowLeft = arrow.getBoundingClientRect().left;
            let arrowRight = arrow.getBoundingClientRect().right;
    
            if (itemLeft < arrowLeft && itemRight > arrowRight) 
            {
                items[i].classList.add("fade-out");
                
                setTimeout(() => {ModalWindowState(); RemoveElement(i)}, 2000);
                
            }
        }
    }, 1000)
    spinning.disabled = false;
    
}

function Inertia()
{
    items = document.querySelectorAll('.item');
    items.forEach((el) => {
        el.style.left = `${parseInt(el.style.left) - 1}px`;
        if(parseInt(el.style.left) < -100)
        {
            el.style.left = (sum + 100) + "px" 

        }
    })
}

spinning.addEventListener('click', () => {
    time = Math.floor(Math.random() * (max - min) + min);
    if(elements.length > 0)
    {
        Scroll();
        setTimeout(Stop, time * 1000);
        SaveData()
    }
    else
    {
        open.innerHTML = "Нужно больше вариантов";  
        open.style.color = "red";
        setTimeout(()=>{ open.innerHTML = "Последнее открытие: ", open.style.color = "white";}, 2000);
    }

})

