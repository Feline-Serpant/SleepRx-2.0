import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <nav>
               
                <NavLink to="/">  HOME  </NavLink>
                <NavLink to="/register">  Register  </NavLink>
                <NavLink to="/login">  Login  </NavLink>
                <NavLink to="/tracker">  SLEEP TRACKER  </NavLink>
                <NavLink to="/about">   ABOUT   </NavLink>


            </nav>
        </div>
    )
}

export default NavBar
