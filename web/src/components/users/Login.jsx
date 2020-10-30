import React, { useState, useContext } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../../context/UserContext';

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const {setUser} = useContext(UserContext);
  const history = useHistory();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const doSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', userData)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        const token = res.data.token
        const tempData = res.data.userData
        setUser({
          token: token,
          id: tempData.userID,
          username: tempData.username,
          approved: tempData.approved,
          createEvent: tempData.createEvent
        });
        history.push('/calendar');
      })
      .catch(err => {
        console.log(err)
      })
  }

  return(
    <section className="log-form">
      <h1>Log In</h1>
      <form onSubmit={doSubmit}>
        <label>
          Username:
          <input
            id="username"
            name="username"
            type="text"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            id="password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <section className='form-footer'>
          <Link to='/register'>Register</Link>
          <button type="submit">Submit</button>
        </section>
      </form>
    </section>
  );
}

export default Login;