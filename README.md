<a id="readme-top"></a>
<!--

<h3 align="center">Seesaw Simulation</h3>

## About The Project

I started by building the UI layout with HTML and CSS first. Once the project looked clean and simple, I moved on to implement the functionalities.

I used the preview "https://seesaw.samet-sevindi.workers.dev" as a reference and added features one by one in an order. Therefore, I made a list of the features, I wanted to add to the project.

At first, I just checked the preview example and I started thinking about adding collision detection since the seesaw could touch the ground. However, when I saw the 30-degree cap requirement, I abandoned that idea and it actually made the project simpler and easier.

Then, I wanted to make the clickable limited and added some event listeners to check whether if the cursor is aligned horizontally with the seesaw. The reason why I proceed like this is that I like to take things slow when I'm coding. I believe that dividing the tasks into little parts was the right way to approach this project.

My initial plan was to make the simulation as realistic as possible, but even the preview example had some flaws. For example, when the seesaw tilts, its horizontal projection should technically get shorter. However, I was still able to click outside the seesaw and it automatically moves over to seesaw and it didn't felt right.

Fixing this properly would require:
- Calculating rotated coordinates for every weight
- Adjusting the clickable area dynamically
- Recalculating positions on every frame

This added complexity without much UX benefit, so I kept the clickable area static. This was my first major trade-off.

Torque calculation balance was a pretty important design decision because placing the weight to the edges would have affected the rotation so much. Therefore, I've decided to change the divisor, so the sensitivity of the seesaw would be lower and therefore any weight didn't immediately maxed out at +- 30 degree cap.

My second design decision was making the weights children of the seesaw element instead of an element. By making this, weights were rotating with the seesaw and it saved some time since I didnt need to manually calculate new position with trigonometric formulas. Once I figured this out, making the preview hologram of the object became easier too.  

Another design decision that I made was about making the clickable area static. Since we know the width of the container of the clickable area and the width of the seesaw, I managed to calculate the length of the empty area inside the container which doesn't align horizontally with the seesaw. Therefore, I calculated exactly how many pixels there is between the container and the bounds of the clickable area. Since the container has a fixed size, having different resolutions or zooms doesn't cause a problem when positioning the elements. It would work in every circumstances.

I also added slower animations for smooth transition for almost every scenario. 

Also, for efficiency purposes, I didn't store the properties of the weights that are created to calculate the torque. Instead of that, I have created variables for left and right torque. Whenever a new weight is added, depending on where the weight is placed at, a new torque is being applied to the seesaw. Therefore, we do not need to store every weight, we just need to sum up the torques they apply to the seesaw. Then calculate the angle for the rotation.


 ## AI Assisted Parts

 I have mostly used AI for visual purposes and bug fixing. Having a clean and simple page was my first thought when starting this project and CSS was the main element on achieving this goal and AI assisted when I was in need of it. 

 I also used AI for syntax purposes. I've mostly used Java in my education and internships, therefore I wasn't used to code in javascript like I was with Java. Therefore, I forgot some built-in methods of javascript and AI helped me by reminding the syntax. For example, even though I've used local storage before I didn't exactly know how to save the data in javascript and AI saved me from doing some research on how to store data locally. 

 So basically, I can say that AI was pretty helpful since it is useful in terms of saving the developer from spending so much time on something which is repetitive or tedious. 



Poyraz ARI

<p align="right">(<a href="#readme-top">back to top</a>)</p>

