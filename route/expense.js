const express=require('express');
const router=express.Router()

const expenseController=require('../controller/calculate');

router.post('/add' , expenseController.postData);
router.post('/delete' , expenseController.postDelete);
router.get('/data' , expenseController.getAllData);
router.post('/edit' , expenseController.postEditData);
router.post('/update' , expenseController.postUpdateData);
module.exports = router;