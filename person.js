
//initializing person prototype with a Schema
let mongoose = require('mongoose');

const { Schema } = mongoose;

const person = new Schema({
  name: String,
  age: Number,
  favoriteFoods:[  String  ],
  required: Boolean,
  unique: Boolean,
  lowercase: Boolean,
 
});
module.exports = mongoose.model('Person', person);
///Create and Save a Record of a Model:

