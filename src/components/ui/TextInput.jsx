function TextInput({
  label,
  type = "text",
  placeholder = "",
  required = false,
  value,
  onChange,
  onBlur,
  name,
}) {
  return (
    <div>
      <label className="block mb-2 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="
    w-full
    px-4
    py-2
    border
    rounded-lg
    outline-none
    focus:ring-2
    focus:ring-blue-500
  "
      />
    </div>
  );
}

export default TextInput;
