import React from 'react'

const Event = (props) => {
  const event = props.data
  const day = event.eventDay < 10 ? `0${event.eventDay}` : event.eventDay
  const date = `${event.eventMonth}/${day}/${event.eventYear}`

  return (
    <div className="upcoming_event">
      <span>{event.eventLocation}</span>
      <span>{date}</span>
      <span>{event.eventStartTime}</span>
    </div>
  )
}

export default Event