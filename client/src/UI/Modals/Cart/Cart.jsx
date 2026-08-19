import React, {useContext, useEffect} from 'react';
import Class from './Cart.module.css'
import CartList from "./CartList/CartList";
import CustomButton from "../../Components/CustomButton/CustomButton";
import useFetching from "../../../Hooks/useFetching";
import CartService from "../../../API/CartService";
import {useParams} from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import CartContext from "../../../Context/CartContext";

const Cart = ({visible, setVisible}) => {

    const {id} = useParams();

    const {cartItems, setCartItems} = useContext(CartContext);

    const [fetchCart, isLoading, error] = useFetching(async ()=> {
        const token = localStorage.getItem("token");
        const cachedCart = JSON.parse(localStorage.getItem('cart'))

        if (!token && !cachedCart?.length) {
            return;
        }
        else if (!token) {
            setCartItems(cachedCart);
            return;
        }
        else if (!cachedCart?.length) {
            const res = await CartService.getCart(token);
            setCartItems(res);
            return;
        }

        const res = await CartService.getCart(token);

        const updItems = res.map(item => {
            const cachedItem = cachedCart.find(
                c => Number(item.id) === Number(c.id)
            );
            console.log(item);
            if (cachedItem) {
                item.count = Number(cachedItem.count);
            }
            console.log(item);
            return item;
        });
        setCartItems(updItems);
    })

    useEffect(() => {
            fetchCart()
    }, [])

    let clsName = [Class.cart]
    if (visible) {
        clsName.push(Class.active)
    }

    return (
        <div className={clsName.join(' ')} onClick={() => setVisible(false)}>
            <div className={Class.cartContent} onClick={(e)=> e.stopPropagation()}>
                {isLoading ?
                    <Loader color="black"/>
                    :
                    <>
                        <CartList items={cartItems} setItems={setCartItems}/>
                        <div className={Class.cartSummary}>
                            <div className={Class.cartSummaryInner}>
                                <h2 className={Class.cartSummaryInner_text}>{CartService.getSummaryCart(cartItems)}$</h2>
                                <CustomButton className={Class.cartSummaryInner_button}>Buy</CustomButton>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Cart;