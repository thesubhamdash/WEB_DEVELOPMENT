const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
    item: String,
    price: Number
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomers = async() => {
    let cust1 = new Customer({
        name: "Khushi",

    });

    let order1 = await Order.findOne({item: "Momo"});
    let order2 = await Order.findOne({item: "Samosa"});

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let result = await cust1.save();
    console.log(result);
}

addCustomers();

// const addOrders = async() => {
//     let result = await Order.insertMany([
//         {item: "Samosa", price: 35},
//         {item: "Momo", price: 200},
//         {item: "Jerry", price: 50}
//     ]);

//     console.log(result);
// };

// addOrders();

