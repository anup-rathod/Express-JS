const mongoose = require("mongoose")

main()
    .then(() => {
        console.log("connection successfull");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
    name : String,
    email : String, 
    age : Number,
})

const User = mongoose.model("User", userSchema)

User.insertMany([
    {name: "Tony ", email: "tony@gmail.com", age: 48},
    {name: "Bruce ", email: "bruce@gmail.com",age: 34},
    {name: "Tim ", email: "tim@gmail.com", age: 23},
]).then((res) => {
    console.log(res)
})

User.find({ age : { $gte : 34}})
.then((data) => {
    console.log(data[0].name);
})