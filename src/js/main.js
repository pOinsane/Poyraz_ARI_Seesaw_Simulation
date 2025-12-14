const simContainer = document.getElementById("sim_container");
const seesaw = document.getElementById("seesaw");
const nextWeightLabel = document.getElementById("nextVal");
const resetButton = document.getElementById('reset');
const logPanel = document.getElementById('log-panel');

let nextWeight = 0;
let weights = [];
let totalTorqueLeft = 0;
let totalTorqueRight = 0;
let totalWeightLeft = 0;
let totalWeightRight = 0;

let previewWeight = null;

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

        if(!previewWeight) {
            previewWeight = document.createElement('div');
            previewWeight.className = 'preview_weight';
            previewWeight.textContent = nextWeight + 'kg';
            seesaw.appendChild(previewWeight);
        }
        
        const distanceFromCenter = mouseX - center;
        previewWeight.textContent = nextWeight + 'kg';
        previewWeight.style.left = (200 + distanceFromCenter) + 'px';
        previewWeight.style.top = '10px';
        previewWeight.style.display = 'flex';


    } else {
        simContainer.style.cursor = 'default';

         if(previewWeight) {
            previewWeight.style.display = 'none';
        }
    }

});

simContainer.addEventListener('mouseleave', function() {
    if(previewWeight) {
        previewWeight.style.display = 'none';
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

        if(previewWeight) {
        previewWeight.textContent = nextWeight + 'kg';
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

function rotateSeesaw(){
    const netTorque = totalTorqueLeft + totalTorqueRight;
    const angle = Math.max(-30, Math.min(30, netTorque / 100));

    seesaw.style.transition = 'transform 0.8s ease-out';
    seesaw.style.transform = `rotate(${angle}deg)`;

    document.getElementById('angle').textContent = angle.toFixed(1) * -1 + '°';

}

function createWeight(clickX){
   
    const weight = document.createElement('div');
    weight.className = 'weight';
    weight.textContent = nextWeight + 'kg';

    const distanceFromCenter = clickX - center;
    
    weight.style.left = (200 + distanceFromCenter) + 'px';
    weight.style.top = '-200px';
    weight.style.background = getRandomColor();

    seesaw.appendChild(weight);

    setTimeout(() => {
        weight.style.transition = 'top 0.3s ease-in';
        weight.style.top = '10px';
    }, 10);

    const torque = nextWeight * distanceFromCenter;

    if(distanceFromCenter < 0)
    {
        totalTorqueLeft += torque;
        totalWeightLeft += nextWeight;
        addLog(`${nextWeight}kg dropped on left side at ${Math.abs(distanceFromCenter).toFixed(0)}px from center`);
    } else {
        totalTorqueRight += torque;
        totalWeightRight += nextWeight;
        addLog(`${nextWeight}kg dropped on right side at ${distanceFromCenter.toFixed(0)}px from center`);
    }
    
    document.getElementById('leftVal').textContent = totalWeightLeft.toFixed(1) + ' kg';
    document.getElementById('rightVal').textContent = totalWeightRight.toFixed(1) + ' kg';

    setTimeout(() => {
        rotateSeesaw();
        saveState();
    }, 350);
    
}

function addLog(message) {
    const logEntry = document.createElement('div');
    logEntry.className = 'logs';
    logEntry.textContent = message;

    logPanel.insertBefore(logEntry, logPanel.firstChild);
    
    const allLogs = logPanel.querySelectorAll('.logs');
    if(allLogs.length > 6
    ) {
        allLogs[allLogs.length - 1].remove();
    }
}

function resetSimulation(){

    totalTorqueLeft = 0;
    totalTorqueRight = 0;
    totalWeightLeft = 0;
    totalWeightRight = 0;

    seesaw.querySelectorAll('.weight').forEach(weight => weight.remove());
    seesaw.style.transform = 'rotate(0deg)';

    document.getElementById('leftVal').textContent = '0.0 kg';
    document.getElementById('rightVal').textContent = '0.0 kg';
    document.getElementById('angle').textContent = '0°';

    logPanel.innerHTML = '';
    localStorage.removeItem('seesaw');

    updateNextWeight();

}

resetButton.addEventListener('click', resetSimulation);







function saveState() {
    const state = {
        leftTorque: totalTorqueLeft,
        rightTorque: totalTorqueRight,
        leftWeight: totalWeightLeft,
        rightWeight: totalWeightRight,
        weights: [],
        logs: []
    };
    
    seesaw.querySelectorAll('.weight').forEach(w => {
        state.weights.push({
            text: w.textContent,
            left: w.style.left,
            color: w.style.background
        });
    });
    
    logPanel.querySelectorAll('.logs').forEach(log => {
        state.logs.push(log.textContent);
    });
    
    localStorage.setItem('seesaw', JSON.stringify(state));
}

function loadState() {
    const data = localStorage.getItem('seesaw');
    if (!data) return;
    
    const state = JSON.parse(data);
    
    totalTorqueLeft = state.leftTorque;
    totalTorqueRight = state.rightTorque;
    totalWeightLeft = state.leftWeight;
    totalWeightRight = state.rightWeight;
    
    document.getElementById('leftVal').textContent = totalWeightLeft.toFixed(1) + ' kg';
    document.getElementById('rightVal').textContent = totalWeightRight.toFixed(1) + ' kg';
    
    state.weights.forEach(w => {
        const weight = document.createElement('div');
        weight.className = 'weight';
        weight.textContent = w.text;
        weight.style.left = w.left;
        weight.style.top = '10px';
        weight.style.background = w.color;
        seesaw.appendChild(weight);
    });
    
    state.logs.forEach(txt => {
        const log = document.createElement('div');
        log.className = 'logs';
        log.textContent = txt;
        logPanel.appendChild(log);
    });
    
    rotateSeesaw();
}


loadState();
updateNextWeight();