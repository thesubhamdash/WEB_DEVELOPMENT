const express = require("express");
const app = express();

app.get("/", (req,res) => {
    res.send("Hi, I am a problem solver!");
});

app.listen(8080, ()=> {
    console.log("Server listening to port 8080");
});