var userRegModel = require('../model/UserRegModel');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
let TOKEN_KEY = "d045d8599b645952e0f5024635036266ea4f7c2739aa2523b29a0452d7adb78658a7c9";

exports.login = async (req, res) => {

    try
    {

    if(!req.body.email && !req.body.password)
    {
        return res.status(400).send({
            message: "All Fields Required!"
        });
    }

    let checkUser = await userRegModel.findOne({email:req.body.email});

    if(checkUser && bcrypt.compare(req.body.password,checkUser.password))
    {
        let maxAge = 3 * 60 * 60;
        const token = await jwt.sign(
            { user_id: checkUser._id, user_email:checkUser.email,role:checkUser.role },
            TOKEN_KEY,
            {
              expiresIn: maxAge,
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });

          // save user token
        //   checkUser.utoken = token;

      // user
      res.status(200).json({user:checkUser,token:token});
      return;

    }
    else
    {
    res.status(400).send("Invalid Credentials");
    return;
    }

}
catch(err)
{
    res.status(500).send({
        message: err.message || "Some error occurred while login."
    });
}
}