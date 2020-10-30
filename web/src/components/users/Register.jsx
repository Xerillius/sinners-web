import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const history = useHistory();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const doSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/register', userData)
      .then(res => {
        history.push('/login');
      })
      .catch(err => {
        const {message, error} = err;
        console.log(message);
        console.log(error);
      })
  }

  return(
    <section className="log-form">
      <h1>Register</h1>
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
          <Link to='/login'>Login</Link>
          <button type="submit">Submit</button>
        </section>
      </form>
    </section>
  );
}

export default Register;