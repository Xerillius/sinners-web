import React from 'react'
import {axiosWithAuth} from '../axiosWithAuth/axiosWithAuth'

const Character = (props) => {
  console.log(props.data)

  const delChar = (e) => {
    axiosWithAuth()
      .delete(`/character/${props.data.id}`)
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="char_list_item">
      <span>{props.data.name}</span>
      <span>{props.data.charClass}</span>
      <span>{props.data.role}</span>
      {
        props.data.main ?
            <span>Yes</span>
          : <button>Swap</button>
      }
      <button onClick={delChar}>Delete</button>
    </div>
  )
}

export default Character