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
import Uploads from "../../../API/Uploads";


const BodyItem = () => {

    const {id} = useParams();
    const [inCart, setInCart] = useState(false);
    const [fetchItem, isLoading, result, error] = useFetching(async ()=> {
            const item = await ItemService.getItem(id);
            const token = localStorage.getItem("token")
            if (!token) {
                setInCart(false);
                return;
            }
            const isInCart = await CartService.isInCart(token, id)
            setInCart(isInCart);
            return item
        }
    );

    const {cartItems, setCartItems} = useContext(CartContext);

    useEffect(() => {
        fetchItem();
    }, [id])

    return (
        <div className={Class.bodyItem}>
            {error && <h1>{error.toString()}</h1>}
            {isLoading ? <Loader/> :
            <>
                <div className={Class.bodyItemContent}>
                        <div className={Class.bodyItemImages} >
                            <img className={Class.bodyItemImages__image} src={Uploads.getImageLink(result?.image)} alt={result?.image}></img>
                        </div>
                        <ItemDetails item={result} cartItems={cartItems} setCartItems={setCartItems} inCart={inCart} setInCart={setInCart}/>
                </div>
                <div className={Class.bodyItemDescription}>
                    <h1 className={Class.bodyItemDescription__title}>Description</h1>
                    <div className={Class.description}>
                        <p className={Class.description__text}>{result?.description}</p>
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