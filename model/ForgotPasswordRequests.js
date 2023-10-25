// var nodeUuid = require('node-uuid');

const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Request = sequelize.define('request', {

    id:{
        // var uuid = nodeUuid.v4();
        type:Sequelize.UUID,
        primaryKey:true
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    isactive:Sequelize.BOOLEAN

});

module.exports = Request;