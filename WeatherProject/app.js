const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
  res.sendFile(__dirname +"/index.html");
});

app.post("/", function(req, res){
  const cityTemp = req.body.location;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityTemp +"&APPID=b61cb634c41cb71717787de330f7c262&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const image = weatherData.weather[0].icon;
      const getCountry = weatherData.sys.country;
      const imgURL = "http://openweathermap.org/img/wn/"+image+"@2x.png";
      const description = weatherData.weather[0].description;

      res.write("<p>The weather is currently " + description +"</p>");
      res.write("<h1>Temperatura in "+cityTemp+" este " + temp + " cu " + description +" din tara "+getCountry+"</h1>");
      res.write("<img src=" + imgURL +">");
      res.send();
    });
  });
})


app.listen(3000, function(){
});
