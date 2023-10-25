const Expense = require('../model/data');
const User = require('../model/signup');
const sequelize = require('../util/database');



exports.getleaderboarddata = async(req,res,next) => {
    try{
      const leaderboardExpense = await User.findAll({
        attributes: ['name', 'totalExpense']
      });
      console.log(leaderboardExpense);
    res.status(201).json({datas:leaderboardExpense});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
    
}