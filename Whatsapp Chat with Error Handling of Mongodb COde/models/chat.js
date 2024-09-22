const mongoose = require('mongoose');

main()
.then( ()=>{console.log("Connection is succesfull");})
.catch((err) => console.log(err));

async function main() { await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp'); }

const chatSchema=new mongoose.Schema({
        from:{
            type:String,
            required:true,
        },
        to:{
            type:String,
            required:true,
        },
        message:{
            type:String,
            maxLength:50,
        },
        created_at:{
            type:Date,
            required:true,
        },

    }
)

const Chat= mongoose.model("Chat",chatSchema);

module.exports= Chat;