import React, {useContext, useEffect, useState} from 'react';
import Class from './BodyItem.module.css'
import Loader from "../../Components/Loader/Loader";
import {useParams} from "react-router-dom";
import useFetching from "../../../Hooks/useFetching";
import ItemService from "../../../API/ItemService";
import CartService from "../../../API/CartService";
import CartContext from "../../../Context/CartContext";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import Uploads from "../../../API/Uploads";
import Comments from "./components/CommentsList/Comments";
import {handleRequest} from "../../../utils/handleRequest";


const BodyItem = () => {

    const {id} = useParams();
    const [inCart, setInCart] = useState(false);
    const [fetchItem, isLoading, item, setItem, error] = useFetching(async ()=> {
            const item = await ItemService.getItem(id);
            const token = localStorage.getItem("token")
            if (!token) {
                setInCart(false);
                return item;
            }
            const isInCart = await CartService.isInCart(token, id)
            setInCart(isInCart.data);
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
                <div className={Class.bodyItemContent}>
                        <div className={Class.bodyItemImages} >
                            {isLoading ? <Loader/> :
                                <img className={Class.bodyItemImages__image} src={Uploads.getImageLink(item?.image)} alt={item?.image}></img>
                            }
                        </div>
                        {isLoading ? <Loader/> :
                            <ItemDetails item={item} cartItems={cartItems} setCartItems={setCartItems} inCart={inCart} setInCart={setInCart}/>
                        }

                </div>
                <div className={Class.bodyItemDescription}>
                    <h1 className={Class.bodyItemDescription__title}>Description</h1>
                    {isLoading ? <Loader/> :
                        <div className={Class.description}>
                            <p className={Class.description__text}>{item?.description}</p>
                        </div>
                    }

                </div>
                <div className={Class.bodyItemComments}>
                    <h1 className={Class.commentsList__title}>Commentaries</h1>
                    {isLoading ? <Loader/> :
                        <Comments/>
                    }
                </div>
        </div>
    );
};

export default BodyItem;