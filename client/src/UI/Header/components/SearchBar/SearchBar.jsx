import React, {useEffect, useMemo} from 'react';
import Class from './SearchBar.module.css'
import ItemService from "../../../../API/ItemService";
import SearchResultItem from "./SearchResultsItem/SearchResultItem";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
    const [search, setSearch] = React.useState('');
    const [allItems, setAllItems] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllItems = async () => {
            const res = await ItemService.getItems()
            setAllItems(res)
        }
        getAllItems()
    }, []);

    const cachedItems = useMemo(() => {
        if (search !== '') {
            const filteredItems = allItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
            return filteredItems
        }
    }, [search])

    return (
        <div className={Class.search}>
            <div className={Class.searchBar}>
                <input className={Class.searchBar__input} type='text' value={search} onChange={e=> setSearch(e.target.value)} placeholder="I'm looking for..." ></input>
                <button className={Class.searchBar__button}></button>
            </div>
        {search ?
            <div className={Class.searchResults}>
                {cachedItems && cachedItems.map(item => <SearchResultItem item={item} onClick={() => navigate(`/items/${item.id}`)} />)}
            </div>
            :
            <></>}
        </div>
    );
}

export default SearchBar;