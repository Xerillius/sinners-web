const router = require('express').Router()
const bcrypt = require('bcryptjs')
const createToken = require('../functions/createToken')

const Users = require('../models/userModel')

router.post('/register', async (req, res) => {
  const user = req.body
  const password = bcrypt.hashSync(user.password, 12)
  user.password = password
  Users.addUser(user)
    .then(async saved => {
      const token = await createToken(saved.id)
      const userData = {
        userID: saved.id,
        username: saved.username,
        approved: saved.approved,
        createEvent: saved.createEvent
      }
      res.status(201).json({
        token: token,
        userData: userData
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not register account",
        error: err.message
      })
    })
})

router.post('/login', (req, res) => {
  Users.findByUsername(req.body.username)
    .then(async user => {
      if(user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = await createToken(user.id)
        const userData = {
          userID: user.id,
          username: user.username,
          approved: user.approved,
          createEvent: user.createEvent
        }
        res.status(201).json({
          token: token,
          userData: userData
        })
      } else {
        res.status(401).json({
          message: "Incorrect password"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not find user",
        error: err.message
      })
    })
})

module.exports = router