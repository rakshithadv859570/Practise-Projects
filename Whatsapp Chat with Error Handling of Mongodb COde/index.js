const express=require("express");
const app=express();
const path=require("path");

app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const Chat=require("./models/chat.js");
const ExpressError=require("./ExpressError.js");

app.use(express.urlencoded({extended:true}));//use method are middle wares for client side proper acesss
app.use(methodOverride('_method'));

app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//middle wares use method

main()
.then( ()=>{console.log("Connection is succesfull");})
.catch((err) => console.log(err));

async function main() { await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp'); }

app.get("/",(req,res)=>
{
    res.send("Working Root");
});

//index Route
app.get("/chats",asyncWrap(async (req,res,next)=>
{
        let chats=await Chat.find();
    //console.log(chats);
    res.render("index.ejs",{chats});
    //res.send("Working Well");
   
}));

//new route
app.get("/chats/new",(req,res)=>
    {
        //throw new ExpressError(404,"Page Not Found");
        res.render("newchat.ejs");
    });


app.post("/chats",asyncWrap(async (req,res,next)=>
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
   
}));

function asyncWrap(fn)
{
    return function(req,res,next)
    {
        fn(req,res,next).catch((err)=> next(err));
    };
}



//edit route of asynchrous function of Error handling
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    
    if (!chat) {
         next(new ExpressError(404, "Page Not Found")); // Return after next() to stop further execution
    }

    res.render("edit.ejs", { chat }); // Only render if chat exists

   
}));


app.get("/chats/:id/edit", asyncWrap(async (req, res, next) => {
    
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if (!chat) {
            return next(new ExpressError(404, "Chat not found"));
        }
        res.render("edit.ejs", { chat });
    } 
));


app.put("/chats/:id",asyncWrap(async (req,res,next)=>
{
   
    let {id}=req.params;
    let {message:newMsg}=req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { message: newMsg },
        { runValidators: true, new: true }
      );
  
    //await updatedChat.save();
    //console.log(updatedChat);
    res.redirect("/chats");
   

}));

app.delete("/chats/:id", asyncWrap(async (req, res, next) => {
    
       let { id } = req.params;
       let deletedChat = await Chat.findByIdAndDelete(id);
       console.log(deletedChat);
       res.redirect("/chats");
    } 
 ));

const handleValidationErr=(err)=>
{
    console.log("This was a validation Error.please follow the rules");
    console.dir(err);
    return err;
}

app.use((err,req,res,next)=>
{
    console.log(err.name);
    if(err.name==="validationError")
    {
        err=handleValidationErr(err);
    }
    next(err);

});
 

//Error handling Middleware 
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).send(message);
});


app.listen(5050,(req,res)=>
{
   console.log("Succesfully listening to the 5050");
});

//you can remove all the try and block part and you can add the asyncWrap function with all the code by defining it properly which is the better part to understand about it....  