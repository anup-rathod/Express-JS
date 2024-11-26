const express = require("express");
const app = express();

app.use(express.json());

function Middleware(req, res, next) {
    let username = req.headers.username; 
    let password = req.headers.password; 


    if (username !== "anup" || password !== "pass") {
        res.status(403).json({
            message: "Incorrect inputs in username or pass"
        });
    } else {
        next();
    }
}

function KidneyMiddleware(req, res, next) {
    let kidneyId = req.headers.kidneyid;

    
    if (kidneyId !== "1" && kidneyId !== "2") {
        res.status(403).json({
            message: "Incorrect inputs"
        });
    } else {
        next();
    }
}

app.get("/health", Middleware, KidneyMiddleware, function(req, res) {
    res.send("Kidney is fine"); 
});

app.listen(3000, () => {
    console.log("Server is running on port 3000"); 
});
