const Select = ({ name, disabled, selected, defaultValue, options, onChange }) => {
    return (
        <select name={name} onChange={onChange} className="select w-50" disabled={disabled}>
            <option key="0" value="0">{defaultValue}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id} selected={option.id == selected}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default Select;