const express=require('express');
const router=express.Router();

const signController = require('../controller/signup');

router.get('/user/signup', signController.getSignupPage);
router.get('/user/login/getData/:email', signController.getUserData);

router.post('/user/signup/addUser', signController.addUser);

module.exports = router;