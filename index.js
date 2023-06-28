import data from "./index.json" assert { type: "json" };
import { buildVehicle } from "./build.js";

export let build = [];
export let ferrari = [...data];

/*
    @Function: elementCreator
    @Param: DOM element, CSS className
    @Description: creates the DOM element and adds the className to it
    @Returns: DOM element
*/
function elementCreator(element, className) {
    const ele = document.createElement(element);
    ele.className = className;
    return ele;
}

/*
    @Function: ferrariDisplay
    @Param: ferrari object
    @Description: Render the object as a tiles and displays it
    @Returns: null
*/
export function ferrariDisplay(ferrari, name) {
    const vehicleContainer = document.querySelector(name);
    let i=1;
    vehicleContainer.innerHTML = '';
    ferrari.map(car => {
        let j=1;
        const vehicle = elementCreator("div", "vehicle");
        vehicle.id = car.id;
        vehicle.setAttribute('data-aos', 'fade-up')

        const vehicleImage = elementCreator("div", "vehicle-image");
        vehicleImage.classList.add('vehicle-image-outer');

        const vehicleImageCont =elementCreator('div', '');
        vehicleImageCont.classList.add('vehicle-image-cont');

        const image1 = new Image();
        const image2 = new Image();
        const image3 = new Image();
        image1.src = `./assets/${i}-${j++}.png`;
        image2.src = `./assets/${i}-${j++}.png`;
        image3.src = `./assets/${i}-${j}.png`;
        i++;
        image1.alt = car.title;
        image2.alt = car.title;
        image3.alt = car.title;

        vehicleImageCont.appendChild(image1);
        vehicleImageCont.appendChild(image2);
        vehicleImageCont.appendChild(image3);
        vehicleImage.appendChild(vehicleImageCont);

        const vehicleDesc = elementCreator("div", "vehicle-desc");
        const h1 = elementCreator("h1", "");
        h1.innerText = car.title;
        const p = elementCreator("p", "");
        p.innerText = car.desc;
        vehicleDesc.appendChild(h1);
        vehicleDesc.appendChild(p);

        const vehicleButtons = elementCreator("div", "vehicle-buttons");
        const buy = elementCreator("a", "button-6 buy");
        buy.id = 'buy'
        buy.href = "#";
        if(car.isBought) {
            buy.innerText = "Ordered";
            buy.classList.add('bought');
        }
        else {
            buy.innerText = "Build and Buy";
        }
        handleVehicleBuy(buy);
        vehicleButtons.appendChild(buy);

        vehicle.appendChild(vehicleImage);
        vehicle.appendChild(vehicleDesc);
        vehicle.appendChild(vehicleButtons);


        vehicleContainer.appendChild(vehicle);
    })
}
ferrariDisplay(ferrari, '.vehicle-container');

/*
    @Function: handleVehicleBuy
    @Param: ferrari object
    @Description: Render the object as a tiles and displays it
    @Returns: null
*/
function handleVehicleBuy(car) {
    const loadingScreen = document.getElementById('loadingScreen');

    car.addEventListener('click', function(e) {
        e.preventDefault();

        loadingScreen.classList.toggle('toggle');

        const parentVehicle = this.parentElement.parentElement;
        build = ferrari.filter(ferr => {
            if(ferr.id === +parentVehicle.id) {
                return true;
            }
        });
        setTimeout(() => {
            loadingScreen.classList.toggle('toggle');
            toggler();
        }, 0);

        document.querySelectorAll('section').forEach(section => {
            section.classList.add('toggle')
        })
        document.querySelector('.vehicle-container-container').classList.add('toggle'); 
        document.querySelector('.build-container-big').classList.remove('toggle');
        if(window.innerWidth >= 640)  {
            window.scrollTo(0, 0);
            document.querySelector('.filter-btn').style.display = 'none';
        }
        else window.scrollTo(0, window.innerHeight);
        buildVehicle(build);    

    });
}

// FOR SHOWING THE NAVBAR PANEL
document.querySelector(".nav-ham-icon").addEventListener("click", function() {
    document.querySelector(".nav-ham-icon").classList.toggle("hover")
});

function toggler() {
    document.getElementById('home').addEventListener('click', function() {
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('toggle')
        });
        document.querySelector('.vehicle-container-container').classList.remove('toggle');
        document.querySelector('.build-container-big').classList.add('toggle');
    });
    
    document.getElementById('vehicle').addEventListener('click', function() {
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('toggle')
        });
        document.querySelector('.vehicle-container-container').classList.remove('toggle');
        document.querySelector('.build-container-big').classList.add('toggle');
    });
    
    document.getElementById('build').addEventListener('click', function() {
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('toggle')
        })
        document.querySelector('.vehicle-container-container').classList.add('toggle'); 
        document.querySelector('.build-container-big').classList.remove('toggle');
        buildVehicle(build);
    });
}
toggler();

// ACCORDION
function theAccordion() {
    var accordion = document.getElementsByClassName("accordion");

    for (let i = 0; i < accordion.length; i++) {
      accordion[i].addEventListener("click", function () {
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
      });
    }
}
theAccordion()

function imageSlider() {
    const imageContainer = document.querySelectorAll('.vehicle-image-cont');
    imageContainer.forEach(imageCont => {
      let i = 0, n = imageCont.children.length;
      function slider(i) {
        setTimeout(() => {
          imageCont.style.transform = `translateX(${-100*(i+1)}%)`;
          i++;
          if (i > n-1) {
            imageCont.style.transform = `translateX(${0}%)`;
            i=0;
          }
          slider(i);
        }, 2500 * (i+1));
      }
      slider(i);
    })
}
imageSlider();

if(window.innerWidth >= 640) {
    document.querySelector('.filter-container').style.display = 'none'
}
else {
    document.querySelector('.filter-container').style.display = 'block'
}
document.querySelector('.filter-container').addEventListener('click', function() {
    window.scrollTo(0, 0);
})