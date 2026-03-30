const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override") 
require("dotenv").config();

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD
});

// let q="SHOW TABLES";
// let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
// let user = ["123", "123_newuser", "abc@gmail.com", "abc"];



// let getRandomUser = () => {
//     return [
//         faker.string.uuid(),
//         faker.internet.username(),
//         faker.internet.email(),
//         faker.internet.password()
//     ];
// };

// let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let users = [["101", "123_newusera", "abc@gmail.com", "abc"],
//              ["102", "123_newuserb", "abcb@gmail.com", "abcb"],
//              ["103", "123_newuserc", "abcc@gmail.com", "abcc"],
// ];

// let data = [];
// for(let i=0; i<100; i++){
//     data.push(getRandomUser());     //100 fake user's data
// }

// try{
//     connection.query(q, [data], (err, result) => {
//         console.log(result);
//     });
// } catch(err){
//     console.log(err);
// }

// connection.end();

//Home Route
app.get("/", (req,res)=>{
    let q = `SELECT count(*) FROM  user`;
    try{
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs", {count});
        });
    } catch(err){
        console.log(err);
        res.send("Some error in DB");
    }
});

//Show Route
app.get("/users", (req,res)=>{
    let q = `SELECT * FROM user`;
    try{
        connection.query(q, (err, users ) => {
            if (err) throw err;
            res.render("showusers.ejs", {users});
        });
    } catch(err){
        console.log(err);
        res.send("Some error in DB");
    }
});

//Edit Route
app.get("/user/:id/edit", (req,res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q, (err, result ) => {
            if (err) throw err;
            let user = result[0];
            res.render("edit.ejs", {user});
        });
    } catch(err){
        console.log(err);
        res.send("Some error in DB");
    }
});

//Update (DB) Route
app.patch("/user/:id", (req,res) =>{
    let {id} = req.params;
    let {password : formPass, username : newUsername} = req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q, (err, result ) => {
            if (err) throw err;
            let user = result[0];
            if (formPass != user.password){
                res.send("Wrong Password");
            } else {
                let q2 = `UPDATE user SET username = '${newUsername}' WHERE id='${id}'`;
                connection.query(q2, (err, result) =>{
                    if (err) throw err;
                    res.redirect("/users"); 
                });
            }
        });
    } catch(err){
        console.log(err);
        res.send("Some error in DB");
    }
});

//Add User Route
app.get("/user/addUser", (req,res) =>{
    res.render("addUser.ejs");
});

app.post("/user/addUser", (req,res) => {
    let { id, username, email, password } = req.body;
    let q = `INSERT INTO user VALUES ('${id}', '${username}', '${email}', '${password}');`
    try{
        connection.query(q, (err,result) => {
            if (err) throw err;
            console.log("Successfully Added");
            res.redirect("/users");
        });
    } catch(err) {
        console.log(err);
        res.send("Some error in DB"); 
    }
});

//Delete route
app.get("/user/:id/delete", (req, res) => {
    let {id} = req.params; 
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render("delete.ejs", {user});
        });
    } catch(err){
        console.log(err);
        res.send("Some error in DB");    
    }
});

app.delete("/user/:id/", (req,res) => {
    let {id} = req.params;
    let {username : fusername, password : fpassword} = req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q, (err, result ) => {
            if (err) throw err;
            let user = result[0];
            if (fusername != user.username || fpassword != user.password){
                res.send("Wrong Credentials");
            } else {
                let q2 = `DELETE FROM user WHERE id='${id}'`;
                connection.query(q2, (err, result) =>{
                    if (err) throw err;
                    console.log(result);
                    console.log("Deleted!");
                    res.redirect("/users");
                });
            }
        });
    } catch (err){
        console.log(err);
        res.send("Some error in DB");
    }
});

app.listen("8080", ()=> {
    console.log("server is listening to port 8080.");
});

// let getRandomUser = () => {
//     return {
//         id : faker.string.uuid(),
//         username : faker.internet.username(),
//         email : faker.internet.email(),
//         password : faker.internet.password()
//     };
// };

// console.log(getRandomUser());