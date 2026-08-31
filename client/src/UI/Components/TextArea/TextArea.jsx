import React from 'react';
import Class from './TextArea.module.css'

const TextArea = ({placeholder, className, text, setText, maxSymbols}) => {
    let clsName = [Class.textArea__textarea]
    if (className) {
        clsName.push(className)
    }

    const onChange = (e) => {
        if (maxSymbols) {
            if (e.target.value.length <= maxSymbols) {
                setText(e.target.value)
            }
            return
        }
        setText(e.target.value)

    }

    return (
            <textarea className={clsName.join(" ")} placeholder={placeholder} value={text}
                      onChange={onChange}></textarea>
    );
};

export default TextArea;