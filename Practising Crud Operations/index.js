const express=require("express");
const app = express();
let port=7070;
const path = require('path');
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id: uuidv4(),
        title: "My First Post",
        content: "This is my first post",
    
    },
    {
        id:uuidv4(),
        title: "My Second Post",
        content: "This is my second post",
    },
    {
        id: uuidv4(),
        title: "My Third Post",
        content: "This is my third post",
    },
]

app.get("/post",(req,res)=>
{

    res.render("home.ejs",{posts});

});

app.get("/post/:id/edit",(req,res) =>
{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{posts});
    res.redirect("/posts");
});

app.get("/post/new",(req,res)=>
{
    res.render("newform.ejs");
    res.redirect("/post");

});

app.post("/post",(req,res)=>
{
    let {id}=req.params;
    let newPost={title:req.body.title,content:req.body.content};
    newPost.id=uuidv4();
    posts.push(newPost);
    res.redirect("/post");

});

app.delete("/post/:id",(req,res)=>
{
    let {id}=req.params;
    posts = posts.filter((post) => post.id !== id);
    res.redirect("/post");

})

app.listen(port, (req, res) => 
    { console.log(`Server up on port ${port}`); });
