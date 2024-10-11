import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <div className="flex flex-row items-center ">
      <button
        onClick={handleLogout}
        className="flex flex-row items-center text-lg"
      >
        <BiLogOut className="w-6 h-6 mr-2" /> {/* Logout icon */}
        Logout
      </button>
    </div>
  );
}
