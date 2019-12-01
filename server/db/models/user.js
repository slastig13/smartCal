const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  googleId: {
    type: Sequelize.STRING
  },
  accessToken: {
    type: Sequelize.STRING
  },
  refreshToken: {
    type: Sequelize.STRING
  }
})

module.exports = User
