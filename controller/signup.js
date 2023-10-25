const User = require('../model/signup');
const jwt=require('jsonwebtoken');

const path=require('path');
const rootDir = require('../util/path');

const bcrypt=require('bcrypt');

exports.getForgetPasswordPage = (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'forgetpassword.html'));
}

exports.getExpensePage = (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'expense.html'));
}

exports.getLoginPage = (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'login.html'));
};

exports.getSignupPage = (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'signup.html'));
};

exports.addUser = async(req,res,next) => {
    try{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log(name + " " +  email+ " " + password);

    //here 10 is saltround
    bcrypt.hash(password, 10, async(err,hash) => {
        console.log(err);
        const userdata = await User.create({name:name, email:email, password:hash});
        res.status(201).json({userdata:userdata});
    })
   

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err}); 
    }
}

//To check if user already exist during sign up
exports.getUserData = async(req,res,next) => {
    try{
    const email =  req.params.email;
    console.log(email);
    const userData = await User.findAll({where:{email:email}});
    res.status(201).json({userdata:userData[0]});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err}); 
    }
}

function generateAccessKey(id,name){
    return jwt.sign({userId:id, name:name},'secretKey');  
}
exports.checkLoginDetail = async(req,res,next) => {
    try{
        const email =  req.body.email;
        const password = req.body.password;
        const userDatas = await User.findAll({where:{email:email}});
        const userData=userDatas[0];
        console.log(userData);
        if(!userData){
            res.status(404).json({userdata:'User Not found'});
        }
        else{
            bcrypt.compare(password, userData.password, (err,response) => {
                if(response ===true){
                    const x =jwt.sign({userId:userData.id, name:userData.name},'secretKey');
                    console.log(x);
                    // localStorage.setItem('token', x);
                    res.json({token:x})
                    // generateAccessKey(userData.id, userData.name);
                    // res.redirect('http://localhost:3000/expense');
                   
                }
                else{
                    res.status(401).json({userdata:'User Not Authorized - Enter Correct Password'});
                }
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err}); 
    }
}