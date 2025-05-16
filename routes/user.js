const express = require('express');

const router = express.Router();

const { signup,login } = require('../controllers/Auth');
const { auth, isStudent, isAdmin} = require('../middlewares/authmiddleware');


router.post('/login',login);
router.post('/signup',signup);

//protectedRoutes

//dummy testing route
router.get('/',auth,(req,res)=>{
  
})


router.get('/student', auth, isStudent, (req,res)=>{
  res.json({
    success: true,
    message: "Welcome to protected student routes"
  })
})

router.get('/admin', auth, isAdmin, (req,res)=>{
  res.json({
    success: true,
    message: "Welcome to protected admin routes"
  })
})



module.exports = router;