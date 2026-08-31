import React from 'react';
import Class from './LabelInput.module.css'

const LabelInput = ({label, type, value, onChange}) => {
    return (
        <div className={Class.labelInput}>
            <label className={Class.labelInput__label}>{label}
                <input id="labelInput" className={Class.labelInput__input} value={value} type={type} onChange={onChange}/>
            </label>
        </div>
    );
};

export default LabelInput;