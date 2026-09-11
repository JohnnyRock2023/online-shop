import React from 'react';
import Class from "./ProductDetails.module.css";
import CustomButton from "../../../../GeneralComponents/CustomButton/CustomButton";
import DeliveryList from "../DeliveryList/DeliveryList";
import CartService from "../../../../../API/CartService";
import ProductService from "../../../../../API/ProductService";
import {handleRequest} from "../../../../../utils/handleRequest";

import novapost from './icons/novapost.png'
import fedex from './icons/fedex.png'
import meest from './icons/meest.jpg'

const ProductDetails = ({product, cartItems, setCartItems, inCart, setInCart}) => {

    const deliveries = [{id: 1, name: "Nova post", price: "15", logo: novapost , date: 'Tomorrow'},
        {id: 2, name: "Meest", price: "10",logo: meest, date: 'In 2 days'},
        {id: 3, name: "FedEx", price: "10", logo: fedex, date: 'In 2 days'}]

    const removeCartItem = async () => {
        const token = localStorage.getItem("token");
        const upd = cartItems.filter(itm => Number(itm.id) !== Number(product.id))
        setCartItems(upd);
        localStorage.setItem("cart", JSON.stringify(upd));

        if (!token) {
            setInCart(false);
            return;
        }
        const {data, error} = await handleRequest(async () => await CartService.delFromCart(token, product?.id));
        if (!error) {
            setInCart(false);
        }

    }

    const addCartItem = async () => {
        const token = localStorage.getItem("token");

        product.count = 1
        const upd = [...cartItems, product];
        setCartItems(upd);

        if (!token) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
            setInCart(true);
            return;
        }
        const {data, error} = await handleRequest(async () => await ProductService.addToCart(token, product.id, 1));
        if (!error) {
            setInCart(true);
        }
    };

    return (
        <div className={Class.itemDetails}>
            <div className={Class.itemDetailsName}>
                <h2 className={Class.itemDetailsName__text}>{product?.name}</h2>
            </div>
            <div className={Class.itemDetailsBuy}>
                <h2 className={Class.itemDetailsBuy__text}>{product?.price}$</h2>
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

export default ProductDetails;