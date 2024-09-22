const express=require("express");
const app=express();
let port=8000;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[    {
        id:uuidv4(),
        username:"Rakshitha",
        content:"This is a very good opportunity to learn REST APIS"
    },
    {
        id:uuidv4(),
        username:"Chiranth",
        content:"Best decade  brandbuilder"
    },
    {
        id:uuidv4(),
        username:"VidyaviswaEnterprise",
        content:"Electronic Sales "
    }
];

app.get("/posts",(req,res)=>
{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>
{
        res.render("newchat.ejs");
});

app.post("/posts",(req,res)=>
{
        let {username,content}=req.body;
        let id=uuidv4();
        posts.push({id,username,content});
        res.redirect("/posts");
});

    

app.get("/posts/:id",(req,res)=>
{
    let {id}=req.params;
    let post=posts.find((p) => id === p.id);
    res.render("view.ejs",{post});
    res.send("request working");

});

app.patch("/posts/:id",(req,res)=>
{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p) =>id===p.id);
    post.content=newContent;
    res.redirect("/posts");
    res.send("patch request is working");
});

app.get("/posts/:id/edit",(req,res)=>
{
        let {id}=req.params;
        let post=posts.find((p) => id === p.id);
        res.render("edit.ejs",{post});
       
});



app.delete("/posts/:id",(req,res)=>
{
    let {id}=req.params;
     posts=posts.filter((p) => id!== p.id);
     res.redirect("/posts");
     res.send("delete is success");

});


app.listen(port,()=>
{
    console.log(`app is listening on port ${port}`);
});