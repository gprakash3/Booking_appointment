require('dotenv').config()
const Sequelize=require('sequelize');


const sequelize=new Sequelize(process.env.DATABASE_NAME , process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD ,{
    // const sequelize = new Sequelize('expense', 'root', 'abcd1234' , {
    dialect : 'mysql',
    host: process.env.DATABASE_HOST
});

module.exports = sequelize;