const mongoose = require("mongoose");

const Chat = require("./models/chat.js");

main()
    .then(()=> {
        console.log("Connection Successful");
    })
    .catch ((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakeChitChat");
}

let allChats = [
    {
        sender: "Virat",
        receiver: "Subham",
        message: "Wanna play Cricket? Win!",
        created_at: new Date(),
    },
    {
        sender: "Anushka",
        receiver: "Virat",
        message: "Wanna Date? Win!",
        created_at: new Date(),
    },
    {
        sender: "Kohli",
        receiver: "Gill",
        message: "Dil Jeet liya veere",
        created_at: new Date(),
    },
    {
        sender: "Subham",
        receiver: "Khushi",
        message: "Wanna Date? Be worthy!",
        created_at: new Date(),
    },
    {
        sender: "Khushi",
        receiver: "Subham",
        message: "Wanna Date? Look Good!",
        created_at: new Date(),
    },
    {
        sender: "Gill",
        receiver: "Virat",
        message: "Oye Paaji, firse century!",
        created_at: new Date(),
    },
    {
        sender: "Balen",
        receiver: "Harke",
        message: "Kaan na kha, gu kha",
        created_at: new Date(),
    }
];

Chat.insertMany(allChats);