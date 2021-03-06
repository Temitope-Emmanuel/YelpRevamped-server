const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function(req, res, next) {
    try {
      let user = await db.User.create(req.body);
      let { id, username, profileImgUrl } = user;
      let token = jwt.sign(
        {
          id,
          username,
          profileImgUrl
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImgUrl,
        token
      });
    } catch (err) {
      console.log(err)
      if (err.code === 11000) {
        err.message = "Sorry, that username and/or email is taken";
      }
      return next({
        status: 400,
        message: err.message
      });
    }
  };
  


  exports.login = async function(req,res,next){
    console.log(`reching the sign in router`)
    try{
      const foundUser = await db.User.findOne({
        email:req.body.email
      })
      let {id,username,profileImgUrl} = foundUser
      let isMatch = await foundUser.comparePassword(req.body.password)
      if(isMatch){
        let token = jwt.sign({
         id,username,profileImgUrl 
        },
        process.env.SECRET_KEY
        )
        return res.status(200).json({
          token,id,username,profileImgUrl,
          message:"Congratulations you made it"
        })
      }else{
        return next({
          status:400,
          message:"Invalid Email/Password"
        })
      }
    }catch(e){
      return next({
        status:400,
        message:"Invalid Email/password"
      })
    }
  }