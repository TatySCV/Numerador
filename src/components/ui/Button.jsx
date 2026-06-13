function Button({
  children,
  type = "button",
}) {
  return (
    <button
      type={type}
      className="
        w-full
        bg-[#1e3a8a]
        text-white
        py-3
        rounded-lg
        font-medium
        hover:bg-blue-700
        transition
      "
    >
      {children}
    </button>
  );
}

export default Button;