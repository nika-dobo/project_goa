
const Higher = document.getElementById("hight");
const Lower = document.getElementById("low");

fetch("Data.json")
    .then(response => response.json())
    .then(data => {
        const Cars = data;
        console.log(data);
        StartGame(Cars);
    });


function StartGame(Data) {

    console.log(Data.length)

    function GetRandomCar() {
        let Random = Math.floor(Math.random() * Data.length);
        let Car = Data[Random];
        
        return Car;
    }

    let isPlaying = true;
    let Score = 0;

    let car1 = GetRandomCar();
    let car2 = GetRandomCar();


    while (car1 == car2) {
        car2 = GetRandomCar();
    }
 
    let CarNumberPrice = parseFloat(car1.price.replace('$', ''))
    let Car2NumberPrice = parseFloat(car2.price.replace('$', ''))

    console.log(CarNumberPrice)
    console.log(Car2NumberPrice)

    Higher.onclick = function(){
        console.log("Higher");
        if (CarNumberPrice < Car2NumberPrice) {
            Score ++;
            car1 = car2;
            car2 = GetRandomCar();
            console.log("Correct")
            CarNumberPrice = parseFloat(car1.price.replace('$', ''))
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''))
        }
        else{
            Score = 0;
            car1 = GetRandomCar();
            car2 = GetRandomCar();
            CarNumberPrice = parseFloat(car1.price.replace('$', ''))
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''))
            console.log("Incorrect")
        }
    }

    Lower.onclick = function(){
        console.log("Lower");
        if (CarNumberPrice > Car2NumberPrice) {
            Score ++;
            car2 = GetRandomCar();
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''))
        }
        else{
            Score = 0;
            car1 = GetRandomCar();
            car2 = GetRandomCar();
            CarNumberPrice = parseFloat(car1.price.replace('$', ''))
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''))
            console.log("Incorrect")
        }
    }
   

}


