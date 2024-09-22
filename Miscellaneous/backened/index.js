const express=require("express");
const app=express();
const port=8000;

app.use(express.urlencoded({extended:true}));//middleware used to parse the clients data properly

app.use(express.json());// to parse the json data to understand properly

app.get("/register",(req,res)=>
{
    let {user,password}=req.query;

    res.send(`standard GET response ${user}`);

});

app.post("/register",(req,res)=>
{
    console.log(req.body);
    let {user,password}=req.body;
    res.send(`standard POST response ${user}`);
    
});

app.listen(port,(req,res)=>
{
    console.log(`listening to port ${port}`);

});