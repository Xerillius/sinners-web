import React, {useState} from 'react'

const EventSignup = (props) => {
  // Yes I know this is messed up
  let event = props.event.event
  let evObj = props.event
  let date = event.eventStartDate.split('-')
  let month = date[0]
  let day = date[1]

  const [status, setStatus] = useState(null)

  const setSignUp = () => {
    evObj.setSignUp()
    setStatus("signup")
  }

  const setTentative = () => {
    evObj.setTentative()
    setStatus("tentative")
  }

  const setDeclined = () => {
    evObj.setDeclined()
    setStatus("declined")
  }

  return (
    <div className="eventSignup">
      <span className="eventLoc">{event.eventLocation}</span>
      <span className="eventDate">{month}-{day}</span>
      <div className="signupButtons">
        <button
          className={status == "signup" ?
              "selected"
            : null
          }
          onClick={setSignUp}
        >Sign Up</button>
        <button
          className={status == "tentative" ?
              "selected"
            : null
          }
          onClick={setTentative}
        >Tentative</button>
        <button
          className={status == "declined" ?
              "selected"
            : null
          }
          onClick={setDeclined}
          >Decline</button>
      </div>
      <textarea></textarea>
    </div>
  )
}

export default EventSignup