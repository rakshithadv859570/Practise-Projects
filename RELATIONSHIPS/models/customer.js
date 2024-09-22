const  mongoose = require("mongoose");
const { Schema } = mongoose;


main()
.then(()=> console.log("Connection is successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


const orderSchema=new Schema({  
   item:String,
   price:Number,
});

const customerSchema=new Schema({
  name:String,
  //we use array beacause it is a collection of objects
  orders:[{
    type:Schema.Types.ObjectId,//to extract the data of the orders provided
    ref:"Order",//reference from the model order to extract it
  },
],

});


// customerSchema.pre("findOneAndDelete",async()=>
// {
//   console.log("PRE MIDDLEWARE");
// });


customerSchema.post("findOneAndDelete", async(customer)=>
{
  if(customer.orders.length)
  {
    let res=await Order.deleteMany({_id: {$in:customer.orders}} );
    console.log(res);
  }


});

const Order=mongoose.model("Order",orderSchema);
const Customer=mongoose.model("Customer",customerSchema);

const addcustomer=async()=>
  {
    let newCust=new Customer({
      name:"chiranth",
    });

    let newOrders=new Order({
      item:"Pizza",
      price:250,
    });


    newCust.orders.push(newOrders);

    await newOrders.save();
    await newCust.save();

    console.log("added a new customer");
  
  
  }

  //addcustomer();

  const delcust=async()=>
  {
    let data=await Customer.findByIdAndDelete('66ee27f2a98e3172b107b777');

  };

  delcust();

// const addcustomer=async()=>
// {
//   let cust1=new Customer({
//     name:"Rakshitha ",

//   });

//   let order1=await Order.findOne({item:"Samosa"});
//   let order2=await Order.findOne({item:"laddo"});

//   cust1.orders.push(order1);
//   cust1.orders.push(order2);

//   let result=await cust1.save();
//   console.log(result);

//   //to find only the customer data we are making this process only
//   //let result1=await Customer.find({})
//   // console.log(result1);


// }

//addcustomer();

const findCustomer=async()=>
{
   //to find only the customer data we are making this process only
  let result1=await Customer.find({}).populate("orders");
  console.log(result1[0]);
  //console.log(result1[1]);


}

//findCustomer();

// const addOrders=async()=>
// {
//     await Order.deleteMany({});
//     let res=await Order.insertMany([
//         {item:"Samosa",price:56},
//         {item:"laddo",price:90},
//         {item:"perk chocos",price:10},
//     ]);
//     console.log(res);
// };

// addOrders();
