const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("middleware 1");
    next();
    console.log("After next of 1st MW");
});

app.use((req, res, next) => {
    console.log("middleware 2");
    return next();
    console.log("After next of 2nd MW; but doesn't run any code");
});

app.get("/", (req,res) => {
    res.send("Hi, I am a problem solver!");
});

app.get("/random", (req,res) => {
    res.send("Hi, This is random");
});

app.listen(8080, ()=> {
    console.log("Server listening to port 8080");
});