const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'delta_app',
    password : 'MrDash@4816'
});

try{
    connection.query("SHOW TABLES", (err, result) => {
        console.log(result);
    });
} catch(err){
    console.log(err);
}

connection.end();


let getRandomUser = () => {
    return {
        id : faker.string.uuid(),
        username : faker.internet.username(),
        email : faker.internet.email(),
        password : faker.internet.password()
    };
};

// console.log(getRandomUser());