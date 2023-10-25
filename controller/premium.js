const Expense = require('../model/data');
const User = require('../model/signup');
const sequelize = require('../util/database');



exports.getleaderboarddata = async(req,res,next) => {
    try{
      const leaderboardExpense = await User.findAll({
        attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.amount')),'total_cost']],
        include: [{
            model:Expense,
            attributes : []
        }],
        group:['user.id'],
        order:[[sequelize.col('total_cost'), 'DESC']]
      });
      console.log(leaderboardExpense);
    res.status(201).json({datas:leaderboardExpense});
    }
    
    
    catch(err){
        console.log(err);
    }
    
}