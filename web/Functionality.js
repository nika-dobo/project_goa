fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const Cars = data;
        console.log(data);
        StartGame(Cars);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
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

    document.getElementById('Higher').onclick = function() {
        console.log("Higher");

        if (CarNumberPrice < Car2NumberPrice) {
            Score++;
            car1 = car2;
            CarNumberPrice = Car2NumberPrice;
            car2 = GetRandomCar();
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''));
        } else {
            console.log("Incorrect");
            Score = 0;
            car1 = GetRandomCar();
            car2 = GetRandomCar();
            CarNumberPrice = parseFloat(car1.price.replace('$', ''));
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''));
        }
    };

    document.getElementById('Lower').onclick = function() {
        console.log("Lower");

        if (CarNumberPrice > Car2NumberPrice) {
            Score++;
            car1 = car2;
            CarNumberPrice = Car2NumberPrice;
            car2 = GetRandomCar();
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''));
        } else {
            console.log("Incorrect");
            Score = 0;
            car1 = GetRandomCar();
            car2 = GetRandomCar();
            CarNumberPrice = parseFloat(car1.price.replace('$', ''));
            Car2NumberPrice = parseFloat(car2.price.replace('$', ''));
        }
    };
}