const db = require('../data/dbConfig')

// retrieve all users
const findAll = async () => {
  const users = await db('users')
  return users
}

// find by id
const findById = async id => {
  const user = await db('users')
    .where({id})
    .first()
    .select('id', 'username', 'approved', 'createEvent')
  return user
}

// find by username
const findByUsername = async username => {
  const user = await db('users')
    .where({username})
    .first()
  return user
}

// find user by character name

// add user
const addUser = async user => {
  const [id] = await db('users')
    .insert(user)
    .returning('id')
  return findById(id)
}

// edit user information
const editUser = async user => {
  const id = user.id
  const userId = await db('users')
    .where({id})
    .first()
    .update(user)
    .returning('id')
  return findById(userId)
}

// delete user
const deleteUser = id => {
  return db('users')
    .where({id})
    .first()
    .del()
}

// approve user for tool use
const approveUser = user => {
  user.approved = true
  editUser(user)
}

// lock user from tool use
const lockUser = user => {
  user.approved = false
  editUser(user)
}

module.exports = {
  findAll,
  findById,
  findByUsername,
  addUser,
  editUser,
  deleteUser,
  approveUser,
  lockUser
}