import React from 'react';
import Class from './NavbarItem.module.css';
import {Link, useNavigate} from "react-router-dom";

const NavbarItem = ({children, to, admin}) => {
    let clsName = [Class.navbarItem]

    if (admin) {
        clsName.push(Class.admin);
    }

    return (
        <Link className={clsName.join(' ')} to={to}>
            {children}
        </Link>
    );
};

export default NavbarItem;