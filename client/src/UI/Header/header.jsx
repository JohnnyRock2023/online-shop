import React from 'react';
import Class from './header.module.css'
import Navbar from "./components/Navbar/Navbar";
import ProfileHeader from "./components/RightGroup/ProfileHeader/ProfileHeader";
import CartHeader from "./components/RightGroup/CartHeader/CartHeader";
import {Link, useNavigate} from "react-router-dom";
import Cart from "../Modals/Cart/Cart";
import Search from "../GeneralComponents/Search/Search";
import ProductService from "../../API/ProductService";
import RightGroup from "./components/RightGroup/RightGroup";

const Header = () => {

    const [visible, setVisible] = React.useState(false);
    const navigate = useNavigate();

    return (
        <div className={Class.header}>
            <Link to='/' className={Class.logoLink}>JOHNNY'S SHOP</Link>
            <Navbar/>
            <div style={{display: 'flex', flex: 1}}></div>
            <Search fetch={ProductService.searchProducts} className={Class.search} onPickItem={(id)=>navigate(`/products/${id}`)}/>
            <RightGroup setVisible={setVisible}></RightGroup>
            <Cart visible={visible} setVisible={setVisible} />
        </div>
    );
};

export default Header;