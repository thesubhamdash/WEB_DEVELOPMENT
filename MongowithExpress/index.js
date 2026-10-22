const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

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
    // await mongoose.connect("mongodb://127.0.0.1:27017/ChitChat");
    await mongoose.connect("mongodb://127.0.0.1:27017/fakeChitChat");
}

// let chat1 = new Chat({
//     sender: "Khushi",
//     receiver: "Subham",
//     message: "Hii, How're you??",
//     created_at: new Date(),
// });

// chat1
//     .save()
//     .then(() => {
//         console.log("Message sent!");
//         console.log(chat1.message);
//     })
//     .catch(err => {
//         console.log(err);
//     });

//For views folder to store ejs templates
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//For public folder to store css files
app.use(express.static(path.join(__dirname, "public")));

//For parsing data submitted from POST request
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//For using methodOverride
app.use(methodOverride("_method"));

//Index Route
app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
});

//NewChat Route
app.get("/chats/new", (req, res) => {
    throw new ExpressError(404, "Page not found!");
    res.render("newChat.ejs");
});

//Create newChat Route
app.post("/chats", (req,res) =>{
    let {Sender, msg, Receiver} = req.body;
    let newChat = new Chat({
        sender: Sender,
        receiver: Receiver,
        message: msg,
        created_at: new Date()
    });
    newChat.save()
        .then(()=>{
            console.log("Chat was saved!");
        }) .catch(err =>{
            console.log(err);
        });
    // res.render("index.ejs");
    res.redirect("/chats");
});

//Show Route
app.get("/chats/:id", async(req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
        next(new ExpressError(404, "Chat not found!"));
    }
    res.render("editChat.ejs", {chat});
});

//Edit Route
app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("editChat.ejs", {chat});
});

//Update Route
app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let {newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {message: newMsg}, {runValidators: true, returnDocument:"after"}); 

    console.log(updatedChat);
    res.redirect("/chats");
});

//Delete Route
app.delete("/chats/:id", async (req,res) =>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

//For express app setup
app.get("/", (req,res)=>{
    res.send("root is working");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    let {status=500, message="Some error occurred"} = err;
    res.status(status).send(message);
});

//For express app setup
app.listen(port, ()=>{
    console.log(`Listening to port: ${port}`);
});