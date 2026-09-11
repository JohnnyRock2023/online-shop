import React from 'react';
import Class from './DeliveryList.module.css'
import DeliveryListItem from "./DeliveryItem/DeliveryListItem";

const DeliveryList = ({items, className}) => {
    let clsName = [Class.deliveryList]
    if (className) {clsName.push(className)}

    return (
        <ul className={clsName.join(" ")}>
            {items.map((item) => <DeliveryListItem key={item.id} delivery={item}></DeliveryListItem>)}
        </ul>
    );
};

export default DeliveryList;