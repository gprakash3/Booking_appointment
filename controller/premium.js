const Expense = require('../model/data');
const User = require('../model/signup');
const sequelize = require('../util/database');
const jwt = require('jsonwebtoken');
const env=require('dotenv');
const Link = require('../model/downloadfilelink');

const AWS = require('aws-sdk');
function uploadToS3(data, filename){
  const BUCKET_NAME = 'expenseapp123';
  let s3bucket = new AWS.S3({
    accessKeyId:'AKIATWLISRMNJBOTHDAD',
    secretAccessKey:'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',  
  });   
    var params = {
      Bucket:BUCKET_NAME,
      Key:filename,
      Body:data,
      ACL:'public-read'
    }
    //make this upload function async as it will take time to complete.
    return new Promise((resolve,reject) => {
      s3bucket.upload(params, (err,s3resp) => {
        if(err){
          console.log('something went wrong' ,err);
          reject(err);         
        }
        else{
          console.log('success', s3resp);
          resolve(s3resp.Location);
        }
      })
     })
}

exports.getleaderboarddata = async(req,res,next) => {
    try{
      const leaderboardExpense = await User.findAll({
        attributes: ['name', 'totalExpense'],
        order:[[sequelize.col('totalExpense'), 'DESC']]
      });
      console.log(leaderboardExpense);
    res.status(201).json({datas:leaderboardExpense});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }   
}

exports.getDailyReport = async(req,res,next) => {
 try{
  const user = req.user;
  console.log('this is the user',user)
  const expenses = await user.getExpenses({
    attributes: ['amount', 'category', 'description','createdAt'],
    order:[[sequelize.col('createdAt')]]
  });
  res.json({datas:expenses});
}
catch(err){
  console.log(err);
  res.json({error:err});
}

 }

 exports.downloadExpense = async(req,res,next) => {
  try{
  const expenses =await req.user.getExpenses();
  const stringifiedExpenses = JSON.stringify(expenses);
// console.log(stringifiedExpenses);
  const userId = req.user.id;
  const filename = `Expense${userId}/${new Date()}.txt`;
  const fileUrl =  await uploadToS3(stringifiedExpenses, filename);
  res.status(200).json({fileUrl, success:true})
  }
  catch(err){
    res.status(500).json({error:err, message:'error in download expense from controller'});
  }
 }

 exports.getDownloadFileLinks = async (req,res,next) => {
  try{
    const links = await req.user.getLinks();
    res.status(200).json({alllinks:links, message:'Link available'});
  }
  catch(err){
    res.status(500).json({error:err, message:'error in getting all links'});
  }
 }

 exports.postLinkToTable = async(req,res,next) => {
  try{
    const linktoupload = req.body.link;
    const id = req.user.id;
    const response = await Link.create({userId:id ,link: linktoupload });
    res.status(200).json({response, message:'link is saved in table'});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:err, message:'link upload to table failed'})
  }
 }