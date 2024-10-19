import { useRecoilState } from "recoil";
import { Appbar } from "../Components/AppBar";
import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";
import { balance } from "../Data/Data";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../config";

export function DashBoard() {
  const [bal, setBalance] = useRecoilState(balance);
  const navigate = useNavigate();

  async function getVal() {
    try {
      // Get token from localStorage (or sessionStorage)
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Make the API request to get the balance
      const response = await axios.get(
        `${backendUrl}/api/v1/account/balance`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // Set the fetched balance in Recoil state d
      if (response.status === 200) {
        setBalance(response.data.balance);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem("token"); // Clear the token from local storage
          navigate("/sign-in"); // Redirect to sign-in page
        }
      }
    }
  }

  // Fetch balance when the component mounts
  useEffect(() => {
    getVal(); // Fetch balance on component mount
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={bal} />
        <Users />
      </div>
    </div>
  );
}
