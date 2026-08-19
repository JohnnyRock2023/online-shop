import React from 'react';
import Class from './InputHint.module.css'

const InputHint = ({message}) => {
    let clsName = [Class.InputHint]
    if (message) {
        clsName.push(Class.active)
    }
    return (
        <p className={clsName.join(' ')}>
            {message}
        </p>
    );
};

export default InputHint;