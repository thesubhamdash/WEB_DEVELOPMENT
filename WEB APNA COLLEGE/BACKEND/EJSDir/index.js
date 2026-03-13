const express = require("express");

const app = express();

const port = 8080;

const path = require("path");

app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req,res) => {
    res.render("home.ejs");
})

app.get("/hello", (req,res) => {
    res.send("hello");
})

app.get("/ig/:username", (req,res) => {
    const followers = ["Aayush", "Subham", "Nirmala", "Suresh"];
    let { username } = req.params;
    res.render("instagram.ejs", {username, followers});
});

app.get("/istg/:username", (req,res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data){
        res.render("insta.ejs", {data});
    }
    else{
        res.render("error.ejs");
    }
});

app.get("/rolldice", (req,res) => {
    let num = Math.floor(Math.random()*6) + 1;
    res.render("rolldice.ejs", {num});
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});