var MongoClient = require('mongoose');
var Schema = MongoClient.Schema;

var userSchema = new MongoClient.Schema({
    name: String,
    phone: String,
    email:String,
    subject:String
}, {
    timestamps: true
});
var userModel=MongoClient.model('userdata',userSchema);
module.exports = userModel;