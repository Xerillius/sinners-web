const db = require('../data/dbConfig')
const eventModel = require('./eventModel')

// get signup by id
const getSignUpById = id => {
  return db('eventSignups')
    .where({id})
    .first()
}

// get signups
const getSignupsByEvent = async eventID => {
  const signups = await db('eventSignups')
    .where({eventID})
  return signups
}

// get signups for user
const getSignupsByUser = async userID => {
  const signups = await db('eventSignups')
    .where({userID})
    .select('eventID')
  return signups
}

// get events by sign up id
const getEventsByUser = async userID => {
  const day = new Date()
  // get event id's
  const signups = await getSignupsByUser(userID)
  // get events by id's
  let events = await Promise.all(signups.map(async event => {
    let e = await db('events')
      .where({id: event.eventID})
      .first()
    return e
  }))

  // return events
  events.sort(function(a,b) {
    return a.eventMonth - b.eventMonth || a.eventDay - b.eventDay
  })

  console.log(events)

  let ev = []
  let tenCount = 10

  for(let i = 0; i < events.length && tenCount > 0; i++){
    if(events[i].eventMonth == day.getMonth()+1 && events[i].eventDay >= day.getDate()){
      ev.push(events[i])
      tenCount--
    } else if(events[i].eventMonth > day.getMonth() + 1){
      ev.push(events[i])
      tenCount--
    }
  }

  return ev
}

// sign up to event
const signUp = async (eventID, userID) => {
  let events = await getEventsByUser(userID)
  events = events.map(event => {return event.id})
  if(!events.includes(eventID)){
    const data = {
      eventID: eventID,
      userID: userID
    }
    const [id] = await db('eventSignups')
      .insert(data)
      .returning('id')
    signup = await getSignUpById(id)
    return eventModel.findById(signup.eventID)
  } else {
    return null
  }
}

// remove from event

module.exports = {
  signUp,
  getSignupsByEvent,
  getSignupsByUser,
  getEventsByUser
}