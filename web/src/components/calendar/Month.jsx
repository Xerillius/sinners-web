import React, { useState, useEffect, useRef } from 'react'

import Week from './Week'
import DayObj from './dayObj'
import EventSignup from './EventSignup'
import {events} from '../../data/events'
import {MonthContext} from '../../context/MonthContext'

const Month = (props) => {
  const [month, setMonth] = useState(null)
  const [selected, setSelected] = useState([])
  const selectRef = useRef(selected)
  selectRef.current = selected

  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
  }

  const monthDays = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31
  }

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  const constructMonth = (yr, mo) => {
    // Get events for month
    let monthEvents = {}
    events.forEach(event => {
      let eventMonth = event.eventStartDate.split('-')[0] - 1
      let eventDay = event.eventStartDate.split('-')[1]
      if(eventMonth === props.month){
        if(!monthEvents[eventDay]){
          monthEvents[eventDay] = []
        }
        monthEvents[eventDay].push(event)
      }
    })

    // Fill an array with all days of the month
    let days = []
    // Control variable for future dating
    let dayCount = 0

    // Create a DayObj for each day in the month
    while(dayCount < monthDays[months[mo]]){
      let day = new DayObj(new Date(yr,mo,1+dayCount))
      if(monthEvents[dayCount+1]){
        monthEvents[dayCount+1].forEach(event => {
          day.addEvent(event)
        })
      }
      days.push(day)
      dayCount++
    }

    // Initialize the starting point for the week beginning the month
    let dayControl = days[0].date.getDay()
    // Month variable
    let monthWeeks = []

    // Assign days to weeks
    while(days.length > 0){
      // Initialize empty week
      let week = Array(7).fill(null)
      // Rotate through the week
      while(dayControl < 7){
        week[dayControl] = days.shift()
        dayControl++
      }
      // Add week to month
      monthWeeks.push(week)
      // Reset to Sunday
      dayControl = 0
    }

    return monthWeeks
  }

  const submitSelected = () => {
    let data = {}
    selected.forEach(event => {
      data[event.event.id] = event.status
    })
    console.log(data)
  }

  useEffect(() => {
    if(month === null){
      setMonth(constructMonth(props.year,props.month))
    }
  }, [])

  return (
    <MonthContext.Provider value={{month, selected, setSelected, selectRef}}>
      <div className="month">
        <h1>{months[props.month]} - {props.year}</h1>
        <div className="week">
          {
            weekDays.map((day,i) => {
              return <span className="day" key={i}>{day}</span>
            })
          }
        </div>
        {
          month == null ? null : month.map((week,i) => {
            return (
              <Week week={week} key={i} weekNum={i} />
            )
          })
        }
      </div>
      <div className="signups">
        <div className="signupTags">
          <span className="eventLoc">Location</span>
          <span className="eventDate">Date</span>
          <div className="signupButtons">Status Buttons</div>
          <div className="textfield">Notes</div>
        </div>
        <hr />
        {
          selected.map((event,i) => {
            return <EventSignup event={event} key={i} />
          })
        }
      </div>
      <button
        onClick={submitSelected}
      >
        Submit
      </button>
    </MonthContext.Provider>
  )
}

export default Month