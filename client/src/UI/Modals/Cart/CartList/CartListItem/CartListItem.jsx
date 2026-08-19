import React from 'react';
import Class from './CartListItem.module.css'
import Counter from "../../../../Components/Counter/Counter";
import Uploads from "../../../../../API/Uploads";

import CartService from "../../../../../API/CartService";

const CartListItem = ({item_id, items, setItems}) => {
    const item = items.find((item) =>  Number(item_id) === Number(item.id));

    const increase = (id) => {
        setItems(prev => {
            const updated = prev.map(item =>
                Number(item.id) === Number(id)
                    ? { ...item, count: item.count + 1 }
                    : item
            );

            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        });
    };
    const decrease = (id) => {
        setItems(prev => {
            if (item.count > 1) {
                const updated = prev.map(item =>
                    Number(item.id) === Number(id)
                        ? { ...item, count: item.count - 1 }
                        : item
                );

                localStorage.setItem("cart", JSON.stringify(updated));
                return updated;
            }
            deleteFromCart(item.id)
            return prev
        });
    };

    const deleteFromCart = async (id) => {
        const token = localStorage.getItem("token");
        const forDel = items.find(itm => Number(itm.id) === Number(id))
        const upd = items.filter(itm => Number(itm.id) !== Number(id))
        await CartService.delFromCart(token, forDel.id);
        localStorage.setItem("cart", JSON.stringify(upd));
        setItems(upd);
    }


    return (
        <div className={Class.cartListItem}>
            <img className={Class.cartListItem__image} src={Uploads.getImageLink(item.image)} alt={item.image}></img>
            <h2 className={Class.cartListItem__name}>{item.name}</h2>
            <div className={Class.cartListItem__bottomPart}>
                <h3 className={Class.cartListItem__bottomPart__text}>{item.price}$</h3>
                <Counter item={item} increase={increase} decrease={decrease}></Counter>
            </div>
        </div>
    );
};

export default CartListItem;