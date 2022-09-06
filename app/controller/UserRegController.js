var userRegModel = require('../model/UserRegModel');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
// console.log("RRRR ", proModel)
// Create and Save a new Note

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create = async (req, res) => {

        // Validate request
        // res.send(req.body.name);
        if(!req.body.name) {
            return res.status(400).send({
                message: "Name can not be empty"
            });
        }
        // if(!req.body.phone) {
        //     return res.status(400).send({
        //         message: "Phone can not be empty"
        //     });
        // }
    
        // Create a Note
   
        const checkUser = await userRegModel.findOne({ email:req.body.email });

        if (checkUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }

            let hashPassword =  await bcrypt.hash(req.body.password,10);

            var User = new userRegModel({
                name:   req.body.name, 
                email:  req.body.email,
                password: hashPassword,
                role: req.body.role
            });
        
            // Save Note in the database
            User.save()
            .then(data => {
                res.send(data);
            
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    userRegModel.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

    // res.send(req.params.id);
    userRegModel.findById(req.params.id)
    .then(user =>{
        res.send(user);
    }).catch(err => {

        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });

    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    userRegModel.findByIdAndUpdate(req.params.id, {$set: req.body} )
    .then( update => {
        res.send('User udpated.');
    }).catch(err => {

        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};

// exports.findByParams = (req, res) => {

//     // var User = new userModel({
//     //     name:   req.body.name,
//     // });
//     // res.send(req.body.name);
//     userModel.find({name:req.body.name})
//     .then(notes => {
//         res.send(notes);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving notes."
//         });
//     });

// }

// with like statement.
exports.findByParams = (req, res) => {

    // var User = new userModel({
    //     name:   req.body.name,
    // });
    // res.send(req.body.name);
    let q = req.body.name;
    userRegModel.find({name:{"$regex": q , "$options": "i"}})
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

}