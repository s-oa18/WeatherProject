const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const appKey = "c8c8a847efd9d6272484a814de6b5d84";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=" +
    appKey +
    "&q=" +
    query +
    "&units=" +
    unit +
    "";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currrently " + weatherDescription + " </p>");

      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celcius.</>"
      );

      res.write("<img src=" + imageUrl + ">");

      res.send();
    });

    //      const object = {
    //        name: "Seth",
    //        favouriteFood: "Plantain",
    //      };

    //      console.log(JSON.stringify(object));
    // });
  });
});

app.listen("3000", function () {
  console.log("Server is running on port 3000.");
});
