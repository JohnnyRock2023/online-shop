import React, {useCallback, useEffect, useRef, useState} from 'react';
import Class from './Orders.module.css'
import usePartialFetching from "../../../../Hooks/usePartialFetching";
import LoaderRef from "../../../GeneralComponents/LoaderRef/LoaderRef";
import ProductService from "../../../../API/ProductService";
import OrderItem from "./OrderItem/OrderItem";
import Loader from "../../../GeneralComponents/Loader/Loader";
import OrderService from "../../../../API/OrderService";
import Filter from "./Filter/Filter";

const Orders = () => {
    const loaderRef = useRef(null);
    const filters = ["All", "Pending", "Paid", "Delivering", "Completed"]
    const limit = 10;
    const [selected, setSelected] = useState("All");
    const [isLoading, orders, setOrders, hasMore, error] = usePartialFetching(
        async (page, cursor) => await OrderService.getOrders(page, limit, cursor, selected.toLowerCase()), loaderRef, [selected], !selected
    );

    return (
        <div className={Class.orders}>
            <Filter selected={selected} setSelected={setSelected} filters={filters}></Filter>
            {!orders.length && <h2>You don't have any orders yet</h2>}
            {isLoading? <Loader color='white'/>: orders?.map((order, index) => <OrderItem key={index} order={order}/>)}
            {hasMore && <LoaderRef ref={loaderRef}></LoaderRef>}
        </div>
    );
};

export default Orders;