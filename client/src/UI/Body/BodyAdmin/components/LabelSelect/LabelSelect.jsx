import React from 'react';
import Class from "./LabelSelect.module.css";
import CustomSelect from "../../../../Components/CustomSelect/CustomSelect";


const LabelSelect = ({label, value, onChange, children}) => {
    return (
        <div className={Class.labelSelect}>
            <label className={Class.labelSelect__label}>{label}
                <CustomSelect className={Class.labelSelect__select} value={value} onChange={onChange}>{children}</CustomSelect>
            </label>
        </div>
    );
};

export default LabelSelect;