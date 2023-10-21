const express= require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const app=express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//using cores
var cors=require('cors');
app.use(cors());

const callRoute=require('./route/expense');
const signupRoute=require('./route/signup');


app.use(bodyParser.json({ extended: false }));

app.use(signupRoute);
app.use(callRoute);


// sequelize.sync({force:true})
sequelize.sync()
.then(result => {
    console.log('app started');
    app.listen(3000);
})
.catch(err=>console.log(err));