import React from 'react';
import Class from './SearchUsersItem.module.css'
import Uploads from "../../../../../../../../API/Uploads";

const SearchResultItem = ({user, onClick}) => {
    return (
        <div className={Class.SearchUsersItem} onClick={onClick}>
            <img src={Uploads.getImageLink(user.image)} alt='img'></img>
            <h4 className={Class.Name}>{user.name}</h4>
            <h4 className={Class.Email}>{user.email}</h4>
        </div>
    );
};

export default SearchResultItem;