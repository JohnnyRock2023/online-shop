import React from 'react';
import Class from './Sidebar.module.css'

const Sidebar = ({option, setOption}) => {

    const options = ['Users', 'Items']
    const regular = [Class.option]
    const selected = [Class.option, Class.active]

    return (
        <ul className={Class.sidebar}>
            {options.map((item, index) =>
                <li key={index} className={item === option ? selected.join(' '): regular.join(' ')} onClick={()=> {setOption(item)}}>
                    <h2 className={Class.option__title}>{item}</h2>
                </li>)
            }
        </ul>
    );
};

export default Sidebar;