
const Expense = require('../model/data');

//adding data to database
exports.postData = async(req,res,next) => {
    try{
    const amount= req.body.amount;
    const description= req.body.description;
    const category=req.body.category;
        const datas= await Expense.create({amount:amount, description:description, category:category});
        res.status(201).json({datas:datas})
    }
    catch(err) {
        console.log('error in adding data to db from controller');
        console.log(err);
        res.status(500).json({error:err});
    }
}

//get All data from database
exports.getAllData = async (req, res, next) => {
    try{
        const datas = await Expense.findAll();
        res.status(201).json({datas:datas});
        }
        catch(err){
            console.log('error in getting all data from controller');
            console.log(err);
            res.status(500).json({error:err});
        }
}

//delete specific data from database
exports.postDelete = async (req, res, next) => {
    try{
        const id=req.body.id;
        const deldata= await Expense.findByPk(id);
        const data = await deldata.destroy();
        res.status(201).json({data:data});
    }
    catch(err){
        console.log('error in deleting in db from controller');
        console.log(err);
        res.status(500).json({error:err});
    }
}



