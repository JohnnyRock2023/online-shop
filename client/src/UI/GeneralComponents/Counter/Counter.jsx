import React, {useState} from 'react';
import Class from './Counter.module.css'

const Counter = ({item, increase, decrease}) => {
    return (
        <div className={Class.counter}>
            <button className={Class.buttonMinus} onClick={()=> decrease(item.id)}></button>
            <h2 className={Class.counter__value}>{item.count}</h2>
            <button className={Class.buttonPlus} onClick={()=> increase(item.id)}></button>
        </div>
    );
};

export default Counter;