import React from 'react';
import Class from './ContentAdmin.module.css'

const ContentAdmin = ({children}) => {
    return (
        <div className={Class.contentAdmin}>
            {children}
        </div>
    );
};

export default ContentAdmin;