
const Expense = require('../model/data');

//adding data to database
exports.postData = async (req, res, next) => {
    try {
        console.log(req.body);
        if(!req.body.amount){
            throw new Error('Enter valid amount');
        }
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
        let data = await Expense.create({
            amount: amount,
            description: description,
            category: category
        });
        res.status(201).json({ expensedata: data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ Error: err });
    }
}

//get All data from database
exports.getAllData = async (req, res, next) => {
    try {
        let datas = await Expense.findAll();
        res.status(201).json({ datas: datas });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

//delete specific data from database
exports.postDelete = async (req, res, next) => {
    try {
        Expense.findAll({
            where: {
                amount: req.body.amount,
                description: req.body.description,
                category: req.body.category
            }
        })
            .then(datas => {
                console.log('deleted from database');
                return datas[0].destroy();
                 
            })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

//get ID from database to edit
exports.postEditData = async (req, res, next) => {
    try {
        if(!req.body.amount){
            throw new Error('Enter valid amount');
        }
        let datas = await Expense.findAll({
            where: {
                amount: req.body.amount,
                description: req.body.description,
                category: req.body.category
            }
        })

        res.status(201).json({ datas: datas })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

//Update data to database
exports.postUpdateData = async (req,res,next) => {
    try{
        const updatedamount = req.body.amount;
        const updateddescription = req.body.description;
        const updatedcategory = req.body.category;
        let datas = await Expense.findAll({ where: {id:req.body.editId}});
        datas[0].amount= updatedamount;
        datas[0].description = updateddescription;
        datas[0].category = updatedcategory;
        return datas[0].save();
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

