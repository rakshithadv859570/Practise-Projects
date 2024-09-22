const mongoose = require('mongoose');

main()
.then( ()=>
{
    console.log("Connection is succesfull");
})
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema=new mongoose.Schema({ 
    title: {type:String,
        required:true,},
    author:{ type:String,},
    price:{type:Number,},
   
});

const Book=mongoose.model("Book",bookSchema);

let book1=new Book({title:"Mathematics",author:"Macrlen",price:56});
book1.save();
let book2=new Book({title:"Science",author:"John",price:45});
book2.save();

Book.insertMany([{title:"ram",author:"raju",price:45},
    {title:"shyam",author:"sam",price:50},
    {title:"python",author:"xyz",price:70},
    {title:"java",author:"pqr",price:90},
    ])
    .then(() => { console.log("success");})
    .catch((err) => { console.log(err); });

