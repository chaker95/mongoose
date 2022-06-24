const mongoose = require("mongoose");
const Person = require("./Models/person");

// Connecting to Data Base
mongoose
    .connect("mongodb://127.0.0.1:27017/person", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Connect To DB .. "))
    .catch((err) => console.log(err));
/**************************************************/
// Create and Save a Record of a Model
const person = new Person({
    name: "hatem kthiri",
    age: 23,
    favoriteFoods: ["Sandwitch", "Pizza"],
});
person.save(() => {
    console.log("Person Added succesfully !!!");
});
/**************************************************/

// Create Many Records
arrayOfPeople = [
    {
        name: "John",
        age: 34,
        favoriteFoods: ["Sandwitch", "Salade"],
    },
    {
        name: "Doe",
        age: 40,
        favoriteFoods: ["poisson", "Sandwitch"],
    },
    {
        name: "Smith",
        age: 43,
        favoriteFoods: ["Salade", "Poisson"],
    },
];
Person.create(arrayOfPeople, (err, data) => {
    if (err) {
        console.log(err);
    } else console.log("Many Records Added Succefully:");
});

/**************************************************/

// Use Person.find() to Search Your Database

Person.find({}, (err, data) => {
    if (err) {
        console.log(err);
    } else console.log(data);
});

/**************************************************/

//Use model.findOne() to Return a Single Matching Document from Your Database

Person.findOne({ favoriteFoods: "Sandwitch" }, (err, data) => {
    if (err) {
        console.log(err);
    } else console.log(data);
});
/**************************************************/

//Use model.findById() to Search Your Database By _id

Person.findById({ _id: "60fff6fa8114bb0a300ff2fb" }, (err, data) => {
    if (err) {
        console.log(err);
    } else console.log(data);
});

/**************************************************/

//Perform Classic Updates by Running Find, Edit, then Save

Person.findByIdAndUpdate(
    "60fff6fa8114bb0a300ff2fb",
    { $push: { favoriteFoods: "hamburger" } },
    (err, data) => {
        if (err) {
            console.log(err);
        } else console.log(data);
    }
);

/**************************************************/

//Perform New Updates on a Document Using model.findOneAndUpdate()

Person.findOneAndUpdate({ name: "Doe" }, { age: 20 }, (err, data) => {
    if (err) {
        console.log(err);
    } else console.log(data);
});

/**************************************************/

//Delete One Document Using model.findByIdAndRemove

Person.findByIdAndRemove("60fff19e795f2a1e004fab91", (err, data) => {
    if (err) {
        console.log(err);
    } else console.log(data);
});

/**************************************************/

//MongoDB and Mongoose - Delete Many Documents with model.remove()

Person.deleteMany({ name: "Mary" }, (err, data) => {
    if (err) {
        console.log(err);
    } else console.log(data);
});

/**************************************************/

//Chain Search Query Helpers to Narrow Search Results

Person.find({ favoriteFoods: "Sandwitch" }) // find Person
    .limit(2) // limit to Two
    .sort({ name: 1 }) // sort ascending by name
    .select({ age: false }) // Make age hidden
    .exec((err, data) => {
        if (err) {
            console.log(err);
        } else console.log(data);
    });
