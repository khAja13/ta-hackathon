import { ferrari as jsonData, ferrariDisplay } from "./index.js";
let ferrari = [];

export function buildVehicle(data) {
    ferrari = data;
    console.log(ferrari);
    if(ferrari.length == 0) {
        document.querySelector('.no-build-content').classList.remove('toggle');
        document.querySelector('.build-container-big').classList.add('toggle');
    } else {
        document.querySelector('.no-build-content').classList.add('toggle');
        document.querySelector('.build-container-big').classList.remove('toggle');
        document.querySelector(".build-main div").style.backgroundImage = `url(${ferrari[0].colorsImage[0]})`;

        document.querySelector('.fa-droplet').nextElementSibling.innerHTML = ferrari[0].colors[0];
        document.querySelector('.fa-soap').nextElementSibling.innerHTML = ferrari[0].seatColors[0];
        document.querySelector('.fa-gear').nextElementSibling.innerHTML = ferrari[0].wheelName[0];
        document.querySelector('.amount p span').innerHTML = ferrari[0].price + ferrari[0].colorsPrice[0] + ferrari[0].seatsPrice[0] + ferrari[0].wheelsPrice[0];
        document.querySelector('.inc-color').innerHTML = `<i class="fa-solid fa-arrow-up" style="color: #00ff00;"></i>
                <span>$${ferrari[0].colorsPrice[0]}</span>`;
        document.querySelector('.inc-seat').innerHTML = `<i class="fa-solid fa-arrow-up" style="color: #00ff00;"></i>
                <span>$${ferrari[0].seatsPrice[0]}</span>`;
        document.querySelector('.inc-wheel').innerHTML = `<i class="fa-solid fa-arrow-up" style="color: #00ff00;"></i>
                <span>$${ferrari[0].wheelsPrice[0]}</span>`


        setCarColors();
        setSeatColors();
        setWheels();
        setCustomization();

        document.querySelector('.btn-txt.some p').addEventListener('click', function() {
            const loadingScreen = document.getElementById('loadingScreen');
            loadingScreen.classList.toggle('toggle');
            setTimeout(() => {
                loadingScreen.classList.toggle('toggle');
                document.querySelectorAll('section').forEach(section => {
                    section.classList.remove('toggle')
                });
                jsonData.map(ferr => {
                    if(ferr.id === +ferrari[0].id) {
                        ferr.isBought = true;
                    }
                });
                // jsonData = [...doneData];
                ferrariDisplay(jsonData, '.vehicle-container');
                document.querySelector('.vehicle-container-container').classList.remove('toggle');
                document.querySelector('.build-container-big').classList.add('toggle');
            }, 1000);
        })

        let colorIndex = 0, seatIndex = 0, wheelIndex = 0;
        var colors = document.querySelectorAll('.color-holder');
        colors.forEach((color, index) => {
            color.addEventListener('click', function() {
                this.parentElement.parentElement.parentElement.style.display = 'none';
                if(window.innerWidth <= 640) window.scrollTo(0, window.innerHeight);

                var actives = document.querySelectorAll('.color-holder-active');
                actives.forEach(active => active.classList.remove('color-holder-active'));
                color.classList.add('color-holder-active');
                let indexes = getIndexes();
                document.querySelector(".build-main div").style.backgroundImage = `url(./assets/wheel-${ferrari[0].id}-${indexes[0]}-${indexes[1]}.jpg)`;
                document.querySelector('.fa-droplet').nextElementSibling.innerHTML = ferrari[0].colors[index];
                colorIndex = index;
                document.querySelector('.amount p span').innerHTML = ferrari[0].price + ferrari[0].colorsPrice[colorIndex] + ferrari[0].seatsPrice[seatIndex] + ferrari[0].wheelsPrice[wheelIndex];
                document.querySelector('.inc-color').innerHTML = `<i class="fa-solid fa-arrow-up" style="color: #00ff00;"></i>
                <span>$${ferrari[0].colorsPrice[colorIndex]}</span>`
            })
        });

        var seatColors = document.querySelectorAll('.seat-color-holder');
        seatColors.forEach((color, index) => {
            color.addEventListener('click', function() {
                this.parentElement.parentElement.parentElement.style.display = 'none';
                if(window.innerWidth <= 640) window.scrollTo(0, window.innerHeight);

                var actives = document.querySelectorAll('.seat-color-accordion-ul li span.seat-color-holder-active');
                actives.forEach(active => active.classList.remove('seat-color-holder-active'));
                color.classList.add('seat-color-holder-active')
                document.querySelector(".build-main div").style.backgroundImage = `url(${ferrari[0].seatsImage[index]})`;
                document.querySelector('.fa-soap').nextElementSibling.innerHTML = ferrari[0].seatColors[index];
                seatIndex = index;
                document.querySelector('.amount p span').innerHTML = ferrari[0].price + ferrari[0].colorsPrice[colorIndex] + ferrari[0].seatsPrice[seatIndex] + ferrari[0].wheelsPrice[wheelIndex];
                document.querySelector('.inc-seat').innerHTML = `<i class="fa-solid fa-arrow-up" style="color: #00ff00;"></i>
                <span>$${ferrari[0].seatsPrice[seatIndex]}</span>`
            })
        })

        var wheelColors = document.querySelectorAll('.wheel-accordion-ul li');
        wheelColors.forEach((wheel, index) => {
            wheel.addEventListener('click', function() {
                this.parentElement.parentElement.parentElement.style.display = 'none';
                if(window.innerWidth <= 640) window.scrollTo(0, window.innerHeight);

                var actives = document.querySelectorAll('.wheel-accordion-ul li.seat-color-holder-active');
                actives.forEach(active => active.classList.remove('seat-color-holder-active'));
                wheel.classList.add('seat-color-holder-active');
                let indexes = getIndexes();
                document.querySelector(".build-main div").style.backgroundImage = `url(./assets/wheel-${ferrari[0].id}-${indexes[0]}-${indexes[1]}.jpg)`;
                document.querySelector('.fa-gear').nextElementSibling.innerHTML = ferrari[0].wheelName[index];
                wheelIndex = index;
                document.querySelector('.amount p span').innerHTML = ferrari[0].price + ferrari[0].colorsPrice[colorIndex] + ferrari[0].seatsPrice[seatIndex] + ferrari[0].wheelsPrice[seatIndex];
                document.querySelector('.inc-wheel').innerHTML = `<i class="fa-solid fa-arrow-up" style="color: #00ff00;"></i>
                <span>$${ferrari[0].wheelsPrice[seatIndex]}</span>`
            })
        })
    }
}

