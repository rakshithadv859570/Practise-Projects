const express=require("express");
const app=express();
const ExpressError=require("./ExpressError");
//middlewares 

// app.use((req,res,next)=>                                                                           
// {
//     //let { query }=req.query;
//     //console.log(query);
//     console.log("middleware1");
//     next();
//     //res.send("Hai im a middleware1");
// });

// app.use((req,res,next)=>
// {
//     next();// generally it is a good practise to end a code with next() and dont write anything after it
//     //return next();
//     //console.log("middleware2");//this dont work if u write like this too
//     //res.send("Hai im a middleware2");
// });


//logger-morgan 
// app.use((req,res,next)=>
// {
//     //console.log(req);
//     req.time=new Date(Date.now()).toString();
//     console.log(req.method,req.hostname,req.path,req.time);
//     next();
                                                                                                                                                                                             
// });

//Method-1
// app.use('/api', (req, res, next) => {
//     let { token } = req.query;
//     if (token === 'giveaccess') {
//         return next(); // Pass control to the next middleware/route handler
//     }
//     res.status(403).send("ACCESS DENIED"); // Access is denied if the token is incorrect
// });

// app.get('/api', (req, res) => {
//     res.send("data"); // This will only be reached if `next()` is called
// });

//ap.use for specific routes examples with the use a app.use method-2
const checkToken=(req,res,next)=>
{
    let {token}=req.query;
    if(token ==="giveaccess")
    {
        next();// If token is correct, proceed to the next handler
    }
    throw new ExpressError(404,"ACCESS DENIED");
};

app.get("/admin",(req,res)=>
{
    throw new ExpressError(403,"YOU CAN'T ACCESS THE ADMIN ");

})


app.get("/api",checkToken,(req,res)=>
{
    res.send("data");
});



app.use("/random",(req,res,next)=>
{
    console.log("im am only for random");
    next();
});

app.get("/err",(req,res,next)=>
{
    abcd=abcd;

});

app.use((err,req,res,next)=>
{
    console.log("-------ERROR--------");
    next(err);
    //res.send(err);
});


app.get("/",(req,res)=>
{
    res.send("Success");
    
});

app.get("/random",(req,res)=>
{
    res.send("Random things is posted here");
    

});

// app.use((err,req,res,next)=>
//     {
//         res.status(404).send("Page Not Found 404");
//     });

app.use((err,req,res,next)=>
{
    let {status,message}=err;
    res.status(status).send(message);

});

      
    


app.listen(8000,()=>
{
    console.log("server is listening to the port 8000");

});