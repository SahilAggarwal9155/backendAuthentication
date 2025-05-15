const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/User')

require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'User already existed' })
    }

    let hashedPassword
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error in hash Password',
      })
    }

    const userdb = await User.create({
      name,email,password: hashedPassword,role
    })

    return res.status(200).json({success: true, message: 'User created successfully'})
  } catch (err) {
    return res.status(400).json({success: false, message: 'There is error in createing user with hashed password'})
  }
}


//login code

exports.login = async(req,res)=>{
  try{
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        message: "Please fill the details carefully"
      })
    }

    let user = await User.findOne({email});

    if(!user) return res.status(401).json({message: 'User is not registered'});

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const passwordVerify = await bcrypt.compare(password, user.password);
    //verfiy password and genreate token
    if(passwordVerify) {
      //ppassword is matched
      let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '2h'});

      user=user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
         expires: new Date( Date.now() + 3*24*60*60*1000),
         httpOnly: true
      };

      res.cookie('token',token,options).status(200).json({
        success: true,
        token,
        user, message: 'User logged in successfully'
      })
      
    }else{
      return res.status(403).json({
        message: 'Password Incorrect'
      })
    }
  }
  catch(err){
    return res.status(400).json({
      success: false,
      error: err.message,
      message: "Internal server error"
    })
  }
}