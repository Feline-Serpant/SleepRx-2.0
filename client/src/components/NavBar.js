import React from 'react'
import {NavLink} from 'react-router-dom'

import Cookies from 'universal-cookie';
const cookies = new Cookies();


const NavBar = () => {
    const deleteJWT = (e) => {
        cookies.remove("jwt");
    }
    return (
        <div>
            <nav>
               
                <NavLink className="navLink" to="/">  HOME  </NavLink>
                <NavLink className="navLink" to="/register">  REGISTER  </NavLink>
                <NavLink className="navLink" to="/login">  LOGIN  </NavLink>
                <NavLink className="navLink" to="/tracker">  SLEEP TRACKER  </NavLink>
                <NavLink className="navLink" to="/dreams">   DREAM JOURNAL   </NavLink>
                <NavLink className="navLink" to="/about">   ABOUT   </NavLink>
                <NavLink className="navLink" to="/"> <span onClick={deleteJWT}>LOGOUT</span>   </NavLink>


            </nav>
        </div>
    )
}

export default NavBar
