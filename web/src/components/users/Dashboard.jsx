import React, { useState, useEffect, useContext } from 'react'
import {axiosWithAuth} from '../axiosWithAuth/axiosWithAuth'
import { Link } from 'react-router-dom'
import {UserContext} from '../../context/UserContext'

import Character from './Character'

const Dashboard = () => {
  const {user} = useContext(UserContext)
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    if(user){
      axiosWithAuth()
        .get(`/character/user/${user.id}`)
        .then(res => {
          setCharacters(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [user])

  return (
    <div className="dashboard">
      { user && user.admin ?
          <section>Admin Dashboard Panel</section>
        : null
      }
      <section className="profile">
        <section className="characters">
          <h1>Character List</h1>
          {
            characters ?
              <> 
                <div className="char_list_tags">
                  <span>Name</span>
                  <span>Class</span>
                  <span>Role</span>
                  <span>Main</span>
                </div>
                {
                  characters.map((character, i) => {
                    return (
                      <Character data={character} key={i} />
                    )
                  })
                }
              </>
              : null
          }
          <button className="addCharacter"><Link to="/addCharacter">Add Character</Link></button>
        </section>
        <section className="upcomingEvents">
          <h1>Upcoming Events</h1>
          {
            false ? // Update this for events
                <div>Something</div>
              : <div>No events to display</div>
          }
        </section>
      </section>
    </div>
  )
}

export default Dashboard