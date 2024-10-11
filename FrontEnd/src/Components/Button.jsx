export function Button({ label, onClick }) {
  return (
    <button
      className="border rounded-md px-3 py-1 mt-4 text-white bg-blue-500"
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
