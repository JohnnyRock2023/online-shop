import React from 'react';
import Class from './OrderItem.module.css'
import Uploads from "../../../../../API/Uploads";
import StringUtils from "../../../../../utils/StringUtils";

const OrderItem = ({order}) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(order?.date));

    return (
        <div className={Class.orderItem}>
            <div className={Class.orderInfo}>
                <h3 className={Class.orderId}>Order № {order?.orderId}</h3>
                <div style={{display: 'flex', flex: 1}}></div>
                <time className={Class.orderDate}>{formattedDate}</time>
            </div>
            <h3 className={Class.orderStatus}>Status: {StringUtils.capitalize(order?.status)}</h3>
            <div className={Class.orderImages}>
                {order?.items.map((item, index) => <img key={index} className={Class.productImage} src={Uploads.getImageLink(item?.image)}/>)}
            </div>
        </div>
    );
};

export default OrderItem;