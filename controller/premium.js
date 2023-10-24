const Expense = require('../model/data');
const User = require('../model/signup');

var curobj = []

exports.getleaderboarddata = async(req,res,next) => {
    try{
    const count= await User.count({distinct: true});
    console.log(count);
    for(let i=1;i<=count;i++){
    let totalexpense,username;
    Expense.findAll({where:{userId:i}}).then(expense => {
        totalexpense = 0;
        for(let j=0;j<expense.length;j++)
        {
             totalexpense = totalexpense + expense[j].dataValues.amount;
        }       
    }).catch(err => console.log(err));
        
        const user = await User.findByPk(i);
        console.log(user.name, totalexpense);
        
         curobj = [...curobj, {name:user.name, expense:totalexpense}]
        }
         console.log(curobj);
    res.status(201).json({datas:curobj});
    }
    
    
    catch(err){
        console.log(err);
    }
    
}