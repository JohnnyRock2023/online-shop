import React from 'react';
import InputHint from "../InputHint/InputHint";
import Class from './Input.module.css'

const Input = ({type, placeholder, onChange, value, hint}) => {
    return (
        <div className={Class.Input}>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange}/>
            {hint && <InputHint message={hint}/>}
        </div>
    );
};

export default Input;