import React from 'react';
import Class from './CartList.module.css'
import CartListItem from "./CartListItem/CartListItem";

const CartList = ({items, setItems}) => {
    return (
        <div className={Class.cartList}>
            {items && items.map((item) => <CartListItem key={item.id} item_id={item.id} items={items} setItems={setItems}/>)}
        </div>
    );
};

export default CartList;