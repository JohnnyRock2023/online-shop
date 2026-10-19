import React, {useContext} from 'react';
import Class from './ListItem.module.css';
import {useNavigate} from "react-router-dom";
import Uploads from "../../../../API/Uploads";
import redHeart from "./icons/heart-red.svg"
import whiteHeart from "./icons/heart-white.svg"
import FavoritesService from "../../../../API/FavoritesService";
import UserContext from "../../../../Context/UserContext";

const ListItem = ({item}) => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [image, setImage] = React.useState(item.isfavorite ? redHeart: whiteHeart);

    return (
        <div className={Class.listItem} onClick={()=> navigate(`/items/${item.id}`)}>
            <div className={Class.imageContainer}>
                <img className={Class.imageContainer__image} src={Uploads.getImageLink(item.image)} alt={item.image}></img>
            </div>
            <h3 className={Class.listItem__text}>{item.name}</h3>
            <div className={Class.bottomPart}>
                <h3 className={Class.listItem__text} style={{margin: 0}}>{item.price}$</h3>
                {userContext?.user &&
                    <img className={Class.like} src={image} onClick={async (e) => {
                        e.stopPropagation()
                        if (!item.isfavorite) {
                            await FavoritesService.addFavorite(item.id)
                            setImage(redHeart)
                        }
                        else {
                            await FavoritesService.deleteFavorite(item.id)
                            setImage(whiteHeart);
                        }
                        item.isfavorite = !item.isfavorite
                    }
                } alt="">
                </img>}
            </div>
        </div>
    );
};

export default ListItem;
