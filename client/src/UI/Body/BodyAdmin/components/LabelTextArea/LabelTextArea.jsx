import React from 'react';
import Class from './LabelTextArea.module.css'
import TextArea from "../../../../Components/TextArea/TextArea";

const LabelTextArea = ({label, value, setValue}) => {
    return (
        <div className={Class.labelTextArea}>
            <label className={Class.labelTextArea__title}>{label}
                <TextArea className={Class.labelTextArea__content} text={value} setText={setValue}/>
            </label>
        </div>
    );
};

export default LabelTextArea;