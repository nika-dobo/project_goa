
const Higher = document.getElementById("hight");
const Lower = document.getElementById("low");

const Img1 = document.getElementById("leftimg");
const Img2 = document.getElementById("rightimg");

const button1 = document.getElementById('hight');
const button2 = document.getElementById('low');

const Name1 = document.getElementById('LeftName');
const Name2 = document.getElementById('RightName');

const Answer = document.getElementById('Answer');


fetch("Data.json")
    .then(response => response.json())
    .then(data => {
        const Cars = data;
        console.log(data);
        StartGame(Cars);
    });


function StartGame(Data) {
    console.log(Data.length);

    function GetRandomCar() {
        let Random = Math.floor(Math.random() * Data.length);
        let Car = Data[Random];
        return Car;
    }
    let isPlaying = true;
    let Score = 0;

    let car1 = GetRandomCar();
    let car2 = GetRandomCar();
    while (car1 === car2) {
        car2 = GetRandomCar();
    }

    let CarNumberPrice = parseFloat(car1.price.replace('$', ''));
    let Car2NumberPrice = parseFloat(car2.price.replace('$', ''));

    let Car1Image = `../cars/${car1.model}.jpg`;
    let Car2Image = `../cars/${car2.model}.jpg`;

    Img1.src = Car1Image;
    Img2.src = Car2Image;

    Name1.innerText = `${car1.year} ${car1.brand} ${car1.model}`;
    Name2.innerText = `${car2.year} ${car2.brand} ${car2.model}`;

    button1.onclick = function() {
        if (CarNumberPrice < Car2NumberPrice) {
            Score++;
            Answer.innerText = `Correct: ${Score}`;
            car1 = car2;
            CarNumberPrice = Car2NumberPrice;
            car2 = GetRandomCar();
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''));

            Car1Image = `../cars/${car1.model}.jpg`;
            Car2Image = `../cars/${car2.model}.jpg`;
        
            Img1.src = Car1Image;
            Img2.src = Car2Image;

            Name1.innerText = `${car1.year} ${car1.brand} ${car1.model}`;
            Name2.innerText = `${car2.year} ${car2.brand} ${car2.model}`;
        } else {
            Score = 0;
            Answer.innerText = `Incorrect: ${Score}`;
            car1 = GetRandomCar();
            car2 = GetRandomCar();
            CarNumberPrice = parseFloat(car1.price.replace('$', ''));
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''));

            Car1Image = `../cars/${car1.model}.jpg`;
            Car2Image = `../cars/${car2.model}.jpg`;
        
            Img1.src = Car1Image;
            Img2.src = Car2Image;

            Name1.innerText = `${car1.year} ${car1.brand} ${car1.model}`;
            Name2.innerText = `${car2.year} ${car2.brand} ${car2.model}`;
        }
    };

   button2.onclick = function() {
        if (CarNumberPrice > Car2NumberPrice) {
            Score++;
            Answer.innerText = `Correct: ${Score}`;
            car1 = car2;
            CarNumberPrice = Car2NumberPrice;
            car2 = GetRandomCar();
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''));

            Car1Image = `../cars/${car1.model}.jpg`;
            Car2Image = `../cars/${car2.model}.jpg`;
        
            Img1.src = Car1Image;
            Img2.src = Car2Image;

            Name1.innerText = `${car1.year} ${car1.brand} ${car1.model}`;
            Name2.innerText = `${car2.year} ${car2.brand} ${car2.model}`;
        } else {
            Answer.innerText = `Incorrect: ${Score}`;
            Score = 0;
            car1 = GetRandomCar();
            car2 = GetRandomCar();
            CarNumberPrice = parseFloat(car1.price.replace('$', ''));
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''));

            Car1Image = `../cars/${car1.model}.jpg`;
            Car2Image = `../cars/${car2.model}.jpg`;
        
            Img1.src = Car1Image;
            Img2.src = Car2Image;

            Name1.innerText = `${car1.year} ${car1.brand} ${car1.model}`;
            Name2.innerText = `${car2.year} ${car2.brand} ${car2.model}`;
        }
    }
}       

