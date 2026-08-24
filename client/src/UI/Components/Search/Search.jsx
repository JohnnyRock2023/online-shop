
import useFetching from "../../../Hooks/useFetching";
import {useEffect, useState} from "react";
import Loader from "../Loader/Loader";
import Class from './Search.module.css'
import SearchUsersItem from "./SearchUsersItem/SearchUsersItem";
import SearchItemsItem from "./SearchItemsItem/SearchItemsItem";


const Search = ({fetch, onPickItem, setItem, className}) => {
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [fetchItems, isLoading, items, error] = useFetching(async () => await fetch(search))


    let clsName = [Class.search]
    if (className) {
        clsName.push(className)
    }

    useEffect(() => {
        if (search) {
            fetchItems();
        }
    }, [search])

    const pickItem = (item) => {
        if (setItem) {
            setItem(item);
        }
        setVisible(false);
        if (onPickItem) {
            onPickItem(item?.id);
        }
    }

    return (
        <div className={clsName.join(" ")}>
            <div className={Class.searchBar}>
                <input className={Class.searchBar__input} type='text' value={search}
                       onFocus={()=>setVisible(true)} onBlur={()=>setVisible(false)} onChange={e=> setSearch(e.target.value)} placeholder="I'm looking for..." ></input>
                <button className={Class.searchBar__button}></button>
            </div>
            {search ?
                <div onMouseDown={e=> e.preventDefault()} className={Class.searchResults}>
                    {error && error.toString()}
                    {visible && (isLoading ? <Loader color='black'/> :
                            (items?.at(0)?.price ?
                            items?.map(item => <SearchItemsItem key={item?.id} item={item} onClick={() => pickItem(item)} />) :
                            items?.map(item => <SearchUsersItem key={item?.id} user={item} onClick={() => pickItem(item)} />)))
                    }
                </div>
                :
                null}
        </div>
    );
}

export default Search;