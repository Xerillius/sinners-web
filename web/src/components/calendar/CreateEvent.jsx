import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../../context/UserContext'
import {axiosWithAuth} from '../axiosWithAuth/axiosWithAuth'

const CreateEvent = (props) => {
  const data = props.location.data
  const [event, setEvent] = useState({
    eventType: null,
    eventLocation: null,
    eventHour: null,
    eventMinutes: null,
    eventAMPM: null
  })
  const [recur, setRecur] = useState([false, false, false, false, false, false, false])
  const [reMo, setReMo] = useState(null)
  const {user} = useContext(UserContext)
  const history = useHistory()

  const eventTypes = [
    "Officer Meeting",
    "Class Meeting",
    "Raid-20",
    "Raid-40"
  ]

  const raid_20 = [
    "Zul'Gurub",
    "Ruins of Ahn'Qiraj"
  ]

  const raid_40 = [
    "Molten Core",
    "Blackwing Lair",
    "Temple of Ahn'Qiraj",
    "Naxxramas"
  ]

  const eventAbbr = {
    "Officer Meeting": "OM",
    "Class Meeting": "CM",
    "Zul'Gurub": "ZG",
    "Ruins of Ahn'Qiraj": "AQ-20",
    "Molten Core": "MC",
    "Blackwing Lair": "BWL",
    "Temple of Ahn'Qiraj": "AQ-40",
    "Naxxramas": "NAX"
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const days = {
    "January": [...Array(31).keys()],
    "February": [...Array(28).keys()],
    "March": [...Array(31).keys()],
    "April": [...Array(30).keys()],
    "May": [...Array(31).keys()],
    "June": [...Array(30).keys()],
    "July": [...Array(31).keys()],
    "August": [...Array(31).keys()],
    "September": [...Array(30).keys()],
    "October": [...Array(31).keys()],
    "November": [...Array(30).keys()],
    "December": [...Array(31).keys()]
  }

  const hours = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
  ]

  const minutes = [
    "00", "15", "30", "45"
  ]

  const weekDayNum = [0,1,2,3,4,5,6]

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  const am_pm = ["AM","PM"]

  const handleChange = e => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    })
  }

  const doSubmit = (d,m,y) => {
    const day = new Date()
    const createDay = day.getDate()
    const createMonth = day.getMonth()
    const createYear = day.getFullYear()
    const eventDate = Number((String(m)+String(d)+String(y)))
    const time = event.eventHour + ":" + event.eventMinutes + event.eventAMPM
    const max = event.eventType == "Raid-20" ? 20 : 40
    const eventData = {
      eventTitle: eventAbbr[event.eventLocation],
      eventDate: eventDate,
      eventStartTime: time,
      eventLocation: event.eventLocation,
      eventMaxParticipants: max,
      eventCreateDate: String(createMonth+1) + "-" + String(createDay) + "-" + String(createYear)
    }
    console.log(eventData)
    axiosWithAuth()
      .post('/events/new', eventData)
      .then(res => {
        console.log(res)
        history.push('/calendar')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const genRecurEvents = () => {
    let recurDays = []
    let startDay = data.day
    let startMonth = data.month
    let startYear = data.year
    let weekDayStart = data.weekDayNum
    for(const item in recur){
      if(recur[item]){
        recurDays.push(Number(item))
      }
    }

    if(reMo > 0){
      for(let x = 0; x < reMo; x++){
        for(let d = startDay; d < days[months[startMonth-1]].length + 1; d++){
          if(recurDays.includes(weekDayStart)){
            doSubmit(d,startMonth,startYear)
          }
          weekDayStart += 1
          if(weekDayStart == 7){
            weekDayStart = 0
          }
        }
        startMonth++
        if(startMonth == 13){
          startYear++
          startMonth = 1
        }
      }
    } else {
      doSubmit(startDay, startMonth, startYear)
    }
  }

  // Function to set the days for events to recur on
  const changeRecur = (val) => {
    let flag = recur.map(val => val)
    flag[val] = !flag[val]
    setRecur(flag)
  }

  // Function to set number of recurring months into state
  const handleReMo = e => {
    setReMo(e.target.value)
  }

  useEffect(() => {
    if(recur.includes(true)){
      for(let item in recur){
        if(recur[item]){
          console.log(item)
        }
      }
    }
  }, [recur])

  return (
    <>
      {
        user.createEvent ?
            <div className="event_creation_form">
              <h1>Create Event - {data.month}/{data.day}</h1>
              {/** TIME */}
                <section className="ec_form_item time">
                  <label htmlFor="event_time">Time:</label>
                  <section>
                  <select
                    name="eventHour"
                    onChange={handleChange}
                  >
                    <option></option>
                    {
                      hours.map(hour => {
                        return <option value={hour} key={hour}>{hour}</option>
                      })
                    }
                  </select>
                  <select
                    name="eventMinutes"
                    onChange={handleChange}
                  >
                    <option></option>
                    {
                      minutes.map(minute => {
                        return <option value={minute} key={minute}>{minute}</option>
                      })
                    }
                  </select>
                  <select
                    name="eventAMPM"
                    onChange={handleChange}
                  >
                    <option></option>
                    {
                      am_pm.map(m => {
                        return <option value={m} key={m}>{m}</option>
                      })
                    }
                  </select>
                  </section>
                </section>
              {/** EVENT TYPE */}
              <section className="ec_form_item">
                <label htmlFor="eventType">Event Type:</label>
                <select
                  name="eventType"
                  onChange={handleChange}
                >
                  <option></option>
                  {
                    eventTypes.map(type => {
                      return <option value={type} key={type}>{type}</option>
                    })
                  }
                </select>
              </section>
              {/** EVENT NAME */}
              <section className="ec_form_item">
                {
                  event.eventType ?
                      <>
                        <label htmlFor="eventLocation">Event Name:</label>
                        <select
                          name="eventLocation"
                          onChange={handleChange}
                        >
                          <option></option>
                          {
                              event.eventType === "Raid-20" ?
                                  raid_20.map(raid => {
                                    return <option value={raid} key={raid}>{raid}</option>
                                  })
                            : event.eventType === "Raid-40" ?
                                  raid_40.map(raid => {
                                    return <option value={raid} key={raid}>{raid}</option>
                                  })
                            : null
                          }
                        </select>
                      </>
                    : null
                }
              </section>
              {/** SUBMIT */}
              <section className="ec_form_item">
                <button onClick={genRecurEvents}>Submit</button>
              </section>
              {/** RECURRING */}
              <section>
                <h3>Recur every</h3>
                {
                  weekDayNum.map(day => {
                    return(
                      <>
                        <button
                          className={recur[day] ? 'ceb_active' : 'ceb_inactive'}
                          onClick={() => changeRecur(day)}
                        >
                          {weekDays[day]}
                        </button>
                      </>
                    )
                  })
                }
              </section>
              <h3>For</h3>
              <section className="ec_form_item">
                <label htmlFor="months">Months:</label>
                <input
                  name="months"
                  type="number"
                  onChange={handleReMo}
                />
              </section>
            </div>
          : history.push('/calendar')
      }
    </>
  )
}

export default CreateEvent