var MongoClient = require('mongoose');
var Schema = MongoClient.Schema;

var userRegSchema = new MongoClient.Schema({
    name: String,
    email:String,
    password:String,
    role:String
}, {
    timestamps: true
});
var userRegModel=MongoClient.model('user_registration',userRegSchema);
module.exports = userRegModel;