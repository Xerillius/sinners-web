import React from 'react'
import EventButton from './EventButton'

const Day = (props) => {
  const current = new Date()
  return (
    <>
      <div
        className={
          props.day === null ?
              'day'
            : props.day.date.getDate() === current.getDate() ?
                'day current'
              : 'day'
        }
      >
        <div className="dayNumber">
          {
            props.day == null ?
                null
              : props.day.date.getDate()
          }
        </div>
        <div className="event-wrapper">
          {
            props.day == null ?
                null
              : props.day.events.length > 0 ?
                  props.day.events.map((event,i) => {
                    return (
                      <EventButton
                        event={event}
                        key={i}
                        weekNum={props.weekNum}
                        dayNum={props.dayNum}
                        dayEventNum={i}
                      />
                    )
                  })
                : null
          }
        </div>
      </div>
    </>
  )
}

export default Day