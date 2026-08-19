import React from 'react';
import Class from './Message.module.css'
import Loader from "../../Components/Loader/Loader";

const Message = ({visible, setVisible, message}) => {

    let clsName = [Class.message]

    if (visible) {
        clsName.push(Class.active)
    }

    return (
        <div className={clsName.join(' ')} onClick={() => setVisible(false)}>
            <div className={Class.messageContent} onClick={(e) => e.stopPropagation()}>
                {message ? message : <Loader color="black" />}
            </div>
        </div>
    );
};

export default Message;