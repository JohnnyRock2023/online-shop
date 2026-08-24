import React from 'react';
import Class from "./ItemDetails.module.css";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import DeliveryList from "../DeliveryList/DeliveryList";
import CartService from "../../../../../API/CartService";
import ItemService from "../../../../../API/ItemService";
import {handleRequest} from "../../../../../utils/handleRequest";

const ItemDetails = ({item, cartItems, setCartItems, inCart, setInCart}) => {

    const deliveries = [{id: 1, name: "Nova post", price: "15", logo: "novapost.png", date: 'Tomorrow'},
        {id: 2, name: "Meest", price: "10",logo: "meest.jpg", date: 'In 2 days'},
        {id: 3, name: "FedEx", price: "10", logo: "fedex.png", date: 'In 2 days'}]

    const removeCartItem = async () => {
        const token = localStorage.getItem("token");

        const upd = cartItems.filter(itm => Number(itm.id) !== Number(item.id))
        setCartItems(upd);
        localStorage.setItem("cart", JSON.stringify(upd));

        if (!token) {
            setInCart(false);
            return;
        }
        const {data, error} = await handleRequest(async () => await CartService.delFromCart(token, item.id));
        if (!error) {
            setInCart(false);
        }

    }

    const addCartItem = async () => {
        const token = localStorage.getItem("token");

        item.count = 1
        const upd = [...cartItems, item];
        setCartItems(upd);

        if (!token) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
            setInCart(true);
            return;
        }
        const {data, error} = await handleRequest(async () => await ItemService.addToCart(token, item.id, 1));
        if (!error) {
            setInCart(true);
        }
    };

    return (
        <div className={Class.itemDetails}>
            <div className={Class.itemDetailsName}>
                <h2 className={Class.itemDetailsName__text}>{item?.name}</h2>
            </div>
            <div className={Class.itemDetailsBuy}>
                <h2 className={Class.itemDetailsBuy__text}>{item?.price}$</h2>
                {inCart ?
                    <CustomButton className={Class.itemDetailsBuy__button} onClick={async () => await removeCartItem()}>
                        Remove from cart
                    </CustomButton>
                    :
                    <CustomButton className={Class.itemDetailsBuy__button} onClick={async () => await addCartItem()}>
                        Add to cart
                    </CustomButton>
                }
            </div>
            <div className={Class.itemDetailsDelivery}>
                <h1 className={Class.itemDetailsDelivery__title}>Delivery to New York</h1>
                <DeliveryList items={deliveries}></DeliveryList>
            </div>
        </div>
    );

};

export default ItemDetails;