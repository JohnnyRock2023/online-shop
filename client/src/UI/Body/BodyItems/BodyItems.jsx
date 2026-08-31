import React, {useEffect, useMemo, useRef, useState} from 'react';
import Class from './BodyItems.module.css'
import ListItem from "./ListItem/ListItem";
import Sortbar from "../../SortBar/Sortbar";
import useFetching from "../../../Hooks/useFetching";
import ItemService from "../../../API/ItemService";
import Loader from "../../Components/Loader/Loader";
import usePartialFetching from "../../../Hooks/usePartialFetching";
import LoaderRef from "../../Components/LoaderRef/LoaderRef";
import loaderRef from "../../Components/LoaderRef/LoaderRef";

const BodyItems = () => {
    const [sort, setSort] = useState('By name')
    const limit = 20;

    const loaderRef = useRef(null);

    const [isLoading, items, setItems, hasMore, error] = usePartialFetching(
            async (page, cursor) => await ItemService.getItems(cursor, page, limit), loaderRef
    );

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

    const cachedSort = useMemo(() => {return sortItems(sort, items);}, [sort, items])

    return (
        <div className={Class.bodyItems}>
            <Sortbar setSort={setSort} />
            {error && <h1 color='white'>{error.toString()}</h1>}
            {isLoading ?
                <Loader></Loader>
                :
                <div className={Class.itemsList}>
                    {cachedSort?.map((item) => <ListItem key={item.id} item={item}/>)}
                    {hasMore && <LoaderRef ref={loaderRef}/>}
                </div>
            }
        </div>
    );
};

export default BodyItems;