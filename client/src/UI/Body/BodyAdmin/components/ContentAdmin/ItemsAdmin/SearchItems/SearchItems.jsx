import React, {useEffect, useMemo} from 'react';
import Class from './SearchItems.module.css'
import UserService from "../../../../../../../API/UserService";
import SearchUsersItem from "./SearchItemsItem/SearchItemsItem";
import SearchItemsItem from "./SearchItemsItem/SearchItemsItem";
import ItemService from "../../../../../../../API/ItemService";

const SearchItems = ({item, setItem}) => {
    const [search, setSearch] = React.useState('');
    const [allItems, setAllItems] = React.useState([]);
    const [visible, setVisible] = React.useState(true);

    useEffect(() => {
        const getAllItems = async () => {
            const res = await ItemService.getItems()
            setAllItems(res)
        }
        getAllItems()
    }, []);

    const cachedItems = useMemo(() => {
        if (search !== '') {
            const filteredItems = allItems.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
            return filteredItems
        }
    }, [search])

    const pickItem = (item) => {
        setItem(item);
        setVisible(false);
    }

    return (
        <div className={Class.SearchUsers}>
            <div className={Class.SearchBar}>
                <input type='text' value={search} onChange={e=> setSearch(e.target.value)} onClick={()=> setVisible(true)} placeholder="Enter item name..." ></input>
                <button></button>
            </div>
            {search && visible ?
                <div className={Class.SearchResults}>
                    {cachedItems.map((item) => <SearchItemsItem item={item} onClick={() => pickItem(item)} ></SearchItemsItem>)}
                </div>
                :
                <></>}
        </div>
    );
};

export default SearchItems;