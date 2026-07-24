const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/test");

main()
    .then(() => {
        console.log("connection succesful");
    })
    .catch((err) => {
        console.log(err);
    })

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number
});

const User = mongoose.model("User", userSchema);

User.deleteMany({age: {$lt : 25}})
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });

// User.findOneAndUpdate({name:"Rock"}, {age:55}, {new:true})
//     .then((res) => {
//         console.log(res);
//     }).catch((err) => {
//         console.log(err);
//     });


// User.find({})
//     .then(data => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     });

// User.insertMany([
//     {name: "Rock", email:"rock12@gmail.com", age:21},
//     {name: "Dobi", email:"dobi@yahoo.in", age:49},
//     {name: "Jethiyaa", email:"lal@gmail.com", age:57}
// ]).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// });

// const user2 = new User({
//     name : "Eve",
//     email : "eve@gmail.com",
//     age : 18
// });

// user2.save();