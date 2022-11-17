const {Sequelize} = require('sequelize')

const db = new Sequelize('db_final_testing', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db