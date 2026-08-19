import React from 'react';
import Class from './LabelInput.module.css'

const LabelInput = ({label, type, value, onChange}) => {
    return (
        <div className={Class.labelInput}>
            <h2 className={Class.labelInput__label}>{label}</h2>
            <input className={Class.labelInput__input} value={value} type={type} onChange={onChange}/>
        </div>
    );
};

export default LabelInput;