import React from 'react';
import Class from './Loader.module.css'

const Loader = ({color}) => {

    const iconClass = [Class.LoaderIcon]
    switch(color) {
        case 'black':
            iconClass.push(Class.black)
            break;
        default:
            iconClass.push(Class.white)
    }

    return (
        <div className={Class.Loader}>
            <div className={iconClass.join(' ')}></div>
        </div>
    );
};

export default Loader;