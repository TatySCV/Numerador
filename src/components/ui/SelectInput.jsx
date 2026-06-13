function SelectInput({
  label,
  required = false,
  options = [],
  value,
  onChange,
  name,
}) {
  return (
    <div>
      <label className="block mb-2 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
    w-full
    px-4
    py-2
    border
    rounded-lg
  "
      >
        <option value="">Seleccione una opción</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
