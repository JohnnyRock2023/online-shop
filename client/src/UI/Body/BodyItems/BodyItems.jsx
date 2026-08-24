import React, {useEffect, useMemo, useState} from 'react';
import Class from './BodyItems.module.css'
import ListItem from "./ListItem/ListItem";
import Sortbar from "../../SortBar/Sortbar";
import useFetching from "../../../Hooks/useFetching";
import ItemService from "../../../API/ItemService";
import Loader from "../../Components/Loader/Loader";

const BodyItems = () => {
    const [sort, setSort] = useState('By name')

    const [fetchItems, isLoading, result, error] = useFetching(
            async () => await ItemService.getItems(1, 10)
    );

    useEffect(() => {
        fetchItems();
    }, [])


    const sortItems = (sort, items) => {
        if (items) {
            switch (sort) {
                case 'By name':
                    return [...items].sort((a, b) => a.name.localeCompare(b.name));
                case 'From expensive to cheap':
                    return [...items].sort((a, b) => b.price - a.price);
                case 'From cheap to expensive':
                    return [...items].sort((a, b) => a.price - b.price);
                default:
                    return items;
            }
        }
    }

    const cachedSort = useMemo(() => {return sortItems(sort, result);}, [sort, result])

    return (
        <div className={Class.bodyItems}>
            <Sortbar setSort={setSort} />
            {error && <h1 color='white'>{error.toString()}</h1>}
            {isLoading ?
                <Loader></Loader>
                :
                <div className={Class.itemsList}>
                    {cachedSort?.map((item) => <ListItem key={item.id} item={item}/>)}
                </div>
            }
        </div>
    );
};

export default BodyItems;