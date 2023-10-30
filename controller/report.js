const User = require('../model/signup');
const path=require('path');
const rootDir = require('../util/path');
const sequelize = require('../util/database');

exports.getdailyreportpage = (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'dailyreport.html'));
}

exports.getWeeklyReportPage = (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'weeklyreport.html'));
}

exports.getmonthlyreportpage = (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'monthlyreport.html'));
}

exports.getDailyReport = async(req,res,next) => {
    try{
     const user = req.user;
     console.log('this is the user',user)
     const expenses = await user.getExpenses({
       attributes: ['amount', 'category', 'description','date'],
       order:[[sequelize.col('createdAt')]]
     });
     res.json({datas:expenses});
   }
   catch(err){
     console.log(err);
     res.json({error:err});
   }
   
    }

