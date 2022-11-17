const {Sequelize} = require('sequelize');
const db = require('../config/database');
const Tickets = require('./TicketModel');

const {DataTypes} = Sequelize

const Activitys = db.define('activity_tickets', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    totalclaim:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    ticketId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Tickets.hasMany(Activitys)
Activitys.belongsTo(Tickets, {foreignKey: 'ticketId'});

module.exports = Activitys