import React from 'react';
import Class from './Filter.module.css'

const Filter = ({selected, setSelected, filters}) => {
    return (
        <ul className={Class.filter}>
            {filters?.map((filter, index) => <li onClick={() => setSelected(filter)}
                                                 className={selected === filter ? [Class.filter__item, Class.active].join(" "): Class.filter__item}
                                                 key={index}>{filter}</li>)}
        </ul>
    );
};

export default Filter;