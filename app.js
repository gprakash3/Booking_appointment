const express= require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const app=express();
const path = require('path');

require('dotenv').config()

const User = require('./model/signup');
const Expense = require('./model/data');
const Order=require('./model/order');
const Request = require('./model/ForgotPasswordRequests');
const Link = require('./model/downloadfilelink');

app.set('view engine', 'ejs');
app.set('views', 'views');

//using cores
var cors=require('cors');
app.use(cors());

const callRoute=require('./route/expense');
const signupRoute=require('./route/signup');
const purchaseRoute = require('./route/purchase');
const premiumRoute = require('./route/premium');
const forgetPasswordRoute =require('./route/passwordretrive');
const reportRoute = require('./route/reportgenerate');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoute);
app.use(callRoute);
app.use(purchaseRoute);
app.use(premiumRoute);
app.use(forgetPasswordRoute);
app.use(reportRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Request);
Request.belongsTo(User);

User.hasMany(Link);
Link.belongsTo(User);

// sequelize.sync({force:true})
sequelize.sync()
// sequelize.sync({alter:true})
.then(result => {
    console.log('app started');
    app.listen(3000);
})
.catch(err=>console.log(err));