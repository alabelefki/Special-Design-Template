//Check if there s local storage color option
let mainColors=localStorage.getItem("color_option");

if(mainColors !== null){

    document.documentElement.style.setProperty( '--main-color',mainColors);

    //remove active class from All colors list item
    document.querySelectorAll(".colors-list li").forEach(element=>{
        element.classList.remove("active");

    //add active class on element with data color === local storage item
    if(element.dataset.color=== mainColors){
        //add active class
        element.classList.add("active");
    }
    });
}
//Random background option
let backgroundOption = true;

//Variable to control the interval
let backgroundInterval;

//check if there s local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option")

// check if random background local storage is not empty
if(backgroundLocalItem !== null){

    if(backgroundLocalItem === 'true'){
        
        backgroundOption=true;

    }else {
        
        backgroundOption=false;
    
    }
//remove active class from all span
document.querySelectorAll(".random-backgrounds span").forEach(element=>{

    element.classList.remove("active");

});
    
    if(backgroundLocalItem === 'true'){
        
    document.querySelector(".random-backgrounds .yes").classList.add("active");
    
    }else {
    
    document.querySelector(".random-backgrounds .no").classList.add("active");

    }
}

//click on toggle settings gear
document.querySelector(".settings-box .toggle-settings .fa-gear").onclick=function() {

    //Toggle Class Fa-spin for rotation on self
    this.classList.toggle("fa-spin");

    //Toggle Class Open On main settings box
    document.querySelector(".settings-box").classList.toggle("open");
};

//Switch Colors
const colorsLi=document.querySelectorAll(".colors-list li");

//Loop On All List Items
colorsLi.forEach(li =>{

// Click On Every List Items
    li.addEventListener("click",(e)=>{
        
        //Set Color On Root
        document.documentElement.style.setProperty( '--main-color',e.target.dataset.color);

        // Set color on local storage
        localStorage.setItem("color_option",e.target.dataset.color);
        
        handleActive(e);
        
    });
});

//Switch background option
const randomBackEl=document.querySelectorAll(".random-backgrounds span");

//Loop On All Span 
randomBackEl.forEach(span =>{

// Click On Every Span
    span.addEventListener("click",(e)=>{
        
        handleActive(e);

        if(e.target.dataset.background === 'yes') {

            backgroundOption=true;
            
            randomizeImgs();

            localStorage.setItem("background_option",true);

        } else {
        
            backgroundOption=false;
            
            clearInterval(backgroundInterval);

            localStorage.setItem("background_option",false);

                
        }
    });
});

//Select Landing Page Element
let landinPage= document.querySelector(".landing-page");

//Get Array Of Images
let imgsArray =["02.jpg","03.jpg","04.png","05.jpg"];

//function to randomize imgs
function randomizeImgs(){

    if(backgroundOption===true) {
    
     backgroundInterval = setInterval(()=>{
    
    //Get Random Number
    let randomNumber=Math.floor(Math.random()*imgsArray.length);
    
    // Change background image URL
    landinPage.style.backgroundImage = 'url("images/'+ imgsArray[randomNumber] +'")';
    
    },5000);
}
}

//skills


//select skills selector
let ourSkills=document.querySelector(".skills");

window.onscroll=function(){
    //skills offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer height 
    let skillsOuterHeight = ourSkills.offsetHeight

    //skills inner height
    let windowHeight = this.innerHeight;

    //window ScrollTop
    windowScrollTop = this.pageYOffset

    if(windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight){

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width= skill.dataset.progress;
        });

    }
};


// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

  img.addEventListener('click', (e) => {

    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = 'popup-overlay';

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = 'popup-box';

    if (img.alt !== null) {

      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);

    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = 'close-button';

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);

  });

});

// Close Popup
document.addEventListener("click", function (e) {

  if (e.target.className == 'close-button') {

    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();

  }

});

//Select All Bullets

const allBullets= document.querySelectorAll(" .nav-bullets .bullet ");

//Select All Links
const alllinks= document.querySelectorAll(" .links a ");

function scrollToSomewhere (elements){


elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
}
scrollToSomewhere (allBullets);
scrollToSomewhere (alllinks);

// Handle Active State 

function handleActive(ev) {

    //remove active class from childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element=>{
        element.classList.remove("active");
    });

    //add active class on Self
    ev.target.classList.add("active");

}

//Reset button
document.querySelector(".reset-options").onclick= function() {
    localStorage.removeItem("bullets_option")
    localStorage.removeItem("color_option")
    localStorage.removeItem("background_option")
    window.location.reload();
}

//Toggle Menu

let toggleBtn=document.querySelector(".toggle-menu");
let tlinks=document.querySelector(".links");

toggleBtn.onclick=function (e) {

//stop propagation
e.stopPropagation();

//Toggle Class menu-active on button
this.classList.toggle("menu-active");

//Togle Class open on links
tlinks.classList.toggle("open");
};

//click anywhere outside menu and toggle button

document.addEventListener("click",(e) => {

    if(e.target !== toggleBtn && e.target !==tlinks) {

        //check if menu is open
        if(tlinks.classList.contains("open")){ 

        //Toggle Class menu-active on button
        toggleBtn.classList.toggle("menu-active");

        //Togle Class open on links
        tlinks.classList.toggle("open");
        }
    }
});

//stop propagation on menu 
tlinks.onclick= function (e){
 e.stopPropagation();
}