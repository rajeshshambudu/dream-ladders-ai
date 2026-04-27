let lang = "en";
let step = 0;
let data = {};

const chatbox = document.getElementById("chatbox");

const q = {
en:[
"Welcome 👷 What is your city?",
"What is built-up area in sq ft?",
"How many floors?",
"Material type? standard / premium",
"Need interior also? yes / no"
],
te:[
"స్వాగతం 👷 మీ నగరం ఏది?",
"ఇంటి విస్తీర్ణం ఎంత sq ft?",
"ఎన్ని అంతస్తులు?",
"మెటీరియల్ టైప్? standard / premium",
"ఇంటీరియర్ కావాలా? yes / no"
]
};

function setLang(l){
lang = l;
chatbox.innerHTML="";
step=0;
ask();
}

function add(text,type){
let div=document.createElement("div");
div.className=type;
div.innerText=text;
chatbox.appendChild(div);
chatbox.scrollTop=chatbox.scrollHeight;
}

function ask(){
add(q[lang][step],"bot");
}

function nextStep(){

let input=document.getElementById("userInput");
let val=input.value.trim();

if(!val) return;

add(val,"user");

if(step===0) data.city=val;
if(step===1) data.area=parseFloat(val);
if(step===2) data.floors=parseInt(val);
if(step===3) data.material=val.toLowerCase();
if(step===4) data.interior=val.toLowerCase();

input.value="";
step++;

if(step < q[lang].length){
ask();
}else{
result();
}
}

function result(){

let rate = 1900;

if(data.city.toLowerCase().includes("hyderabad")) rate=2200;
if(data.material==="premium") rate += 400;

let totalArea = data.area * data.floors;
let total = totalArea * rate;

if(data.interior==="yes") total += totalArea * 350;

let cement = Math.round(totalArea * 0.45);
let steel = Math.round(totalArea * 4);

add(
`🏠 Total Area: ${totalArea} sq ft

💰 Estimated Cost: ₹${total.toLocaleString()}

🧱 Cement Bags: ${cement}

🔩 Steel: ${steel} kg

📞 Click below for detailed quote`,
"bot");

let phone="919999999999";
let msg=`Hello Dream Ladders, I need detailed estimate for ${totalArea} sq ft in ${data.city}`;
window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,"_blank");
}
