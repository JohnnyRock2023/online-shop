import React from 'react';
import Class from "./LabelSelect.module.css";


const LabelSelect = ({label, value, defaultValue, onChange, children}) => {
    return (
        <div className={Class.labelSelect}>
            <h2 className={Class.labelSelect__label}>{label}</h2>
            <select className={Class.labelSelect__select} value={value} defaultValue={defaultValue} onChange={onChange}>{children}</select>
        </div>
    );
};

export default LabelSelect;