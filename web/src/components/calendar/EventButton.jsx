import React, { useContext } from 'react'
import {MonthContext} from '../../context/MonthContext'

const EventButton = (props) => {
  const {month, selected, setSelected, selectRef} = useContext(MonthContext)
  const {weekNum, dayNum, dayEventNum, event} = props

  const clickHandler = () => {
    let select = month[weekNum][dayNum].events[dayEventNum]
    select.toggleSelected()
    if(select.selected){
      setSelected([...selected, select])
    } else {
      let temp = []
      for(let i = 0; i < selectRef.current.length; i++){
        if(selectRef.current[i].event.id != select.event.id){
          temp.push(selectRef.current[i])
        }
      }
      setSelected(temp)
    }
  }

  return (
    <button
      className={event.selected ? 'event selected' : 'event'}
      onClick={clickHandler}
    >
      {event.event.eventTitle}
    </button>
  )
}

export default EventButton