import { useState, useEffect, useRef } from "react";

function SearchableSelect({
  label,
  options = [],
  required = false,
  name,
  value,
  onChange,
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.value === value
    );

    if (selectedOption) {
      setSearch(selectedOption.label);
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSelect = (option) => {
    setSearch(option.label);

    onChange({
      target: {
        name,
        value: option.value,
      },
    });

    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      ref={containerRef}
    >
      <label className="block mb-2 font-medium">
        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}
      </label>

      <input
        type="text"
        value={search}
        placeholder="Buscar..."
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        className="
          w-full
          px-4
          py-2
          border
          rounded-lg
          outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
      />

      {isOpen && (
        <div
          className="
            absolute
            z-50
            w-full
            mt-1
            bg-white
            border
            rounded-lg
            shadow-lg
            max-h-60
            overflow-y-auto
          "
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() =>
                  handleSelect(option)
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-2
                  hover:bg-slate-100
                "
              >
                {option.label}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-slate-500">
              Sin resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchableSelect;