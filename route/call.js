const express = require('express');

const userController = require('../controller/booking');

const router = express.Router();

router.post('/add' , userController.postAddUser);
router.get('/data' , userController.getAllData);
router.post('/delete' , userController.postDeleteUser);

module.exports=router;