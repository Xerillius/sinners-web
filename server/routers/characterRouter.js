const router = require('express').Router()
const Characters = require('../models/characterModel')
const Users = require('../models/userModel')
const verifyToken = require('../middleware/verifyToken')

router.get('/all', (req, res) => {
  Characters.findAll()
    .then(characters => {
      res.status(200).json(characters)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving characters",
        error: err.message
      })
    })
})

router.get('/id/:id', (req, res) => {
  const id = req.params.id
  Characters.findById(charID)
    .then(character => {
      res.status(200).json(character)
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find character with ID:${id}`,
        error: err.message
      })
    })
})

router.get('/user/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  Users.findById(id)
    .then(user => {
      Characters.findByUser(id)
        .then(characters => {
          res.status(200).json(characters)
        })
        .catch(err => {
          res.status(500).json({
            message: `Could not find characters for User with ID:${id}`,
            error: err.message
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find User with ID:${id}`,
        error: err.message
      })
    })
})

router.get('/role/:role', (req, res) => {
  const role = req.params.role
  Characters.findByRole(role)
    .then(characters => {
      res.status(200).json(characters)
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find characters with role: ${role}`,
        error: err.message
      })
    })
})

router.get('/class/:class', (req, res) => {
  const charClass = req.params.class
  Characters.findByCharClass(charClass)
    .then(characters => {
      res.status(200).json(characters)
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find any ${role}s`,
        error: err.message
      })
    })
})

router.get('/mains', (req, res) => {
  Characters.findMains()
    .then(characters => {
      res.status(200).json(characters)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error finding main characters",
        error: err.message
      })
    })
})

router.get('/alts/:id', (req, res) => {
  const userid = req.params.id
  Characters.findUserAlts(userid)
    .then(characters => {
      res.status(200).json(characters)
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find alts for User with ID: ${userid}`,
        error: err.message
      })
    })
})

router.post('/add', (req, res) => {
  const {userID, charData} = req.body
  console.log(req.body)
  Characters.addCharacter(userID, charData)
    .then(character => {
      res.status(201).json(character)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding character",
        error: err.message
      })
    })
})

router.delete('/:id', (req, res) => {
  const token = req.headers.authorization
  const id = req.params.id
  Characters.deleteCharacter(id)
    .then(deleted => {
      res.status(200).json(deleted)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error deleting character with ID: ${id}`,
        error: err.message
      })
    })
})

module.exports = router