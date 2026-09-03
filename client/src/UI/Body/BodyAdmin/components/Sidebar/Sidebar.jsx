import React from 'react';
import Class from './Sidebar.module.css'

const Sidebar = ({children, options, option, setOption}) => {

    const regular = [Class.option]
    const selected = [Class.option, Class.active]

    return (
        <div className={Class.Sidebar}>
            <ul className={Class.Bar}>
                {options.map((item, index) =>
                    <li key={index} className={item === option ? selected.join(' '): regular.join(' ')} onClick={()=> {setOption(item)}}>
                        <h2 className={Class.option__title}>{item}</h2>
                    </li>)
                }
            </ul>
            {children}
        </div>
    );
};

export default Sidebar;