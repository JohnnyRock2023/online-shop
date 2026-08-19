import React from 'react';
import Class from './DeliveryList.module.css'
import DeliveryListItem from "./DeliveryItem/DeliveryListItem";

const DeliveryList = ({items}) => {
    return (
        <ul className={Class.deliveryList}>
            {items.map((item) => <DeliveryListItem key={item.id} delivery={item}></DeliveryListItem>)}
        </ul>
    );
};

export default DeliveryList;