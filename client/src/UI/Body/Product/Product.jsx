import {useContext, useEffect, useState} from 'react';
import Class from './Product.module.css'
import Loader from "../../GeneralComponents/Loader/Loader";
import {useParams} from "react-router-dom";
import useFetching from "../../../Hooks/useFetching";
import ProductService from "../../../API/ProductService";
import CartService from "../../../API/CartService";
import CartContext from "../../../Context/CartContext";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Uploads from "../../../API/Uploads";
import Comments from "./components/CommentsList/Comments";


const Product = () => {

    const {id} = useParams();
    const [inCart, setInCart] = useState(false);
    const [fetchItem, isLoading, product, setProducts, error] = useFetching(async ()=> {
            const product = await ProductService.getProduct(id);
            const token = localStorage.getItem("token")
            if (!token) {
                setInCart(false);
                return product;
            }
            const isInCart = await CartService.isInCart(token, id)
            setInCart(isInCart.data);
            return product
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
                                <img className={Class.bodyItemImages__image} src={Uploads.getImageLink(product?.image)} alt={product?.image}></img>
                            }
                        </div>
                        {isLoading ? <Loader/> :
                            <ProductDetails product={product} cartItems={cartItems} setCartItems={setCartItems} inCart={inCart} setInCart={setInCart}/>
                        }

                </div>
                <div className={Class.bodyItemDescription}>
                    <h1 className={Class.bodyItemDescription__title}>Description</h1>
                    {isLoading ? <Loader/> :
                        <div className={Class.description}>
                            <p className={Class.description__text}>{product?.description}</p>
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

export default Product;