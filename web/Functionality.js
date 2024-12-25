fetch("Data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const Cars = data;
    console.log(data);
    StartGame(Cars);
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

function StartGame(Data) {
  try {
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
  } catch (error) {
    console.error("Error in StartGame function:", error);
  }
}
