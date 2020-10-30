import React, { useState, useContext } from 'react'
import {axiosWithAuth} from '../axiosWithAuth/axiosWithAuth'
import { useHistory } from 'react-router-dom'

import {UserContext} from '../../context/UserContext'

const AddCharacter = () => {
  const history = useHistory()
  const {user} = useContext(UserContext)
  const [character, setCharacter] = useState({
    name: null,
    class: null,
    role: null,
  })

  const classes = [
    "Druid",
    "Hunter",
    "Mage",
    "Priest",
    "Rogue",
    "Shaman",
    "Warlock",
    "Warrior"
  ]

  const availableRoles = {
    "Druid": ['Tank', 'M-DPS', 'R-DPS', 'Healer'],
    "Hunter": ['R-DPS'],
    "Mage": ['R-DPS'],
    "Priest": ['R-DPS', 'Healer'],
    "Rogue": ['M-DPS'],
    "Shaman": ['M-DPS', 'R-DPS', 'Healer'],
    "Warlock": ['R-DPS'],
    "Warrior": ['Tank', 'M-DPS']
  }

  const setName = (e) => {
    setCharacter({...character, name: e.target.value})
  }

  const setClass = (e) => {
    setCharacter({...character, class: e.target.value})
  }

  const setRole = (e) => {
    setCharacter({...character, role: e.target.value})
  }

  const doSubmit = () => {
    const data = {
      userID: user.id,
      charData: character
    }
    axiosWithAuth()
      .post('/character/add', data)
      .then(res => {
        history.push('/dashboard')
      })
      .catch(err => {
        console.log(err.message)
        console.log(err.error)
      })
  }

  return (
    <div className="character_form">
      <h3>Add Character</h3>
      <section className="char_form_item">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          onChange={setName}
        />
      </section>
      <section className="char_form_item">
        <label htmlFor="class">Class:</label>
        <select
          name="class"
          onChange={setClass}
        >
          {
            classes.map(charClass => {
              return <option value={charClass} key={charClass}>{charClass}</option>
            })
          }
        </select>
      </section>
      <section className="char_form_item">
        <label htmlFor="role">Role:</label>
        {
          character.class ?
              <select
                name="role"
                onChange={setRole}
              >
                <option value=""></option>
                {
                  availableRoles[character.class].map(role => {
                    return <option value={role} key={role}>{role}</option>
                  })
                }
              </select>
            : null
        }
      </section>
      <section className="char_buttons">
        <button onClick={() => history.push('/dashboard')}>Cancel</button>
        <button onClick={doSubmit}>Save</button>
      </section>
    </div>
  )
}

export default AddCharacter