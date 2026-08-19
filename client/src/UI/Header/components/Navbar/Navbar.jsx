import React from 'react';
import Class from './Navbar.module.css';
import NavbarItem from "./NavBarItem/NavbarItem";

const buttons = ['Home','School','Garage','Garden','About']

const Navbar = (props) => {
    return (
        <ul id={props.id}  className={Class.navbar}>
            {buttons.map((name, index) => <NavbarItem key={index}>{name}</NavbarItem>)}
        </ul>
    );
};

export default Navbar;