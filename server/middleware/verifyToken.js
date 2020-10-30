const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, vJWT) => {
      if(err) {
        res.status(401)
      } else {
        next()
      }
    })
  }
  res.status(401)
}