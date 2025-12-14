const simContainer = document.getElementById("sim_container");
const seesaw = document.getElementById("seesaw");
const nextWeightLabel = document.getElementById("nextVal");

let nextWeight = 0;
let weights = [];
let totalTorqueLeft = 0;
let totalTorqueRight = 0;
let totalWeightLeft = 0;
let totalWeightRight = 0;

//Simulation Container toplamda 700 pixel, seesaw ise 400 pixel
//Simulation Containerın merkezi, seesaw'un da merkezi olduğu için tam olarak 350 pixel sağa gidildiğinde seesaw'un merkezine gelmiş oluruz
//Seesaw da ağırlık merkezinin sağına ve soluna 200er pixel olarak bölündüğü için
//Container'ın 150 pixel sağına gittiğimizde, Seesaw'un başlangıcına ulaşırız. 
//Container sabit size'a sahip olduğu için ekran çözünürlüğü arttığında da sorunsuz bi şekilde çalışacaktır
//Ekrandaki herhangi bir elementin yeri kaymayacaktır. 

    const center = simContainer.offsetWidth/2;
    const seesawHalfWidth = 200;
    const clickableAreaLeftBound = center - seesawHalfWidth;  
    const clickableAreaRightBound = center + seesawHalfWidth;

simContainer.addEventListener('mousemove', function(event){

    const containerPos = simContainer.getBoundingClientRect();

    const mouseX = event.clientX - containerPos.left;

    if(mouseX >= clickableAreaLeftBound && mouseX <= clickableAreaRightBound)
    {
        simContainer.style.cursor = 'pointer';
    } else {
        simContainer.style.cursor = 'default';
    }

});

simContainer.addEventListener('click', function(event)
{
    const containerPos = simContainer.getBoundingClientRect();

    const clickX = event.clientX - containerPos.left;

    if(clickX >= clickableAreaLeftBound && clickX <= clickableAreaRightBound)
    {
        createWeight(clickX);
        updateNextWeight();
    }

});

function randomNumGenerator(){

    let num = Math.floor(Math.random() * 10) + 1;

    return(num);
}

function updateNextWeight(){

    nextWeight = randomNumGenerator();
    nextWeightLabel.textContent = nextWeight + 'kg';

}

function createWeight(clickX){
   
    const weight = document.createElement('div');
    weight.className = 'weight';
    weight.textContent = nextWeight + 'kg';

    const distanceFromCenter = clickX - center;
    
    weight.style.left = (200 + distanceFromCenter) + 'px';
    weight.style.top = '10px';
    weight.style.background = getRandomColor();

    seesaw.appendChild(weight);

    const torque = nextWeight * distanceFromCenter;

    if(distanceFromCenter < 0)
    {
        totalTorqueLeft += torque;
        totalWeightLeft += nextWeight;
    } else {
        totalTorqueRight += torque;
        totalWeightRight += nextWeight;
    }
    
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

updateNextWeight();