const  mongoose = require('mongoose');
const { Schema } = mongoose;


main()
.then(()=> console.log("Connection is successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

//defining the schema  for the user collection
const userSchema=new Schema({  
    username:String,  
    addresses:[{ _id:false,location:String, city:String, },],  //array form to add multiple address
});

//creation of the model for userschema
const User=mongoose.model("User",userSchema);

const addUsers= async()=>
{
    //creation user and adding the data to it
    const user1=new User({ username:"SherlockHomes", addresses:[{location:"221B Baker Street",city:"London"},],});
    //another method of adding a address to the mongo database
    user1.addresses.push({location:"P32 WallStreet",city:"London"});

    //we have to save a single data in the db
    let result=await user1.save();
    console.log(result);

};

addUsers();
