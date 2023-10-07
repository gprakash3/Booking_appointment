
const express= require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const app=express();

//using cores
var cors=require('cors');
app.use(cors());

const callRoute=require('./route/call');


app.use(bodyParser.json({ extended: false }));

app.use(callRoute);


sequelize.sync()
.then(result => {
    console.log('app started');
    app.listen(5000);
})
.catch(err=>console.log(err));