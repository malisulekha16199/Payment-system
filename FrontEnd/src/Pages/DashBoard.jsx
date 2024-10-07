import { useRecoilState } from "recoil";
import { Appbar } from "../Components/Appbar";
import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";
import { balance } from "../Data/Data";
import { useEffect } from "react";
import axios from "axios";
export function DashBoard() {
  const [bal, setBalance] = useRecoilState(balance);
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
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // Set the fetched balance in Recoil state d
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
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
