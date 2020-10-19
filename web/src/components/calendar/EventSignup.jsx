import React from 'react'

const EventSignup = (props) => {
  // Yes I know this is messed up
  let event = props.event.event
  let date = event.eventStartDate.split('-')
  let month = date[0]
  let day = date[1]
  return (
    <div className="eventSignup">
      <span className="eventLoc">{event.eventLocation}</span>
      <span className="eventDate">{month}-{day}</span>
      <div className="signupButtons">
        <button>Sign Up</button>
        <button>Tentative</button>
        <button>Decline</button>
      </div>
      <textarea></textarea>
    </div>
  )
}

export default EventSignup