const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// app.use((req, res, next) => {
//     console.log("middleware 1");
//     next();
//     console.log("After next of 1st MW");
// });

// app.use((req, res, next) => {
//     console.log("middleware 2");
//     return next();
//     console.log("After next of 2nd MW; but doesn't run any code");
// });


// app.use("/api", (req, res, next) =>{
//     let {token} = req.query;
//     if(token === "giveaccess"){
//         next();
//     }
//     res.send("Access Denied!");
// });

const checkToken = (req, res, next) =>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }
    // res.send("Access Denied!");
    throw new ExpressError(401, "Access Denied!");
};

//logger
app.use("/", (req, res, next) => {
    req.time = new Date(Date.now());
    console.log(req.method, req.hostname, req.path, req.time);
    next();
});

app.use("/random", (req, res, next) => {
    console.log("This is only for random");
    next();
});

app.get("/", (req,res) => {
    res.send("Hi, I am a problem solver!");
});


// API access token
app.get("/api", checkToken, (req, res)=> {
    res.send("data");
});

app.get("/random", (req,res) => {
    res.send("Hi, This is random");
});

app.get("/wrong", (req,res) => {
    abcd = abcd;
});

// Custom Error Handling
app.use((err, req, res, next) => {
    console.log("---------error----------");
    res.send(err);
});

// Error 404
// app.use((req, res) => {
//     res.status(404).send("Page not found!");
// });

app.listen(8080, ()=> {
    console.log("Server listening to port 8080");
});