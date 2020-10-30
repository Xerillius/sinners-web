const db = require("../data/dbConfig")

// find event by id
const findById = id => {
  return db('events')
    .where({id})
    .first()
}

// find event by month
const findByMonth = eventMonth => {
  return db('events')
//    .where({eventMonth})
}

// create event
const addEvent = async data => {
  const [id] = await db('events')
    .insert(data)
    .returning('id')
  return findById(id)
}

// edit event
const editEvent = async (id, data) => {
  const eventID = await db('events')
    .where({id})
    .first()
    .update(data)
    .returning('id')
  return findById(eventID)
}

// delete event
const deleteEvent = id => {
  return db('events')
    .where({id})
    .first()
    .del()
}

module.exports = {
  findById,
  findByMonth,
  addEvent,
  editEvent,
  deleteEvent
}