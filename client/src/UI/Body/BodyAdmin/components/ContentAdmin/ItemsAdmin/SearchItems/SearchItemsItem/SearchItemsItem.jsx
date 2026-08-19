import React from 'react';
import Class from './SearchItemsItem.module.css'
import Uploads from "../../../../../../../../API/Uploads";

const SearchResultItem = ({item, onClick}) => {
    return (
        <div className={Class.SearchUsersItem} onClick={onClick}>
            <img src={Uploads.getImageLink(item.image)} alt='img'></img>
            <h2 className={Class.Name}>{item.name}</h2>
            <h2 className={Class.Email}>{item.price}$</h2>
        </div>
    );
};

export default SearchResultItem;