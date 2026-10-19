import {useRef} from 'react';
import usePartialFetching from "../../../../Hooks/usePartialFetching";
import Class from "./Favorites.module.css"
import Loader from "../../../GeneralComponents/Loader/Loader";
import LoaderRef from "../../../GeneralComponents/LoaderRef/LoaderRef";
import FavoritesService from "../../../../API/FavoritesService";
import LikedItem from "./LikedItem/LikedItem";

const Favorites = () => {
    const loaderRef = useRef(null);
    const limit = 10;
    const [isLoading, favorites, setFavorites, hasMore, error] = usePartialFetching(
        async (page, cursor) => await FavoritesService.getFavorites(page, limit, cursor), loaderRef
    );

    return (
        <div className={Class.favorites}>
            {!favorites.length && <h2>You don't have any favorite products yet</h2>}
            {isLoading? <Loader color='white'/>: favorites?.map((item, index) => <LikedItem key={index} item={item}/>)}
            {hasMore && <LoaderRef ref={loaderRef}></LoaderRef>}
        </div>
    );
};

export default Favorites;