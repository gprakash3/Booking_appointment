const User = require('../model/signup');

const path=require('path');
const rootDir = require('../util/path');


exports.getSignupPage = (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'signup.html'));
};

exports.addUser = async(req,res,next) => {
    try{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log(name + " " +  email+ " " + password);

    const userdata = await User.create({name:name, email:email, password:password});
    res.status(201).json({userdata:userdata});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err}); 
    }
}

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