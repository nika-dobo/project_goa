const Higher = document.getElementById("hight");
const Lower = document.getElementById("low");

const Img1 = document.getElementById("leftimg");
const Img2 = document.getElementById("rightimg");

console.log(Img1);

fetch("Data.json")
  .then((response) => response.json())
  .then((data) => {
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
  console.log(car1);
  console.log(car2);

  while (car1 == car2) {
    car2 = GetRandomCar();
  }

  let CarNumberPrice = parseFloat(car1.price.replace("$", ""));
  let Car2NumberPrice = parseFloat(car2.price.replace("$", ""));

  let CarImage1 = `../cars/${car1.model}.jpg` || `../cars/${car1.model} ${car1.year}.jpg`
  let CarImage2 = `../cars/${car2.model}.jpg` || `../cars/${car2.model} ${car2.year}.jpg`

  Object.assign(Img1, { src: CarImage1 });
  Object.assign(Img2, { src: CarImage2 });




  Higher.onclick = function () {
    Higher.style.display = "none";
    Lower.style.display = "none";
    if (CarNumberPrice < Car2NumberPrice) {
      Score++;
      car1 = car2;
      car2 = GetRandomCar();
      CarNumberPrice = parseFloat(car1.price.replace("$", ""));
      Car2NumberPrice = parseFloat(car2.price.replace("$", ""));

      CarImage1 = `../cars/${car1.model}.jpg` || `../cars/${car1.model} ${car1.year}.jpg`
      CarImage2 = `../cars/${car2.model}.jpg` || `../cars/${car2.model} ${car2.year}.jpg`

      Object.assign(Img1, { src: CarImage1 });
      Object.assign(Img2, { src: CarImage2 });

    } else {
      Score = 0;
      car1 = GetRandomCar();
      car2 = GetRandomCar();
      CarNumberPrice = parseFloat(car1.price.replace("$", ""));
      Car2NumberPrice = parseFloat(car2.price.replace("$", ""));

      CarImage1 = `../cars/${car1.model}.jpg` || `../cars/${car1.model} ${car1.year}.jpg`
      CarImage2 = `../cars/${car2.model}.jpg` || `../cars/${car2.model} ${car2.year}.jpg`

      Object.assign(Img1, { src: CarImage1 });
      Object.assign(Img2, { src: CarImage2 });
    }
  };

  Lower.onclick = function () {
    Higher.style.display = "none";
    Lower.style.display = "none";
    if (CarNumberPrice > Car2NumberPrice) {
      Score++;
      car2 = GetRandomCar();
      Car2NumberPrice = parseFloat(car2.price.replace("$", ""));

      CarImage1 = `../cars/${car1.model}.jpg` || `../cars/${car1.model} ${car1.year}.jpg`
      CarImage2 = `../cars/${car2.model}.jpg` || `../cars/${car2.model} ${car2.year}.jpg`

      Object.assign(Img1, { src: CarImage1 });
      Object.assign(Img2, { src: CarImage2 });
    } else {
      Score = 0;
      car1 = GetRandomCar();
      car2 = GetRandomCar();
      CarNumberPrice = parseFloat(car1.price.replace("$", ""));
      Car2NumberPrice = parseFloat(car2.price.replace("$", ""));

      CarImage1 = `../cars/${car1.model}.jpg` || `../cars/${car1.model} ${car1.year}.jpg`
      CarImage2 = `../cars/${car2.model}.jpg` || `../cars/${car2.model} ${car2.year}.jpg`

      Object.assign(Img1, { src: CarImage1 });
      Object.assign(Img2, { src: CarImage2 });
    }
  };
}
