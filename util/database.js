const Sequelize=require('sequelize');

const sequelize=new Sequelize('expense' , 'root', 'abcd1234' ,{
    dialect : 'mysql',
    host:'localhost'
});

module.exports = sequelize;