function setCarColors() {
    let element = '';
    for(let i=0; i<ferrari[0].colors.length; ++i) {
        const code = ferrari[0].code[i];
        let active = i == 0? 'color-holder-active' : ''
        element += `<li>
        <span class="color-holder ${active}" data-car=${i+1}>
            <i style="background-color: ${code}"></i>
            </span>
        <span class='color-name'>${jsonData[0].colors[i]}</span>
        </li>`;
    }
    document.querySelector('.colors-ul').innerHTML = element;
}

function setSeatColors() {
    const seatUl = document.querySelector('.seat-color-accordion-ul');

    let element = '';
    for(let i=0; i<ferrari[0].seatColors.length; ++i) {
        const code = ferrari[0].seatCode[i];
        let active = i == 0? 'seat-color-holder-active' : ''
        element += `<li>
        <span class="seat-color-holder ${active}" data-seat=${i+1}>
            <i style="background-color: ${code}"></i>
        </span>
        <span class='color-name'>${jsonData[0].seatColors[i]}</span>
        </li>`
    }
    seatUl.innerHTML = element;
}

function setWheels() {
    const seatUl = document.querySelector('.wheel-accordion-ul');

    let element = '';
    for(let i=0; i<ferrari[0].wheelName.length; ++i) {
        let active = i == 0? 'seat-color-holder-active' : ''
        element += `<li data-wheel=${i+1} class=${active}>
        <img src="${jsonData[0].wheelsImage[i]}">
        <span class='color-name'>${jsonData[0].wheelName[i]}</span>
        </li>`
    }
    seatUl.innerHTML = element;
}

function getIndexes() {
    let car = document.querySelector('.color-holder.color-holder-active')
    let wheel = document.querySelector('.wheel-accordion-ul li.seat-color-holder-active')
    let carIndex = car ? car.getAttribute('data-car') : 1;
    let wheelIndex = wheel ? wheel.getAttribute('data-wheel') : 1;
    return [carIndex, wheelIndex];
}

function setCustomization() {
    let featuresDesc = document.querySelector('.features-list-container span');
    featuresDesc.innerHTML = ferrari[0].desc;
}

