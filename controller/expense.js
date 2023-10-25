
const Expense = require('../model/data');
const User = require('../model/signup');
const sequelize = require('../util/database');

//adding data to database
exports.postData = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        const totalExpense = await user.update({ totalExpense: user.dataValues.totalExpense + +amount }, { transaction: t });
        const datas = await Expense.create({ amount: amount, description: description, category: category, userId: userId }, { transaction: t });
        const p = await t.commit();
        res.status(201).json({ datas: datas, totalExpense: totalExpense });
    }
    catch (err) {
        const p1 = await t.rollback();
        console.log('error in adding data to db from controller');
        console.log(err);
        res.status(500).json({ error: err });
    }
}

//get All data from database
exports.getAllData = async (req, res, next) => {
    try {
        const id = req.user.id;
        console.log(id);
        const datas = await Expense.findAll({ where: { userId: id } });
        res.status(201).json({ datas: datas });
    }
    catch (err) {
        console.log('error in getting all data from controller');
        console.log(err);
        res.status(500).json({ error: err });
    }
}

//delete specific data from database
exports.postDelete = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const productid = req.body.id;
        const userid = req.user.id;
        const user = await User.findByPk(userid);

        const deldata = await Expense.findAll({ where: { id: productid, userId: userid } });
        const totalExpense = await user.update({ totalExpense: user.dataValues.totalExpense - +deldata[0].amount }, { transaction: t })
        const data = await deldata[0].destroy({ transaction: t });
        const p = await t.commit();
        res.status(201).json({ data: data, totalExpense: totalExpense });
    }
    catch (err) {
        const p = await t.rollback();
        console.log('error in deleting in db from controller');
        console.log(err);
        res.status(500).json({ error: err });
    }
}


//checking if user is premium or not
exports.checkPremiumUser = async (req, res, next) => {
    try {
        const userid = req.user.id;
        const user = await User.findByPk(userid);
        res.status(201).json({ flag: user.isPremiumUser })
    }
    catch (err) {
        console.log(err);
    }
}


