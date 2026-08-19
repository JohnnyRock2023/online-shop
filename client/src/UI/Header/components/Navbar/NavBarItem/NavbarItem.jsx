import React from 'react';
import Class from './NavbarItem.module.css';

const NavbarItem = ({children}) => {
    return (
        <li className={Class.navbarItem}>
            {children}
        </li>
    );
};

export default NavbarItem;