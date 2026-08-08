const mongoose = require("mongoose");

main()
    .then(() => {
        console.log("Connection Successful");
    }).catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon")
}

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    author : {
        type: String,
    },
    price : {
        type: Number,
        min: [1, "Please enter a valid string!"],
    },
    genre : [String],
    discount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ["fiction", "non-fiction"],
    },
});

const book = mongoose.model("Book", bookSchema);

let book1 = new book({
    title: "Spiderman 3",
    author: "MVC",
    price: 6000,
    genre: ["fiction", "comics", "superhero"]
});

book1
    .save()
    .then(res => {
    console.log(res);   
    })
    .catch(err => {
    console.log(err);
    });