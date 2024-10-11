import { DashBoard } from "../Pages/DashBoard";
import { Logout } from "./Logout";
import { useNavigate } from "react-router-dom";
export function Profile() {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute right-0 mt-12 w-40 bg-white-400 border rounded-lg shadow-lg">
        <ul>
          <li
            className="p-2 hover:bg-slate-200 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </li>
          <li
            className="p-2 hover:bg-slate-200 cursor-pointer"
            onClick={() => {
              navigate("/update-prof");
            }}
          >
            Update Profile
          </li>
          <li className=" p-2 bg-blue-300 hover:bg-blue-200 cursor-pointer">
            <Logout></Logout>
          </li>
        </ul>
      </div>
    </>
  );
}
