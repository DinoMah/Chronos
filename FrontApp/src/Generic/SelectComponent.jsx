const Select = ({ id, defaultValue, options, onChange }) => {
    return (
        <select id={id} onChange={onChange} className="select w-50">
            <option key="0" value="0">{defaultValue}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default Select;