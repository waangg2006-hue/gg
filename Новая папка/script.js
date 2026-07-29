// ======================
// NOVA TAP
// SCRIPT.JS (Часть 1)
// ======================

let coins = 0;

let clickPower = 1;

let energy = 100;

let maxEnergy = 100;

let autoIncome = 0;

// ----------------------
// Цены
// ----------------------

let powerPrice = 50;

let autoPrice = 200;

let energyPrice = 150;

// ----------------------
// Элементы
// ----------------------

const coin = document.getElementById("coin");

const coinsText = document.getElementById("coins");

const powerText = document.getElementById("power");

const incomeText = document.getElementById("income");

const energyText = document.getElementById("energy");

const energyFill = document.getElementById("energyFill");

const powerBtn = document.getElementById("powerUpgrade");

const autoBtn = document.getElementById("autoUpgrade");

const energyBtn = document.getElementById("energyUpgrade");

// ----------------------
// Обновление интерфейса
// ----------------------

function updateUI(){

coinsText.textContent = Math.floor(coins);

powerText.textContent = clickPower;

incomeText.textContent = autoIncome;

energyText.textContent = Math.floor(energy);

energyFill.style.width =
(energy/maxEnergy*100)+"%";

document.getElementById("powerPrice").textContent = powerPrice;

document.getElementById("autoPrice").textContent = autoPrice;

document.getElementById("energyPrice").textContent = energyPrice;

}

// ----------------------
// Тап
// ----------------------

coin.onclick = function(){

if(energy < clickPower) return;

energy -= clickPower;

coins += clickPower;

updateUI();

spawnText("+"+clickPower);

coin.style.transform="scale(.9)";

setTimeout(()=>{

coin.style.transform="scale(1)";

},100);

}

// ----------------------
// Восстановление энергии
// ----------------------

setInterval(()=>{

energy += 1;

if(energy>maxEnergy){

energy=maxEnergy;

}

updateUI();

},100);

// ----------------------
// Автодоход
// ----------------------

setInterval(()=>{

coins += autoIncome;

updateUI();

},1000);

// ----------------------
// Всплывающий текст
// ----------------------

function spawnText(text){

const div=document.createElement("div");

div.className="floatText";

div.innerHTML=text;

const rect=coin.getBoundingClientRect();

div.style.left=
(rect.left+rect.width/2)+"px";

div.style.top=
(rect.top+40)+"px";

document.body.appendChild(div);

setTimeout(()=>{

div.remove();

},800);

}

updateUI();
// ======================
// Магазин улучшений
// ======================

// Улучшить силу клика
powerBtn.onclick = function () {

    if (coins < powerPrice) return;

    coins -= powerPrice;

    clickPower++;

    powerPrice = Math.floor(powerPrice * 1.6);

    updateUI();

};

// Купить автокликер
autoBtn.onclick = function () {

    if (coins < autoPrice) return;

    coins -= autoPrice;

    autoIncome++;

    autoPrice = Math.floor(autoPrice * 1.8);

    updateUI();

};

// Улучшить энергию
energyBtn.onclick = function () {

    if (coins < energyPrice) return;

    coins -= energyPrice;

    maxEnergy += 50;

    energy = maxEnergy;

    energyPrice = Math.floor(energyPrice * 1.7);

    updateUI();

};

// ======================
// Сохранение
// ======================

function saveGame(){

const data={

coins,
clickPower,
autoIncome,

energy,
maxEnergy,

powerPrice,
autoPrice,
energyPrice

};

localStorage.setItem(

"novaTap",

JSON.stringify(data)

);

}

function loadGame(){

const data=

JSON.parse(

localStorage.getItem("novaTap")

);

if(!data) return;

coins=data.coins;

clickPower=data.clickPower;

autoIncome=data.autoIncome;

energy=data.energy;

maxEnergy=data.maxEnergy;

powerPrice=data.powerPrice;

autoPrice=data.autoPrice;

energyPrice=data.energyPrice;

updateUI();

}

loadGame();

// ======================
// Автосохранение
// ======================

setInterval(saveGame,2000);

// ======================
// Горячие клавиши
// ======================

document.addEventListener("keydown",e=>{

if(e.code==="Space"){

e.preventDefault();

coin.click();

}

});

// ======================
// Эффект сияния монеты
// ======================

setInterval(()=>{

coin.animate([

{
transform:"scale(1)"
},

{
transform:"scale(1.06)"
},

{
transform:"scale(1)"
}

],{

duration:800

});

},2500);

// ======================
// Случайный бонус
// ======================

setInterval(()=>{

if(Math.random()<0.15){

const bonus=Math.floor(clickPower*20);

coins+=bonus;

spawnText("🎁 +" + bonus);

updateUI();

}

},30000);