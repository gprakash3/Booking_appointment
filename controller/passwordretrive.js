const nodeUuid = require('uuid');
const Request = require('../model/ForgotPasswordRequests');
const User = require('../model/signup');
const path=require('path');
const rootDir = require('../util/path');

const bcrypt=require('bcrypt');


exports.updatePassword = async(req,res,next) => {
    try{
    const password = req.body.password;
    const userId = req.user.id;
    console.log(userId);
    bcrypt.hash(password, 10, async(err,hash) => {
        console.log(err);
        const user = await User.findByPk(userId);
        const userdata = await  user.update({password:hash});
        res.status(201).json({message:'password updated',userdata:userdata, userId:userId});
    });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Password udpate failed', error:err});
    }
}

exports.getForgetPasswordPage = async(req,res,next) => {
    const uuid = req.params.uuid;
    const request = await Request.findByPk(uuid);
    if(request.isactive ===true){
        request.update({isactive:false})
    res.sendFile(path.join(rootDir, 'views', 'reEnterPassword.html'));
    }
    else{
        res.status(500).json({message:'link expired'});
    }
}


exports.getUUID = async(req,res,next) => {
    try{
const uuid = nodeUuid.v4();
const userId = req.user.id;

const resp = await Request.create({id:uuid, userId:userId, isactive:true});
res.status(201).json({uuid:uuid, datas:resp});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err, message:'Not able to create Request table'})
    }
}


exports.sendEmail = async (req, res, next) => {
    try {
        const Sib = require('sib-api-v3-sdk');
        require('dotenv').config();

        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        
        apiKey.apiKey =process.env.SIB_API_KEY;

        const transEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
            email: 'gyan.p3008@gmail.com'
        }

        const receivers = [{
            email: req.body.email
        },]

        const promise = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Testing forget password functionality',
            textContent: `please click on link to reset your password ${req.body.link}`
        })
        console.log(promise);
        res.status(201).json({message:'Email sent', datas:promise});
 

    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:err, message:'Not able to send email, error in API part'})
    }
}