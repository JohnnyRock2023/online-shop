import React from 'react';
import Class from './SearchItemsItem.module.css'
import Uploads from "../../../../API/Uploads";

const SearchItemsItem = ({item, onClick}) => {
    return (
        <div className={Class.searchResultItem} onClick={onClick}>
            <img className={Class.searchResultItem__image} src={Uploads.getImageLink(item.image)} alt={item.image}></img>
            <h3 className={Class.searchResultItem__name}>{item.name}</h3>
            <h3 className={Class.searchResultItem__price}>{item.price}$</h3>
        </div>
    );
};

export default SearchItemsItem;