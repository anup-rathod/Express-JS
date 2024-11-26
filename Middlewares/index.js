const express = require("express")
const app = express()
const port = 3000;
const ExpressError = require("./ExpressError")

// app.use((req, res, next) => {
//     console.log("hi, I am middleware")
//     next();
// })

// app.use((req, res, next) => {
//     console.log("hi, I am 2nd middleware ")
//     next();
// })

//TO use access token 
app.use("/api", (req,res, next) => {
    let { token } = req.query;
    if( token === "giveaccess" ){
        next()
    }
        throw new ExpressError(401, "Access Denied")
        //res.send("Access Denied!")   //we can also pass error as => throw new Error("Access Denied")
})

app.use("/api", (req, res, next) => {
    res.send("DATA")
    next()
})

//logger
app.use("/logger", (req, res, next) => {
    console.log(req.method, req.hostname, req.path, req.time);
    next()
})


app.get( "/", ( req, res ) => {
    res.send("I am root Page");
})

app.get( "/random", ( req, res ) => {
    res.send("I am random Page");
})

app.get("/err", (req, res) => {
    abcd =abcd;
})

app.get("/admin", (req, res) => {
    throw new ExpressError(403, "Access to admin is Forbidden")
})  //=> custom error msg

app.use((err, req, res, next) => {
    console.log("-----------Error------------");
    let {status = 500, message = "Some Error Occurred"} = err;  // => status = 500, message = "Some Error Occurred": That is Default value when we do not throw an error by default it will show
    res.status(status).send(message);
    // next(err);
    // res.send(err) // => give error in an object with status code & msg
});

//404
// app.use((req, res) => {
//     res.status(404).send("404 page not Found");
// })

app.listen( 3000, () => {
    console.log(`Listening to port : ${port}`);
})