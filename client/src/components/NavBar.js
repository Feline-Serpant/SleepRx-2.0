import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <nav>
               
                <NavLink className="navLink" to="/">  HOME  </NavLink>
                <NavLink className="navLink" to="/register">  REGISTER  </NavLink>
                <NavLink className="navLink" to="/login">  LOGIN  </NavLink>
                <NavLink className="navLink" to="/tracker">  SLEEP TRACKER  </NavLink>
                <NavLink className="navLink" to="/dreams">   DREAM JOURNAL   </NavLink>
                <NavLink className="navLink" to="/about">   ABOUT   </NavLink>


            </nav>
        </div>
    )
}

export default NavBar
