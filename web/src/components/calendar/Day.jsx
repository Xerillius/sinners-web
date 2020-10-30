import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import EventButton from './EventButton'
import {UserContext} from '../../context/UserContext'

const Day = (props) => {
  const {user} = useContext(UserContext)
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
            props.day === null ?
                null
              : user.createEvent ?
                    <Link 
                      to={{
                        pathname: '/createEvent',
                        data: {
                          year: props.day.date.getFullYear(),
                          month: props.day.date.getMonth() + 1,
                          day: props.day.date.getDate(),
                          weekDayNum: props.day.date.getDay()
                        }
                      }}
                    >
                      {props.day.date.getDate()}
                    </Link>
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