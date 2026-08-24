import React from 'react';
import Class from './NavbarItem.module.css';
import {useNavigate} from "react-router-dom";

const NavbarItem = ({children, onClick, admin}) => {
    let clsName = [Class.navbarItem]

    if (admin) {
        clsName.push(Class.admin);
    }

    return (
        <li className={clsName.join(' ')} onClick={onClick}>
            {children}
        </li>
    );
};

export default NavbarItem;