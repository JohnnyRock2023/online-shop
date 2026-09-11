import {useMemo, useRef, useState} from 'react';
import Class from './Products.module.css'
import ListItem from "./ListItem/ListItem";
import Sortbar from "../../SortBar/Sortbar";
import ProductService from "../../../API/ProductService";
import Loader from "../../GeneralComponents/Loader/Loader";
import usePartialFetching from "../../../Hooks/usePartialFetching";
import LoaderRef from "../../GeneralComponents/LoaderRef/LoaderRef";

const Products = () => {
    const [sort, setSort] = useState('By name')
    const limit = 20;

    const loaderRef = useRef(null);

    const [isLoading, items, setItems, hasMore, error] = usePartialFetching(
            async (page, cursor) => await ProductService.getProducts(cursor, page, limit), loaderRef
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

export default Products;