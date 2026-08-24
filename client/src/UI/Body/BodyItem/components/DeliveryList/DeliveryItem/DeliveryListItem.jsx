import React from 'react';
import Class from './DeliveryListItem.module.css'
import Uploads from "../../../../../../API/Uploads";

const DeliveryListItem = ({delivery}) => {
    return (
        <li className={Class.DeliveryListItem}>
            <div className={Class.DeliveryLogo}>
                <img src={Uploads.getImageLink(delivery.logo)} alt={delivery.logo}></img>
            </div>
            <div className={Class.DeliveryInfo}>
                <div className={Class.DeliveryName}>
                    <h2>{delivery.name}</h2>
                </div>
                <div className={Class.DeliveryDate}>
                    <h2>{delivery.date}</h2>
                </div>
                <div className={Class.DeliveryPrice}>
                    <h2>{delivery.price}$</h2>
                </div>
            </div>
        </li>
    );
};

export default DeliveryListItem;