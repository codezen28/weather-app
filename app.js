const express=require("express");  // Here we are supposed to create a node app for which we will require express 
const https=require("https");      // To make https request to other server 
const app=express();     // Creating the express app
const bodyParser=require("body-parser");    // This package is used to fetch the input through post request
app.get("/",function(req,res){                            // When the user will send the get request to home page this will show him

    res.sendFile(__dirname+"/index.html")
           
})

app.use(bodyParser.urlencoded({extended:true}));     // This is the necessary code to start parsing through the body of the post request

app.post("/",function(req,res){
  
   const query=req.body.cityName;
    const apikey="fecfe4e79defcd071ce44100c285a897";
    const degree="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query  + "&appid=" + apikey + "&units=" + degree;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data) ;          //This will turn hexadecimal text into javascript object
           // console.log(weatherData);
           // console.log(JSON.stringify(weatherData));        // It will convert the object into string format
           const temperature=weatherData.main.temp;
           const weatherDesc=weatherData.weather[0].description;
           const icon=weatherData.weather[0].icon;
           const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
           res.write("<p>Weather is currently" + weatherDesc + "</p>");
           res.write("<h1>The temperature in "+query +" is " + temperature +" in celsius</h1>");
           res.write("<img src="+imageURL+">");
           res.send();
         

        });
    });


})




app.listen(3000,function(){
    console.log("Port is started");
})