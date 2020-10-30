const jwt = require('jsonwebtoken')
const secret = require('../config/secrets')
const Users = require('../models/userModel')

const createToken = async id => {
  return Users.findById(id)
    .then(user => {
      const payload = {
        id: user.id,
        username: user.username,
        approved: user.approved,
        createEvent: user.createEvent
      }
      const options = {
        expiresIn: 60 * 60 * 1000
      }
      const token = jwt.sign(
        payload,
        secret.jwtSecret,
        options
      )
      return token
    })
    .catch(err => {
      res.status(500).json({
        message: "An error occurred signing in"
      })
    })
}

module.exports = createToken