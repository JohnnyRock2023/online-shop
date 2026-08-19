import React from 'react';
import Class from './header.module.css'
import SearchBar from "./components/SearchBar/SearchBar";
import Navbar from "./components/Navbar/Navbar";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import CartHeader from "./components/CartHeader/CartHeader";
import {Link} from "react-router-dom";
import Cart from "../Modals/Cart/Cart";

const Header = () => {

    const [visible, setVisible] = React.useState(false);

    return (
        <div className={Class.header}>
            <Link to='/items' className={Class.logoLink}>JOHNNY'S SHOP</Link>
            <Navbar/>
            <SearchBar/>
            <CartHeader setVisible={setVisible}/>
            <Cart visible={visible} setVisible={setVisible} />
            <ProfileHeader/>
        </div>
    );
};

export default Header;