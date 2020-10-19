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
  }
  toggleSelected = () => {
    this.selected = !this.selected
  }
}

export default DayObj