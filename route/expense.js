const express=require('express');
const router=express.Router()

const expenseController=require('../controller/calculate');

router.post('/addData' , expenseController.postData);
router.post('/delete' , expenseController.postDelete);
router.get('/getAllData', expenseController.getAllData);
module.exports = router;