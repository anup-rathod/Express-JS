const express = require ("express");

const app = express();

let port = 3000;

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})

// app.use((req,res) => {
//     console.log('Request Received');
//     // res.send({
//     //     fruit: 'apple',
//     //     color: 'red',
//     // })
//     let code = "<h1>Fruits</h1> <ul><li>apple</li><li>orange</li></ul>"
//     res.send(code)

// })

// app.get( "/",  (req, res) => {
//     res.send("Hello I am Root");
// })

// app.get( "/about",  (req, res) => {
//     res.send("You Contacted About Page");
// })

// app.get( "*",  (req, res) => {
//     res.send("This page doesn't exist");
// })

// app.post("/", (req, res) => {
//     res.send("You send a Post Request")
// })

app.get( "/",  (req, res) => {
    res.send("Hello I am Root");
})

//To send Variable Path we use : (colon) & params accepts Parameter that user gives
app.get( "/:username/:id",  (req, res) => {
    let { username, id} = req.params;
    let code = `<h1>Welcome @${username} your id is ${id}</h1>`
    res.send(code);
})
//TO Search in Query parameter
app.get("/search", (req , res) => {
    
    let { q } = req.query;

    if(!q){
        res.send("Nothing Entered in Query")
    }
    else{
        let code = `<h1>Your Searched query is : ${q}</h1>`
        res.send(code)
    }
})