var MongoClient = require('mongoose');
var Schema = MongoClient.Schema;

var userRegSchema = new MongoClient.Schema({
    fname: String,
    lname: String,
    email:String,
    password:String,
    profile_pic:String,
    role:String
}, {
    timestamps: true
});

var userModel=MongoClient.model('users',userRegSchema);

module.exports = userModel;