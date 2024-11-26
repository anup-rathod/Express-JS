const express = require ("express");

const app = express();

let port = 3000;

app.listen(port, () => {
    console.log(`Listening to the port localhost:${port}`);
})

app.get( "/",  (req, res) => {
    res.send("Hello I am home");
})
