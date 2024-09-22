const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

main()
.then( ()=>{console.log("Connection is succesfull");})
.catch((err) => console.log(err));

async function main() { await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp'); }

// Chat.insertMany([
// { from:"neha", to:"priya", message:"Hello, how are you?",created_at:new Date(),},
// { from:"raga", to:"ranju", message:"I'm good. What about you?",created_at:new Date(),},
// { from:"ramya", to:"chandu", message:"I'm good too, thanks!",created_at:new Date(),},
// { from:"sai", to:"ramu", message:"How's it going?",created_at:new Date(),},
// { from:"priya", to:"neha", message:"I'm fine, thanks!",created_at:new Date(),},

// ])