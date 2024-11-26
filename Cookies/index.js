const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
// app.use(cookieParser())  => this is used when we do not want signed cookies

app.get("/getcookies", (req, res) => {
    console.dir(req.cookies)
    res.send("got cookies")
})

app.get("/getcookiename", (req, res) => {
    let {name = "anonymous" } = req.cookies;
    res.send(`Hi ${name}`)
})

//signed cookie
app.use(cookieParser("secretcode"));  

app.get("/getsignedcookie", (req, res)=> {
    res.cookie("color", "red", {signed: true});
    res.send("done!");
})

//verify signed signature
app.get("/verify", (req, res) => {
    console.log(req.signedCookies)  //=> TO print signedCookied we need req.signedCookies
    res.send(req.signedCookies);
})

app.get("/", (req, res) => {
    res.send("Home")
})

app.get("/setcookies", (req, res)=> {
    res.cookie("greet", "namaste");
    res.cookie("made-in", "India")
    res.send("sent you cookies");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000"); 
});