const db = require('../data/dbConfig')

// find all characters
const findAll = () => {
  return db('characters')
}

// find character by id
const findById = id => {
  return db('characters')
    .where({id})
    .first()
}

// find characters by owner
const findByUser = userID => {
  return db('characters')
    .where({userID})
}

// find characters by role
const findByRole = role => {
  return db('characters')
    .where({role})
}

// find characters by class
const findByCharClass = charClass => {
  return db('chracters')
    .where({charClass})
}

// find mains
const findMains = () => {
  return db('characters')
    .where({main: true})
}

// find alts of user
const findUserAlts = (userid) => {
  return db('characters')
    .where({
      userid: userid,
      status: "alt"
    })
}

const addCharacter = async (userID, charData) => {
  const data = {
    userID: userID,
    name: charData.name,
    charClass: charData.class,
    role: charData.role
  }
  const [id] = await db('characters')
    .insert(data)
    .returning('id')
  console.log(id)
  return findById(id)
}

const deleteCharacter = id => {
  return db('characters')
    .where({id})
    .first()
    .del()
}

module.exports = {
  findAll,
  findById,
  findByUser,
  findByRole,
  findByCharClass,
  findMains,
  findUserAlts,
  addCharacter,
  deleteCharacter
}