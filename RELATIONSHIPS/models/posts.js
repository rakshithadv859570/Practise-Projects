const  mongoose = require("mongoose");
const { Schema } = mongoose;


main()
.then(()=> console.log("Connection is successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


const userSchema=new Schema({  
   username:String,
   email:String,
});

const postSchema=new Schema({
    content:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }
});

const User=mongoose.model("User",userSchema);
const Post=mongoose.model("Post",postSchema);

const addData=async()=>
{
    // let user1=new User({
    //     username:"rakshitha",
    //     email:"rakshitha@gmail.com",
    // });

    // let post1=new Post({
    //     content:"Hello world!",
    //     likes:34,
    // });


    // post1.user=user1;//saves the user1 in 1st post of the user...!

    // await user1.save();
    // await post1.save();

    let user=await User.findOne({username:"rakshitha"});
    
    let post2=new Post({
        content:"Bye bye",
        likes:74,
    });



    post2.user=user;
    await post2.save();

};

addData();

//to delete the  extra data present in the post and users also...!
// const del=async()=>
// {
//     await Post.findByIdAndDelete("----");
//     await User.findByIdAndDelete("----");

// }

// del();

// to get data of the users
// const getData=async()=>{
//     let result3=await Post.findOne({}).populate("user","username");//pass the user defined in the post itself and  ///username is specified for specific information  to be fetched from the user model

//     console.log(result3);
// }

// getData();                                                           