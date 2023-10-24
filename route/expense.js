const express=require('express');
const router=express.Router()

const expenseController=require('../controller/expense');
const userauth=require('../middleware/auth');

router.post('/addData' ,userauth.authenticate, expenseController.postData);
router.post('/delete' ,userauth.authenticate ,expenseController.postDelete);
router.get('/getAllData',userauth.authenticate, expenseController.getAllData);
module.exports = router;