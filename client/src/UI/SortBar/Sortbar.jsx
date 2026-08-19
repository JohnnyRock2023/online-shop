import Class from './Sortbar.module.css'

const options = ['By name', 'From cheap to expensive', 'From expensive to cheap']

const Sortbar = ({setSort}) => {
    return (
        <div className={Class.sortbar}>
            <select className={Class.sortbar__select} onChange={(event) => setSort(event.target.value)}>
                {options.map(option => <option key={option} className={Class.sortbar__option}>{option}</option>)}
            </select>
        </div>
    );
};

export default Sortbar;