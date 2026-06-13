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
      <label className="block mb-2 font-bold text-[#1e3a8a]">
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
    border-2
    border-slate-300
    rounded-md
    focus:border-amber-500
    outline-none
    text-slate-800
  "
      />
    </div>
  );
}

export default TextInput;
