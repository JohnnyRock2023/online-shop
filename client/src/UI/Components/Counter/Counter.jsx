import React, {useState} from 'react';
import Class from './Counter.module.css'

const Counter = ({item, increase, decrease}) => {
    return (
        <div className={Class.Counter}>
            <button className={Class.ButtonMinus} onClick={()=> decrease(item.id)}></button>
            <h2>{item.count}</h2>
            <button className={Class.ButtonPlus} onClick={()=> increase(item.id)}></button>
        </div>
    );
};

export default Counter;