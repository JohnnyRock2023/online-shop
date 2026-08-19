import React from 'react';
import Class from './LabelTextArea.module.css'

const LabelTextArea = ({label, value, onChange}) => {
    return (
        <div className={Class.labelTextArea}>
            <h2 className={Class.labelTextArea__title}>{label}</h2>
            <textarea className={Class.labelTextArea__content} value={value} onChange={onChange}/>
        </div>
    );
};

export default LabelTextArea;