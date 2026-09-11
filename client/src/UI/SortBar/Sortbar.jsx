import Class from './Sortbar.module.css'
import CustomSelect from "../GeneralComponents/FIELDS/CustomSelect/CustomSelect";

const options = ['By name', 'From cheap to expensive', 'From expensive to cheap']

const Sortbar = ({setSort}) => {
    return (
        <div className={Class.sortbar}>
            <CustomSelect onChange={(event) => setSort(event.target.value)}>
                {options.map(option => <option key={option}>{option}</option>)}
            </CustomSelect>
        </div>
    );
};

export default Sortbar;