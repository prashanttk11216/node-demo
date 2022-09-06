var userModel = require('../model/UserModel');
const mongoose = require("mongoose");
// console.log("RRRR ", proModel)
// Create and Save a new Note

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create = (req, res) => {

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
        var User = new userModel({
            name:   req.body.name, 
           
            email:  req.body.email,
            subject: req.body.subject
        });
    
        // Save Note in the database
        User.save()
        .then(data => {
            res.send({"status":"Success"});
        
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    userModel.find()
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
    userModel.findById(req.params.id)
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
    userModel.findByIdAndUpdate(req.params.id, {$set: req.body} )
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

    uid = req.body.uid;
    userModel.remove({"_id":uid})
    .then(data=>{

        res.send('User Deleted Succesfuly.');
    }).catch(err => {

        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
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
    userModel.find({name:{"$regex": q , "$options": "i"}})
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

}

// For Admin Auth

exports.findByAdmin= (req, res) => {

    res.send('Admin Route');
}

exports.findByUser= (req, res) => {

    res.send('User Route');
}

exports.logout = (req,res)=>{


    res.cookie("jwt", "", { maxAge: "1" });
    res.send("Logged out!");
}

