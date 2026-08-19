import React from 'react';
import Class from './ListItem.module.css';
import {useNavigate} from "react-router-dom";
import Uploads from "../../../../API/Uploads";

const ListItem = ({item}) => {
    const navigate = useNavigate();

    return (
        <div className={Class.ListItem} onClick={()=> navigate(`/items/${item.id}`)}>
            <img src={Uploads.getImageLink(item.image)} alt={item.image}></img>
            <h3>{item.name}</h3>
            <h3>{item.price}$</h3>
        </div>
    );
};

export default ListItem;
