
const Expense = require('../model/data');

//adding data to database
exports.postData = async(req,res,next) => {
    try{
    const amount= req.body.amount;
    const description= req.body.description;
    const category=req.body.category;
    const userId = req.user.id;
        const datas= await Expense.create({amount:amount, description:description, category:category, userId:userId});
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
        const id=req.user.id;
        console.log(id);
        const datas = await Expense.findAll({where:{userId:id}});
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
        const productid=req.body.id;
        const userid=req.user.id;
        const deldata= await Expense.findAll({where:{id:productid, userId:userid}});
        const data = await deldata[0].destroy();
        res.status(201).json({data:data});
    }
    catch(err){
        console.log('error in deleting in db from controller');
        console.log(err);
        res.status(500).json({error:err});
    }
}



