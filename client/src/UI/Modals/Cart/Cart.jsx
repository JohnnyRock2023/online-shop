import React, {useContext, useEffect} from 'react';
import Class from './Cart.module.css'
import CartList from "./CartList/CartList";
import CustomButton from "../../Components/CustomButton/CustomButton";
import useFetching from "../../../Hooks/useFetching";
import CartService from "../../../API/CartService";
import {useParams} from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import CartContext from "../../../Context/CartContext";
import {handleRequest} from "../../../utils/handleRequest";

const Cart = ({visible, setVisible}) => {
    const {cartItems, setCartItems} = useContext(CartContext);

    const [fetchCart, isLoading, cart, setCart, error] = useFetching(async ()=> {
        const token = localStorage.getItem("token");
        const cachedCart = JSON.parse(localStorage.getItem('cart'))

        if (!token && !cachedCart?.length) {
            return {data: null, error: null};;
        }
        else if (!token) {
            setCartItems(cachedCart);
            return {data: null, error: null};
        }
        else if (!cachedCart?.length) {
            const {data, error} = await handleRequest(async () => await CartService.getCart(token));
            if (!error) {
                setCartItems(data);
            }
            return {data, error};
        }

        const {data, error} = await handleRequest(async () => await CartService.getCart(token));
        if (!error) {
            const updItems = data?.map(item => {
                const cachedItem = cachedCart.find(
                    c => Number(item.id) === Number(c.id)
                );
                if (cachedItem) {
                    item.count = Number(cachedItem.count);
                }
                return item;
            });
            setCartItems(updItems);
        }
    })

    useEffect(() => {
        if (visible) {
            fetchCart()
        }
    }, [visible])

    let clsName = [Class.cart]
    if (visible) {
        clsName.push(Class.active)
    }

    return (
        <div className={clsName.join(' ')} onClick={() => setVisible(false)}>
            <div className={Class.cartContent} onClick={(e)=> e.stopPropagation()}>
                {isLoading ?
                    <Loader/>
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