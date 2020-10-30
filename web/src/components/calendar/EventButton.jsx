import React, { useContext } from 'react'
import {MonthContext} from '../../context/MonthContext'
import {UserContext} from '../../context/UserContext'
import {axiosWithAuth} from '../axiosWithAuth/axiosWithAuth'

const EventButton = (props) => {
  const {month, selected, setSelected} = useContext(MonthContext)
  const {weekNum, dayNum, dayEventNum, event} = props
  const {user} = useContext(UserContext)

  const submit = () => {
    const data = {
      userID: user.id
    }
    const eventID = month[weekNum][dayNum].events[dayEventNum].event.id
    axiosWithAuth()
      .post(`/events/signup/${eventID}`, data)
      .then(res => {
        if(res.data != null){
          setSelected([...selected, res.data])
        }
      })
      .catch(err => {
        console.log("err",err)
      })
  }

  return (
    <button
      className='event'
      onClick={submit}
    >
      {event.event.eventTitle} - {event.event.eventStartTime}
    </button>
  )
}

export default EventButton