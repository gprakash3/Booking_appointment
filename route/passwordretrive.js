const express=require('express');
const router=express.Router();
const emailController = require('../controller/passwordretrive');

router.post('/password/forgotpassword' , emailController.sendEmail);


module.exports = router;