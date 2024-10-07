import { Link } from "react-router-dom";

export function BottomWarn({ label, buttonText, to }) {
  return (
    <div>
      <div className="py-2 text-sm flex justify-center">{label}</div>
      <Link
        className="pointer underline pl-1 cursor-pointer flex justify-center"
        to={to}
      >
        {" "}
        {buttonText}
      </Link>
    </div>
  );
}
