import styled from "styled-components";
import { NavLink } from "react-router-dom"
import { v4 as uuid } from 'uuid'
import React, { useRef, useState } from "react";
import './bootStrapNavBar.css'


let navLinks = [

    {
        txt: 'Tree',
        to: '/tree',
        key: uuid()
    },

    {
        txt: 'Edit Tree',
        to: '/edit-tree',
        key: uuid()
    },
    {
        txt: 'Search Resource',
        to: '/search',
        key: uuid()
    },
    {
        txt: 'About',
        to: '/about',
        key: uuid()
    }
]
const BootStrapNavBar = React.forwardRef((props, ref) => {

    const toggleButton = useRef()
    const [navbarBgClass, setNavbarBgClass] = useState('')

    const onToggleButtonClicked = () => {
        if (toggleButton.current.ariaExpanded === 'true') {
            setNavbarBgClass('bg-light expanded')
        } else {
            setNavbarBgClass('')
        }
    }

    const onCloseTogglerClicked = () => {
        console.log("onToggleButtonClicked")
        setNavbarBgClass('')
    }

    return (

        <>
            <a onClick={onCloseTogglerClicked} class="close-navbar-toggler collapsed" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            </a>
            <header className="navBarHeader">


                <nav className={`navbar brandNavBar`}>
                    <div className="container-fluid ">
                        <a className="navbar-brand" href="/tree">
                            <img src={process.env.PUBLIC_URL + '/favicon.ico'} width="40" height="40" class="d-inline-block align-top" alt="" />
                            ToK
                        </a>
                    </div>
                </nav>

                <nav className={`navbar dropdownMenuNavBar ${navbarBgClass}`} ref={ref}>
                    <div className="container-fluid dropdownContainer">
                        <button ref={toggleButton} onClick={onToggleButtonClicked} className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
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
                </nav>
            </header>
        </>


    )
})
export default BootStrapNavBar