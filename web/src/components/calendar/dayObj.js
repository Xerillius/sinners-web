class DayObj {
  constructor(date) {
    this.date = date
    this.events = []
  }
  addEvent = (event) => {
    this.events.push(new Event(event))
  }
}

class Event {
  constructor(event) {
    this.event = event
    this.selected = false
    this.status = null
  }
  toggleSelected = () => {
    this.selected = !this.selected
  }
  setSignUp = () => {
    this.status = "signup"
  }
  setTentative = () => {
    this.status = "tentative"
  }
  setDeclined = () => {
    this.status = "declined"
  }
}

export default DayObj