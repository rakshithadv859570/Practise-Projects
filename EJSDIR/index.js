const  express  = require("express");

const app=express();

const path=require("path");

port=8000;

// app.use(express.static("public"));

app.use(express.static(path.join(__dirname,"/public/css")));// this are miidlewares used to parse the data
app.use(express.static(path.join(__dirname,"/public/js")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.get("/",(req,res)=>
{
    res.render("home.ejs");

});

app.get("/hello",(req,res)=>
    {
        res.send("welcome to hello media");
    
    });

app.get("/rolldice",(req,res)=>
        {
            let dice=Math.floor(Math.random()*6)+1;
            res.render("rolldice.ejs",{dice});
        
        });

app.get("/ig/:username",(req,res)=>
    { 
        let {username}=req.params;
        const instaData=require("./data.json");
        const data=instaData[username];
        console.log(data);
        if(data)
        {
            res.render("instagram.ejs",{data});

        }
        else{
          res.render("error.ejs");
        }
    });
    

app.listen(port,(req,res)=>
{
    console.log(`listening to the port ${port}`);
});