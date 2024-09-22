const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const mysql=require("mysql2");
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

const connection = mysql.createConnection
({
    host: 'localhost',
    port: 3355,     
    user: 'root',  
    password: 'Rakshu@123', 
    database: 'delta_app' 
});

let  getRandomUser=()=>  {
    return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password()
    ];
  }


//insert a new data let q="SHOW tABLES" USER is placed to work dynamically now

//let q="INSERT INTO user (id,username,email,password) VALUES ?";


// let users=[
//     ["123b","123_usernameb","abc@gmail.comb","abcb"],
// ["123c","123_usernamec","abc@gmail.comc","abcc"]
// ];

// let data=[];
// for(let i=1;i<=100;i++)
// {
//     data.push(getRandomUser());//Generates a 100 random fake data and it database u also check data added there
// }


// try{
//     connection.query(q,[data],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
        
//     });
// } catch(err)
// {
//     console.log(err);

// }finally {
//     connection.end();
// }

// connection.end();


// let  getRandomUser=()=>  {
//     return {
//       Id: faker.string.uuid(),
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//       password: faker.internet.password()
//     };
//   }

//console.log(getRandomUser());

app.get("/",(req,res)=>
{
    let q= `select count(*) from user`;
    
try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        console.log(result[0]["count(*)"]); // console.log(result[0].key); we can also use like this
        //res.send(result[0]);
        let count=result[0]["count(*)"];
        res.render("home.ejs",{count});
        //res.send("success");
        
    });
} 
catch(err)
{
    console.log(err);
    res.send("Some error in db");

}
   //res.send("Welcome to home Page");
});

app.get("/user",(req,res)=>
{
    let q= `select * from user`;
try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let data=result;
        //console.log(data);
        res.render("users.ejs",{data});
        
    });
}

catch(err)
{
    console.log(err);
    res.send("Some error in db");

}

});

//create a post request to add the new username to database
app.post("/user",(req,res)=>
{
    let {id,username,email,password}=req.body;
    let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}', '${username}', '${email}', '${password}')`;
    
try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        // let data=result[0];
        // data.push(q);
        res.redirect("/user");
       
        
    });
} 
catch(err)
{
    console.log(err);
    res.send("Some error in db");

}  
    //data.push({id,username,email,password});
   
});

//homework part of adding new user 
app.get("/user/new",(req,res)=>
    {
            res.render("newuserform.ejs");
    });

app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;

    let q = `SELECT * FROM user WHERE id ='${id}'`;
try{
    connection.query(q,  (err, result) => {
        if (err) throw err;
        let user=result[0];
        res.render("edit.ejs", { user });
        
    });
    }
    catch(err) {
            res.send("User not found");
        }
   
});

//update route
app.patch("/user/:id",(req,res)=>
{
    let { id } = req.params;
    let { password: FormPass, username: NewUserName } = req.body;

    let q = `SELECT * FROM user WHERE id ='${id}'`;

try{
    connection.query(q,  (err, result) => {
        if (err) throw err;
        
        let user = result[0];
        if (FormPass !== user.password) {
            return res.send("Wrong Password");
        }
        else{
            let q2 = `UPDATE user SET username='${NewUserName}' WHERE id='${id}'`;

            connection.query(q2,  (err, result) => {
                if (err) throw err;
                //res.json(result);
               //res.send(result);
                res.redirect("/user");
                
                   
            });


        }
        //res.send(user);
    });
    }catch(err) {
            res.send("User not found");
        }
});
    
//deletion part of homework 
app.delete("/user/:id",(req,res)=>
{
        let {id}=req.params;

        let q= `delete from user WHERE id='${id}'`;
        try{
            connection.query(q,  (err, result) => {
                if (err) throw err;
                res.redirect("/user");
        
                });
            }
            catch(err) {
                res.send("User not found");
            }                
});

app.listen("8050",()=>
{
        console.log(`app is listening on port 8050 `);
});