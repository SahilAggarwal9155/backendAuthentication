//auth , isStudent, isAdmin
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = async (req, res, next) => {
  try {
    //extrraction of jwt token for role
    const token = req.body.token

    if (!token)
      return res.status(400).json({ message: 'Token not found in data' })

    //verfiy the token
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decodedToken)

      req.user = decodedToken
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: 'Token is not valid. Please try again',
      })
    }
    next()
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Internal Error something went wrong',
    })
  }
}

exports.isStudent = async (req, res, next) => {
  try {
    //extrraction of jwt token for role
    if (req.user.role !== 'Student') {
      return res.status(200).json({
        success: false,
        message: 'It is not student role.',
      })
    }

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Internal Error something went wrong',
    })
  }
}

exports.isAdmin = async (req, res, next) => {
  try {
    //extrraction of jwt token for role
    if (req.user.role !== 'Admin') {
      return res.status(200).json({
        success: false,
        message: 'It is not admin role authenctication.',
      })
    }

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Internal Error something went wrong',
    })
  }
}
