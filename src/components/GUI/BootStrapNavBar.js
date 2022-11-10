import styled from "styled-components";
import { NavLink } from "react-router-dom"
import { v4 as uuid } from 'uuid'
import React from "react";

const NavBarRoot = styled.div`
    .active-nav-link{
        color:black;
    }
    .navbar{
        z-index: 9999;
        position:relative;
    }
`
let navLinks = [

    {
        txt: 'Home',
        to: '/home',
        key: uuid()
    },

    {
        txt: 'Macro',
        to: '/connect',
        key: uuid()
    },
    {
        txt: 'Connect',
        to: '/connect',
        key: uuid()
    },
    {
        txt: 'About',
        to: '/about',
        key: uuid()
    }
]
const BootStrapNavBar = React.forwardRef((props, ref) => {
 
    return(
        <nav className={`navbar navbar-expand-lg bg-light `} ref={ref}>
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Memory Vault</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">

                {navLinks.map(link => 
                <NavLink 
                    className={` nav-link `} 
                    activeclassname={styled.activeClassName} 
                    to={link.to}
                    key={link.key}>
                        {link.txt}
                </NavLink>)}
                
            </div>
            </div>
        </div>
        </nav>
    )
})
export default BootStrapNavBar