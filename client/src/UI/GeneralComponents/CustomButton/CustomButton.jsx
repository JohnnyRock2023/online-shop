import React from 'react';
import Class from './CustomButton.module.css'

const CustomButton = ({onClick, children, className}) => {
    const clsName = [Class.customButton]
    if (className) {
        clsName.push(className)
    }
    return (
        <button onClick={onClick} className={clsName.join(' ')}>{children}</button>
    );
};

export default CustomButton;