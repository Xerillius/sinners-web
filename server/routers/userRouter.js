const router = require('express').Router()
const Users = require('../models/userModel')

router.get('/:id', (req, res) => {
  const id = req.params.id
  Users.findById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find user with ID: ${id}`,
        error: err.message
      })
    })
})

module.exports = router