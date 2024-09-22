const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/test');

main()
.then( ()=>
{
    console.log("Connection is succesfull");
})
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema=new mongoose.Schema({ 
    name: String,
    email:String,
    age:Number,
});

const User=mongoose.model("User",userSchema);

const user1= new User({name:"john",email:"john@gmail.com",age:20});
const user2 = new User({name:"Jane",email:"jane@gmail.com",age:25});
user1.save();
user2.save();

const user3=new User({name:"Alice",email:"alice@gmail.com",age:30});
user3.save();

const user4=new User({name:"ranju",email:"ranju@gmail.com",age:67});
user4.save();

const user5 = new User({name: "Mike", email: "mike@gmail.com",age:40});
user5.save();

const user6=new User({name:"Emma",email:"emma@gmail.com",age:35});
user6.save();

// User.insertMany([
//     { name: "sophia", email: "sophia@gmail.com", age:  45},
//     { name: "olivia", email: "olivia@gmail.com", age:  50},
//     { name: "Ava", email: "ava@gmail.com", age: 55},    
//     ]).then((data) => {console.log(data);})
//     .catch((err) => {console.log(err);});

User.deleteMany({ name: "john" })
.then((res)=>
{
    console.log(res);
})
.catch((err)=>{console.log(err);});




