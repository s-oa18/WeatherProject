const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=c8c8a847efd9d6272484a814de6b5d84";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      console.log(temp, description);
    });

    //      const object = {
    //        name: "Seth",
    //        favouriteFood: "Plantain",
    //      };

    //      console.log(JSON.stringify(object));
    // });
  });

  res.send("Server is up and running.");
});

app.listen("3000", function () {
  console.log("Server is running on port 3000.");
});
