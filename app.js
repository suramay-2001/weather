const exp= require("express");
const https = require("https");
const bp=require("body-parser");
const app= exp();
app.use(bp.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const query=req.body.CityName;
  const key="";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units=metric";
  https.get(url, function(resp){

  resp.on("data",function(data){
    const w=JSON.parse(data);
    const temp= w.main.temp;
    const icon= w.weather[0].icon;
    const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<p>The weather is"+w.weather[0].description+"<p>");
    res.write("<h1> the temperature is "+temp+"in "+query+"</h1>");
    res.write("<img src="+imageURL+">");
    console.log(temp);
  });

  });
});


app.listen(3000,function(){
  console.log("We are listening");
});
