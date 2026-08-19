import React, {useContext, useEffect, useState} from 'react';
import Class from './BodyItem.module.css'
import CommentsList from "./components/CommentsList/CommentsList";
import Loader from "../../Components/Loader/Loader";
import {useParams} from "react-router-dom";
import useFetching from "../../../Hooks/useFetching";
import ItemService from "../../../API/ItemService";
import CartService from "../../../API/CartService";
import CartContext from "../../../Context/CartContext";
import ItemDetails from "./components/ItemDetails/ItemDetails";


const BodyItem = () => {

    const {id} = useParams();
    const [item, setItem] = useState({});
    const [inCart, setInCart] = useState(false);
    const [fetchItem, isLoading, error] = useFetching(async ()=> {
            const itm = await ItemService.getItem(id);
            setItem(itm);
            const token = localStorage.getItem("token")
            if (!token) {
                setInCart(false);
                return;
            }
            const isInCart = await CartService.isInCart(token, id)
            setInCart(isInCart);
        }
    );

    const {cartItems, setCartItems} = useContext(CartContext);

    useEffect(() => {
        fetchItem();
    }, [])

    return (
        <div className={Class.bodyItem}>
            {error && <h1>{error.toString()}</h1>}
            {isLoading ? <Loader/> :
            <>
                <div className={Class.bodyItemContent}>
                        <div className={Class.bodyItemImages} >
                            <img className={Class.bodyItemImages__image} src={`http://localhost:5000/uploads/${item.image}`} alt="img"></img>
                        </div>
                        <ItemDetails item={item} cartItems={cartItems} setCartItems={setCartItems} inCart={inCart} setInCart={setInCart}/>
                </div>
                <div className={Class.bodyItemDescription}>
                    <h1 className={Class.bodyItemDescription__title}>Description</h1>
                    <div className={Class.description}>
                        <p className={Class.description__text}>{item.description}</p>
                    </div>
                </div>
                <div className={Class.bodyItemComments}>
                    <CommentsList/>
                </div>
            </>}
        </div>
    );
};

export default BodyItem;