const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const Chat = require("./models/chat.js");

//For mongoose
const mongoose = require("mongoose");

main()
    .then(()=> {
        console.log("Connection Successful");
    })
    .catch ((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ChitChat");
}

let chat1 = new Chat({
    sender: "Khushi",
    receiver: "Subham",
    message: "Hii, How're you??",
    created_at: new Date(),
});

chat1
    .save()
    .then(() => {
        console.log("Message sent!");
        console.log(chat1.message);
    })
    .catch(err => {
        console.log(err);
    });

//For views folder to store ejs templates
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


//For express app setup
app.get("/", (req,res)=>{
    res.send("root is working");
});


//For express app setup
app.listen(port, ()=>{
    console.log(`Listening to port: ${port}`);
});