const express = require("express");

const app = express();

let port = 8080;

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

// app.use((req,res) => {
//     console.log("request received!");
//     res.send("This is a basic response");
// })

app.get("/", (req,res) => {
    res.send("You contacted root path!");
});

// app.get("/apple", (req,res) => {
//     res.send("You contacted apple path!");
// });

// app.get("/orange", (req,res) => {
//     res.send("You contacted orange path!");
// });

// app.get("*", (req,res) => {
//     res.send("This path doesn't exist!");
// });

app.get("/:username/:id", (req,res) => {
    let {username, id} = req.params;
    res.send(`This account belongs to @${username}`);
    console.log({username, id});
});

app.get("/search", (req,res) => {
    let {q} = req.query;
    if (!q){
        res.send("nothing searched!");
    }
    res.send(`<h1>search results for query: ${q}</h1>`);
});