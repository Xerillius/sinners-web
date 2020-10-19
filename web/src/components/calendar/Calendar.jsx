import React from 'react'

import Month from './Month'

const Calendar = () => {

  return(
    <div className="calendar">
      <Month year={2020} month={9} />
    </div>
  )
}

export default Calendar