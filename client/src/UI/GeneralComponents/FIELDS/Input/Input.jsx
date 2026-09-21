import React, {useEffect, useState} from 'react';
import InputHint from "../InputHint/InputHint";
import Class from './Input.module.css'

const Input = ({id, className, type, placeholder, onChange, value, hint}) => {

    let clsName = [Class.input]
    if (className) {
        clsName.push(className)
    }

    const [iType, setIType] = useState(type?.toLowerCase())
    let prevState = null;

    let input_input_cls_name = [Class.input__input]
    let input_button_cls_name = [Class.input__button]

    if (type === "password") {
        input_input_cls_name.push(Class.password)
        input_button_cls_name.push(Class.visible)

        if (iType === 'password') {
            input_button_cls_name.push(Class.close)
        }
        else {
            input_button_cls_name.push(Class.open)
        }
    }

    const buttonClick = () => {
        switch (iType) {
            case "password":
                prevState = "password"
                setIType("text");
                break;
            case "text":
                prevState = "text"
                setIType("password");
                break;
        }
    }

    return (
        <div className={clsName.join(' ')}>
            <div className={Class.input_row}>
                <input id={id} className={input_input_cls_name.join(' ')} type={iType} placeholder={placeholder} value={value} onChange={onChange}/>
                <button className={input_button_cls_name.join(' ')} onClick={buttonClick}></button>
            </div>

            {hint && <InputHint message={hint}/>}
        </div>
    );
};

export default Input;