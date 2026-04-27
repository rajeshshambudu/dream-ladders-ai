let step = 0;
let data = {};

const questions = [
"Welcome to Dream Ladders AI 👷‍♂️ What is your location?",
"What is built-up area in sq ft?",
"How many floors?",
"Material type? (standard/premium)",
"Labour type? (normal/contract)"
];

const chatbox = document.getElementById("chatbox");

function addMessage(text,type){
let div=document.createElement("div");
div.className=type;
div.innerText=text;
chatbox.appendChild(div);
chatbox.scrollTop=chatbox.scrollHeight;
}

function askQuestion(){
if(step < questions.length){
addMessage(questions[step],"bot");
}
}

function nextStep(){
let input=document.getElementById("userInput");
let value=input.value.trim();

if(value==="") return;

addMessage(value,"user");

if(step===0) data.location=value;
if(step===1) data.area=parseFloat(value);
if(step===2) data.floors=parseInt(value);
if(step===3) data.material=value.toLowerCase();
if(step===4) data.labour=value.toLowerCase();

input.value="";
step++;

if(step < questions.length){
askQuestion();
}else{
calculateEstimate();
}
}

function calculateEstimate(){

let rate = 1800;

if(data.material==="premium") rate=2300;

let totalArea = data.area * data.floors;
let cost = totalArea * rate;

let cement = totalArea * 0.45;
let steel = totalArea * 4;
let sand = totalArea * 0.03;

addMessage(
`📍 Location: ${data.location}

🏠 Total Area: ${totalArea} sq ft

💰 Estimated Cost: ₹${cost.toLocaleString()}

🧱 Cement Bags: ${Math.round(cement)}

🔩 Steel: ${Math.round(steel)} kg

🏖 Sand: ${sand.toFixed(1)} tons

📞 Contact Dream Ladders for detailed BOQ.`,
"bot");
}

askQuestion();
