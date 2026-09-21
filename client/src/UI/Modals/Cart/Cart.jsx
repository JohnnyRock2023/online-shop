import React, {useContext, useEffect, useState} from 'react';
import Class from './Cart.module.css'
import CartList from "./CartList/CartList";
import CustomButton from "../../GeneralComponents/CustomButton/CustomButton";
import useFetching from "../../../Hooks/useFetching";
import CartService from "../../../API/CartService";
import Loader from "../../GeneralComponents/Loader/Loader";
import CartContext from "../../../Context/CartContext";
import {handleRequest} from "../../../utils/handleRequest";
import OrderService from "../../../API/OrderService";
import PaymentService from "../../../API/PaymentService";
import Message from "../Message/Message";

const Cart = ({visible, setVisible}) => {
    const {cartItems, setCartItems} = useContext(CartContext);
    const [visibleMessage, setVisibleMessage] = useState(false)
    const [message, setMessage] = useState('')

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

    const buy = async () => {
        const {data: order_data, error: order_error} = await handleRequest(async () => await OrderService.addOrder(cartItems))
        if (order_error) {
            setMessage("Order Adding Error")
            setVisibleMessage(true)
            return
        }
        const {data, error} = handleRequest( async () => await PaymentService.processPayment(order_data.payment_id))
        if (error) {
            setMessage("Payment Error")
            setVisibleMessage(true)
            console.log(error)
            return
        }
        setMessage("Thank you!")
        setVisibleMessage(true)
    }

    return (
        <div className={clsName.join(' ')} onClick={() => setVisible(false)}>
            <Message message={message} setVisible={setVisibleMessage} visible={visibleMessage}></Message>
            <div className={Class.cartContent} onClick={(e)=> e.stopPropagation()}>
                {isLoading ?
                    <Loader/>
                    :
                    <>
                        <CartList items={cartItems} setItems={setCartItems}/>
                        <div className={Class.cartSummary}>
                            <div className={Class.cartSummaryInner}>
                                <h2 className={Class.cartSummaryInner_text}>{CartService.getSummaryCart(cartItems)}$</h2>
                                <CustomButton className={Class.cartSummaryInner_button} onClick={buy}>Buy</CustomButton>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Cart;