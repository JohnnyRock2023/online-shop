import React from 'react';
import Class from './CustomSelect.module.css'

const CustomSelect = ({children, className, onChange, value}) => {
    let clsName = [Class.select]

    if (className) {
        clsName.push(className)
    }

    return (
        <select className={clsName.join(" ")} onChange={onChange} value={value}>
            {children}
        </select>
    );
};

export default CustomSelect;