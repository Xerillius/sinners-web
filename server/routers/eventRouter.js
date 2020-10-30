const router = require('express').Router()
const Events = require('../models/eventModel')
const Signup = require('../models/signupModel')

router.get('/month/:month', (req, res) => {
  Events.findByMonth(Number(req.params.month))
    .then(events => {
      res.status(200).json(events)
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find any events for the month`,
        error: err.message
      })
    })
})

router.get('/id/:id', (req, res) => {
  Events.findById(Number(req.params.id))
    .then(event => {
      res.status(200).json(event)
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not locate event with ID:${req.params.id}`
      })
    })
})

// get signups for raid
router.get('/signups/raid/:id', (req, res) => {
  const eventID = Number(req.params.id)
  Signup.getSignupsByEvent(eventID)
    .then(signups => {
      res.status(200).json(signups)
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find event with ID: ${id}`,
        error: err.message
      })
    })
})

// get signups for user
router.get('/signups/user/:id', (req, res) => {
  const userID = Number(req.params.id)
  Signup.getSignupsByUser(userID)
    .then(signups => {
      res.status(200).json(signups)
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find events for user with ID: ${id}`,
        error: err.message
      })
    })
})

router.get('/user/:id', (req, res) => {
  const userID = Number(req.params.id)
  Signup.getEventsByUser(userID)
    .then(events => {
      res.status(200).json(events)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting events for user with ID: ${userID}`,
        error: err.message
      })
    })
})

router.post('/new', (req, res) => {
  Events.addEvent(req.body)
    .then(event => {
      res.status(200).json(event)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error creating event",
        error: err.message
      })
    })
})

router.put('/edit/:id', (req, res) => {
  const {id} = Number(req.params.id)
  const {data} = req.body
  Events.findById(id)
    .then(found => {
      Events.editEvent(id, data)
        .then(event => {
          res.status(200).json(event)
        })
        .catch(err => {
          res.status(500).json({
            message: `Error updating event with ID:${id}`,
            error: err.message
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find event with ID:${id}`,
        error: err.message
      })
    })
})

router.delete('/delete/:id', (req, res) => {
  Events.deleteEvent(Number(req.params.id))
    .then(deleted => {
      res.status(200).json(deleted)
    })
    .catch(err => {
      res.status(500).json({
        message: `Error deleting event with ID:${req.params.id}`,
        error: err.message
      })
    })
})

router.post('/signup/:id', (req, res) => {
  const eventID = Number(req.params.id)
  const userID = req.body.userID
  Signup.signUp(eventID, userID)
    .then(signup => {
      res.status(200).json(signup)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error signing up for raid",
        error: err.message
      })
    })
})

router.delete('/signup/:id', (req, res) => {
  const eventID = req.params.id
  const charID = req.body
  Signup.remove(eventID, charID)
    .then(removed => {
      res.status(200).json(removed)
    })
    .catch(err => {
      res.status(500).json({
        message: "Error declining raid",
        error: err.message
      })
    })
})

module.exports = router