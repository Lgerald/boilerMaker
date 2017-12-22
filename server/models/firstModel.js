const Sequelize = require('sequelize')
const db = require('../db')

const firstModel = db.define('firstmodel', {})

module.exports = firstModel