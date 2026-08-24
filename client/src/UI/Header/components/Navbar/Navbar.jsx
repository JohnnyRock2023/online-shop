import React, {useEffect} from 'react';
import Class from './Navbar.module.css';
import NavbarItem from "./NavBarItem/NavbarItem";
import UserService from "../../../../API/UserService";
import {useNavigate} from "react-router-dom";
import useFetching from "../../../../Hooks/useFetching";

const buttons = ['Home','School','Garage','Garden','About']

const Navbar = (props) => {
    const [role, setRole] = React.useState('user');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [fetchUser, isLoading, user, error] = useFetching(
        async () => {
            const user = await UserService.getUserData();
            localStorage.setItem('profileImage', user?.data?.image);
        }
    )

    useEffect( () => {
       fetchUser();
    }, [])
    return (
        <ul key={props.id}  className={Class.navbar}>
            {buttons.map((name, index) => <NavbarItem key={index}>{name}</NavbarItem>)}
            {user?.role === 'admin' || user?.role === 'super' ? <NavbarItem key='5' admin={true} onClick={() => navigate("/admin")}>Admin</NavbarItem>: null}
        </ul>
    );
};

export default Navbar;