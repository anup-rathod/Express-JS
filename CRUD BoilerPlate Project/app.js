const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then( () => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded ({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("hii, i am root");
})
//[ Index Route ]
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})

//[ Add New ] => Shows only page to add new listings
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
})

//[ Create Route ] => Adds New
app.post("/listings", async(req, res ) => {
    // let { title, description, image, price, country, location } = req.body
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//[ Show Route ] => Shows whatever listings you have selected
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})

//[ Edit Route ] => Shows only Edit Page
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

//[ Update Route ] => Edit in Listings
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");
})

// [ Delete Route ] => Delete Listing
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listings", )
}) 


//Testing List
// app.get("/testinglist", async(req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calanguta, Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log(sampleListing);
//     res.send("successfull")
// })

let port = 3000;
app.listen(port, () => {
    console.log("server is listening to port", port)
})