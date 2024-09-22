const express = require('express');
const app = express();

const port = 8000;//8000

//console.log(app);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });

app.get("/",(req,res)=>
{
  res.send("you contacted root path");
});

app.get("/apple",(req,res)=>
{
    res.send("you contacted apple path");
});

app.get("/orange",(req,res)=> {
      res.send("you contacted orange path");
});

app.get("/:username/:id",(req,res)=> {
  
  // res.send("hello,i am root");
  let {username,id}=req.params;
  console.log(req.params);
  res.send(`welcome to the page of @${username}`);
});

app.get("*", (req, res) => {
  res.send("you contacted an unknown path");
});

app.get("/search",(req,res)=>
{
  // console.log(req.query);
  // res.send("no result found");

  let {q}=req.query;
  res.send(`<h1>Search result for query:@${q}`);

});

app.post("/",(req,res)=>
{
  res.send("you send a post request");
});



app.use((req,res)=>
{
  console.log("request recieved");
  res.send("this is a basic response");
  res.send({
    name:"apple",
    color:"red"
  });
  res.send("<h1>Fruits</h1><ul><li>apple</li><li>orange</li></ul>")
});