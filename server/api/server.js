const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const verifyToken = require('../middleware/verifyToken')

const authRouter = require('../routers/authRouter')
const userRouter = require('../routers/userRouter')
const characterRouter = require('../routers/characterRouter')
const eventRouter = require('../routers/eventRouter')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/user', verifyToken, userRouter)
server.use('/api/character', verifyToken, characterRouter)
server.use('/api/events', verifyToken, eventRouter)

server.get("/", (req, res) => {
  res.status(200).json({api: "Sinners API is up"})
})

module.exports = server