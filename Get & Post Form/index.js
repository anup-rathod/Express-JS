const express = require("express")
const app = express()
const port = 8080;

app.use( express.urlencoded ( { extended: true } ) )
app.use(express.json())

app.get("/register", (req, res) => {
    let { user, password} = req.query;
    res.send(`Standard Get Response, Welcome ${user}`);
})
app.post("/register", (req, res) => {
    let {user , password } = req.body;
    res.send(`Standard Post Response, user:${user } password: ${password}` )
})


app.listen( port, () => {
    console.log(`Listening to ${port}`);
})