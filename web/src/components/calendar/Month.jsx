import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {axiosWithAuth} from '../axiosWithAuth/axiosWithAuth'
import {MonthContext} from '../../context/MonthContext'
import {UserContext} from '../../context/UserContext'

import GateKeeper from '../gatekeeper/GateKeeper'
import Week from './Week'
import DayObj from './dayObj'
import Event from './Event'

const Month = (props) => {
  const [currMoYr, setCurrMoYr] = useState({
    month: props.month,
    year: props.year
  })
  const [month, setMonth] = useState(null)
  const [selected, setSelected] = useState([])
  const [sorted, setSorted] = useState(null)
  const {user, setUser} = useContext(UserContext)
  const history = useHistory()

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

  const constructMonth = async (yr, mo, events) => {
    // Get events for month
    let monthEvents = {}
    events.map(event => {
      let eventDate = String(event.eventDate).split("")
      eventDate = eventDate.slice(2,-4)
      const eventDay = Number(eventDate.join(""))
      if(!monthEvents[eventDay]){
        monthEvents[eventDay] = []
      }
      monthEvents[eventDay].push(event)
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
        let temp = days.shift()
        if(temp != undefined){
          week[dayControl] = temp
        }
        dayControl++
      }
      // Add week to month
      monthWeeks.push(week)
      // Reset to Sunday
      dayControl = 0
    }

    return monthWeeks
  }

  // Function to change viewed month
  const changeMonth = (forward) => {
    if(forward){
      if(currMoYr.month == 11){
        setCurrMoYr({month: 0, year: currMoYr.year + 1})
      } else {
        setCurrMoYr({...currMoYr, month: currMoYr.month + 1})
      }
    } else {
      if(currMoYr.month == 0){
        setCurrMoYr({month: 11, year: currMoYr.year - 1})
      } else {
        setCurrMoYr({...currMoYr, month: currMoYr.month - 1})
      }
    }
  }

  useEffect(() => {
    if(!user){
      const token = GateKeeper()
      if(token){
        setUser({
          token: localStorage.getItem('token'),
          id: token.id,
          username: token.username,
          approved: token.approved,
          createEvent: token.createEvent
        })
      }
    }
  }, [])

  useEffect(() => {
    axiosWithAuth()
      .get(`/events/month/${currMoYr.month+1}`)
      .then(async res => {
        const tempMonth = await constructMonth(props.year,props.month,res.data)
        setMonth(tempMonth)
      })
      .catch(err => {
        console.log(err)
      })
    axiosWithAuth()
      .get(`/events/user/${user.id}`)
      .then(res => {
        setSelected(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [user])

  useEffect(() => {
    axiosWithAuth()
      .get(`/events/month/${currMoYr.month+1}`)
      .then(async res => {
        const tempMonth = await constructMonth(currMoYr.year,currMoYr.month,res.data)
        setMonth(tempMonth)
      })
      .catch(err => {
        console.log(err)
      })
  }, [currMoYr])

  useEffect(() => {
    let sortedSignups = selected.map(item => {return item})
    sortedSignups.sort(function(a,b) {
      if(a != null && b != null){
        return a.eventMonth - b.eventMonth || a.eventDay - b.eventDay
      }
    })
    setSorted(sortedSignups)
  }, [selected])

  return (
    <>
      { user && user.approved === true ?
        <MonthContext.Provider value={{month, selected, setSelected}}>
          {/** CALENDAR RENDER*/}
          <div className="month">
            <h1>
              <button 
                onClick={() => {changeMonth(false)}}
              >
                Prev
              </button> :: {months[currMoYr.month]} - {currMoYr.year} :: <button
                onClick={() => {changeMonth(true)}}
              >Next</button>
            </h1>
            <div className="week">
              {
                weekDays.map((day,i) => {
                  return <span className="day" key={i}>{day}</span>
                })
              }
            </div>
            {
              month === null ? null : month.map((week,i) => {
                return (
                  <Week week={week} key={i} weekNum={i} />
                )
              })
            }
          </div>
          {/** MY UPCOMING EVENTS */}
          {
            sorted != null ?
              <>
                <h3>My upcoming raids</h3>
                <div className="upcoming_event">
                  <span>Location</span>
                  <span>Date</span>
                  <span>Time</span>
                </div>
                {
                  sorted.map(event => {
                    return <Event data={event} />
                  })
                }
              </>
            : null
          }
        </MonthContext.Provider>
      : () => {history.push('/login')}
      }
    </>
  )
}

export default Month