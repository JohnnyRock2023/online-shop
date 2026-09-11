import React from 'react';
import Class from './ListItem.module.css';
import {useNavigate} from "react-router-dom";
import Uploads from "../../../../API/Uploads";

const ListItem = ({item}) => {
    const navigate = useNavigate();

    return (
        <div className={Class.listItem} onClick={()=> navigate(`/items/${item.id}`)}>
            <div className={Class.imageContainer}>
                <img className={Class.imageContainer__image} src={Uploads.getImageLink(item.image)} alt={item.image}></img>
            </div>
            <h3 className={Class.listItem__text}>{item.name}</h3>
            <h3 className={Class.listItem__text}>{item.price}$</h3>
        </div>
    );
};

export default ListItem;
