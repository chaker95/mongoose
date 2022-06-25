/** 1) Install & Set up mongoose */
let mongoose = require('mongoose');
const person = require('./person');
/*const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'Database_Checkpoint';      // REPLACE WITH YOUR DB NAME*/
class Database {
  constructor() {
    this._connect()
  }
_connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/Database_Checkpoint', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })

    .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()

/** 3) Create a 'Person' Model and requiring the schema from./person.js*/


let personModel = require('./person')
let createPerson = new personModel({
    name: "Amine Hamrouni",
    age: 30,
    favoriteFoods:[ "Pizza", "Pasta" , "Boritto" ],})

createPerson.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   });

   
/*4/- creating a list of people and save them in the database */
let arrayOfPeople = [
    {name: "rawand Mzoughi", age: 22, favoriteFoods: ["Tacos"]},
    {name: "Rim Chiboub", age: 24, favoriteFoods: ["Lablebi"]},
    {name: "Ibtycem Khedhri", age: 26, favoriteFoods: ["Kafteji"]},
    {name: "Nour Mekni", age: 29, favoriteFoods: ["S7an Tounsi"]},    
    {name: "Hana Mohamed", age: 28, favoriteFoods: ["Mosli"]}
  ];
   let test = personModel.create(arrayOfPeople, async (err, data) => {
    if (err){console.log(err)}
    await console.log(data)

} )

/*5 quering the database with model.find() and the name as the query*/
person.find({name:'Rim Chiboub'},(err,data)=>{
if (err) throw ('this is an error')
console.log(data)
})

/*quering with age */
person.find({age:29},(err,data)=>{
  if (err) throw ('this is an error')
  console.log(data)
  }) 
 
/*6 searching with .findOne() about food */
person.findOne({favoriteFoods:'Lablebi'}, (err,data)=>{
  if (err) throw err
  console.log(data)
}) 

/*7 quering using findByID()*/
let id = "60cbdb59fa417f13542891e6"
person.findById({_id:id},(err,data)=>{
if (err)throw err
console.log(data)
}) 

/* 8 Perform Classic Updates by Running Find, Edit, then Save*/
let id = "60cbe68b694451291cb3dc1c"
person.findByIdAndUpdate(
  {_id:id},
  {$push:{favoriteFoods:"Lablebi"}},
  (err,res)=>{
if (err)throw err
res.save()
console.log(res)
})
//9 Perform New Updates on a Document Using model.findOneAndUpdate()
person.findOneAndUpdate(
  {name:"rawand Mzoughi"},
  {$set:{age:20}},
  {new :true},
  (err,res)=>{
if (err)throw err
res.save()
console.log(res)
})
//10 Delete One Document Using model.findByIdAndRemove

let id ="60cbdb59fa417f13542891ea"
person.findByIdAndRemove(
  {_id:id},
  (err,data)=>{
if (err)throw err
console.log(data)
})

//11 MongoDB and Mongoose - Delete Many Documents with model.remove()
person.deleteMany({name:"mary"},(err,res)=>{
  if (err)throw err
  .done()
  console.log(res)
})
//12 Chain Search Query Helpers to Narrow Search Results
person.find({favoriteFoods:"Lablebi"})
.sort({name : "asc"})
.limit(2)
.select("-age")
.exec((err, data) => {
  if(err)
   throw (err);
 console.log(data);
})
