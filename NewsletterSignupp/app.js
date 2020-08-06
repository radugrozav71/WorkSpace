const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const email = req.body.email;
  const nume = req.body.nume;
  const prenume = req.body.prenume;

  const data ={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: nume,
          LNAME: prenume
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url ="https://us10.api.mailchimp.com/3.0/lists/7df716617e";
  const options = {
    method: "POST",
    auth: "radu1:ca1a4bb048ae27191708c3e8ff8235fe-us10"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){

      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else{
        res.sendFile(__dirname + "/failure.html");
      }

    });
  });
 request.write(jsonData);
 request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function(){
});
