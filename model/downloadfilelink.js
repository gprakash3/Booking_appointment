const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Link = sequelize.define('link', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    link:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = Link;