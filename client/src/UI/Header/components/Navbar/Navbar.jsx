import React, {useContext, useEffect} from 'react';
import Class from './Navbar.module.css';
import NavbarItem from "./NavBarItem/NavbarItem";
import {useNavigate} from "react-router-dom";
import UserContext from "../../../../Context/UserContext";

const buttons = ['Home','School','Garage','Garden','About']

const Navbar = (props) => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext)

    return (
        <ul key={props.id}  className={Class.navbar}>
            {buttons.map((name, index) => <NavbarItem key={index}>{name}</NavbarItem>)}
            {(user?.role === 'admin' || user?.role === 'super') && <NavbarItem key='5' admin={true} onClick={() => navigate("/admin")}>Admin</NavbarItem>}
        </ul>
    );
};

export default Navbar;