const express=require("express");
const app=express();
const path=require("path");
const mongoose = require('mongoose');
const methodOverride = require('method-override');//mongodb itself creates it somewhere it is no use
const ejsMate = require('ejs-mate');// for embedding the code  in html 
const Listing=require("./models/listing.js");

app.use(express.json());//to parse the json using middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate); // Set ejs-mate as the template engine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//index route
app.get("/listings", async (req, res) =>{
    const alllistings = await Listing.find({});//we can do .then also
    res.render("./listings/index.ejs",{alllistings});

});

//new listinings  route
app.get("/listings/new",(req,res)=>
{
    res.render("./listings/new.ejs");

});

//adding new listings
app.post("/listings",(req,res)=>
{
        // let {title,description,image,price,country,location}=req.body; this is one method of accessing and editing it
        let newlistings=new Listing(req.body.listing);
        newlistings.save();
        res.redirect("/listings");
    
});
    
//show route
app.get("/listings/:id",async (req,res)=>
{
    let {id}=req.params; 
    let listing= await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
    
});


app.get("/listings/:id/edit",async (req,res)=>
{
        let {id}=req.params;
        let listing= await Listing.findById(id);
        res.render("./listings/edit.ejs",{listing});
       
});

app.put("/listings/:id",async (req,res)=>
{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});//spreading data
    //res.redirect("/listings");
    res.redirect(`/listings/${id}`);//we redirect to any of the pages of the both 
    
});



//delete route
app.delete("/listings/:id", async (req, res) => {
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");

});

app.listen(8080,(req,res)=>
{
       console.log(`Succesfully listening to the `);
});


