import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const Navbar = () => {
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token')
    setUser(false)
    history.push('/')
  }

  return(
    <nav>
      {user ?
          <section className="navbar-brand">
            <Link to="/dashboard">{user.username}</Link>
          </section>
        : <section className="navbar-brand" />
      }
      <section className="nav-links">
        {user && user.token ? 
            <>
              <Link to="/calendar">Calendar</Link>
              <Link to="/login" onClick={logOut}>Logout</Link>
            </>
          : <Link to="/login">Login</Link>
        }
      </section>
    </nav>
  );
}

export default Navbar;