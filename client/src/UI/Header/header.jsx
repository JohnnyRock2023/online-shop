import React from 'react';
import Class from './header.module.css'
import Navbar from "./components/Navbar/Navbar";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import CartHeader from "./components/CartHeader/CartHeader";
import {Link, useNavigate} from "react-router-dom";
import Cart from "../Modals/Cart/Cart";
import Search from "../Components/Search/Search";
import ItemService from "../../API/ItemService";

const Header = () => {

    const [visible, setVisible] = React.useState(false);
    const navigate = useNavigate();

    return (
        <div className={Class.header}>
            <Link to='/items' className={Class.logoLink}>JOHNNY'S SHOP</Link>
            <Navbar/>
            <Search fetch={ItemService.searchItems} className={Class.search} onPickItem={(id)=>navigate(`/items/${id}`)}/>
            <CartHeader setVisible={setVisible}/>
            <Cart visible={visible} setVisible={setVisible} />
            <ProfileHeader/>
        </div>
    );
};

export default Header;