const simContainer = document.getElementById("sim_container");
const seesaw = document.getElementById("seesaw");

//Simulation Container toplamda 700 pixel, seesaw ise 400 pixel
//Simulation Containerın merkezi, seesaw'un da merkezi olduğu için tam olarak 350 pixel sağa gidildiğinde seesaw'un merkezine gelmiş oluruz
//Seesaw da ağırlık merkezinin sağına ve soluna 200er pixel olarak bölündüğü için
//Container'ın 150 pixel sağına gittiğimizde, Seesaw'un başlangıcına ulaşırız. 
//Container sabit size'a sahip olduğu için ekran çözünürlüğü arttığında da sorunsuz bi şekilde çalışacaktır
//Ekrandaki herhangi bir elementin yeri kaymayacaktır. 

    const containerPos = simContainer.getBoundingClientRect();
    const center = simContainer.offsetWidth/2;
    const seesawHalfWidth = 200;

    const clickableAreaLeftBound = center - seesawHalfWidth;  
    const clickableAreaRightBound = center + seesawHalfWidth;

simContainer.addEventListener('mousemove', function(event){

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

    const clickX = event.clientX - containerPos.left;

    if(clickX >= clickableAreaLeftBound && clickX <= clickableAreaRightBound)
    {
        //weight olusturulcak
    }

});

