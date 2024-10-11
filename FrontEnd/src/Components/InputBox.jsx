export function InputBox({
  value,
  type,
  placeholder,
  label,
  onChange,
  disabled,
}) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        disabled={disabled}
        value={value}
        type={type}
        required
        className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline 
        ${
          disabled
            ? "bg-gray-100 text-gray-700 cursor-not-allowed"
            : "bg-white text-gray-700"
        }`}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
