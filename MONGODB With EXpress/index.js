const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const Chat=require("./models/chat.js");

app.use(express.urlencoded({extended:true}));//use method are middle wares for client side proper acesss
app.use(methodOverride('_method'));

app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));//middle wares use method

main()
.then( ()=>{console.log("Connection is succesfull");})
.catch((err) => console.log(err));

async function main() { await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); }

app.get("/",(req,res)=>
{
    res.send("Working Root");
});

//index Route
app.get("/chats",async (req,res)=>
{
    let chats=await Chat.find();
    //console.log(chats);
    res.render("index.ejs",{chats});
    //res.send("Working Well");
});

app.get("/chats/new",(req,res)=>
{
    res.render("newchat.ejs");
});



app.post("/chats",async (req,res)=>
{
    let { from ,to,message}=req.body;
    let newChat= new Chat({
      from:from,
      to:to,
      message:message,
      created_at:new Date(),

    });
    //console.log(newChat);
    await newChat.save();//thenable function no need of async and await functions
    res.redirect("/chats");
});

app.get("/chats/:id/edit",async (req,res)=>
{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});

});

app.put("/chats/:id",async (req,res)=>
{
    let {id}=req.params;
    let {message:newMsg}=req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { message: newMsg },
        { runValidators: true, new: true }
      );
  
    await updatedChat.save();
    console.log(updatedChat);
    res.redirect("/chats");
   
});

app.delete("/chats/:id", async (req,res)=>
{
    let {id}=req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
     console.log(deletedChat);
    //await deletedChat.save();
    res.redirect("/chats");


});


app.listen(5050,(req,res)=>
{
   console.log("Succesfully listening to the 5050");
});