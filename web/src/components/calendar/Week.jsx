import React from 'react'

import Day from './Day'

const Week = (props) => {
  return (
    <div className="week">
      {
        props.week.map((day,i) => {
          return(
            <Day day={day} key={i} dayNum={i} weekNum={props.weekNum} />
          )
        })
      }
    </div>
  )
}

export default Week