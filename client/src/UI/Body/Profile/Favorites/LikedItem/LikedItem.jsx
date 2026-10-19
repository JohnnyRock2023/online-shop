import React from 'react';
import Class from './LikedItem.module.css'
import Uploads from "../../../../../API/Uploads";
import {Link} from "react-router-dom";

const LikedItem = ({item}) => {

    return (
        <Link className={Class.favoriteItem} to={`/products/${item?.id}`}>
            <img className={Class.favoriteImage} src={Uploads.getImageLink(item?.image)}/>
            <h3 className={Class.favoriteName}>{item.name}</h3>
        </Link>
    );
};

export default LikedItem;