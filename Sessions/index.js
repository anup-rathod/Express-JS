const express = require("express");
const app = express();
const session = require("express-session")

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};
                                                                                            //we can also do like this
app.use(session( sessionOptions ))                                                         //app.use(session({
                                                                                                            //     secret: "mysupersecretstring",
                                                                                                            //     resave: false,
                                                                                                            //     saveUninitialized: true,
                                                                                                            // }))

// app.get("/test", (req, res) => {
//     res.send("test successful!")
// })

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    req.flash("success", "user registered successfully")
    res.redirect("/hello");
})

app.get("/hello", (req, res) => {
    res.send(`Hello ${req.session.name}`)
})

app.get("/", (req, res) => {
    res.send("Home");
});



let port = 8080;
app.listen(port, () => {
    console.log(`Listening to ${port}`);
});