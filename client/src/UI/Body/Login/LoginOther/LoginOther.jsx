import React from 'react';
import Class from "./LoginOther.module.css";

const LoginOther = () => {
    return (
        <div className={Class.LoginOther}>
            <button className={Class.googleBtn}></button>
            <button className={Class.facebookBtn}></button>
        </div>
    );
};

export default LoginOther;