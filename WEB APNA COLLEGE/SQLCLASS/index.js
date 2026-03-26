const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'delta_app',
    password : 'MrDash@4816'
});

// let q="SHOW TABLES";
// let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
// let user = ["123", "123_newuser", "abc@gmail.com", "abc"];



let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password()
    ];
};

let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let users = [["101", "123_newusera", "abc@gmail.com", "abc"],
//              ["102", "123_newuserb", "abcb@gmail.com", "abcb"],
//              ["103", "123_newuserc", "abcc@gmail.com", "abcc"],
// ];

let data = [];
for(let i=0; i<100; i++){
    data.push(getRandomUser());     //100 fake user's data
}

try{
    connection.query(q, [data], (err, result) => {
        console.log(result);
    });
} catch(err){
    console.log(err);
}

connection.end();


// let getRandomUser = () => {
//     return {
//         id : faker.string.uuid(),
//         username : faker.internet.username(),
//         email : faker.internet.email(),
//         password : faker.internet.password()
//     };
// };

// console.log(getRandomUser());