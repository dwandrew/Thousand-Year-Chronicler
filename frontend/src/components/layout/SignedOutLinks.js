import React from 'react'
import { NavLink } from 'react-router-dom'

const SingedOutLinks = () => {
    return (

            <ul className = 'navbar'>
                <li><NavLink to='/'>Home</NavLink></li> 
                <li><NavLink to='/instructions'>Instructions</NavLink> </li>
                <li><NavLink to='/signin'> Sign In </NavLink></li>
                <li><NavLink to='/signup'> Sign Up </NavLink></li>
            </ul>
    )
    }

export default SingedOutLinks