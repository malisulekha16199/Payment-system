import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { Amount } from "../Data/Data";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useRecoilState(Amount);
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus("");
        setErrorMsg(""); // Clear error message if you want
      }, 4000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [status]);

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        {/* Back Button with React Icon */}
        <button
          className="absolute top-4 left-4 flex items-center text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => navigate(-1)} // Go to previous page
        >
          <BiArrowBack className="w-6 h-8 mr-2" /> {/* Back icon */}
          Back
        </button>
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setErrorMsg("");
                    setStatus("");
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      "http://localhost:3000/api/v1/account/transfer",
                      {
                        to: id,
                        amount,
                      },
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );

                    if (response.status === 200) {
                      setStatus("Success"); // Update status to success if transfer was successful
                      setAmount("");
                    }
                  } catch (error) {
                    if (error.response) {
                      if (
                        error.response.status === 401 ||
                        error.response.status === 403
                      ) {
                        localStorage.removeItem("token"); // Clear the token from local storage
                        navigate("/sign-in"); // Redirect to sign-in page
                      } else {
                        setStatus("Error");
                        setErrorMsg(
                          error.response.data.message || "Transfer Failed!"
                        );
                      }
                    } else {
                      // Handle any other errors (network issues, etc.)
                      setStatus("Error");
                      setErrorMsg("Network error. Please try again.");
                    }
                  }
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
              {/* Display success or error message */}
              {status === "Success" && (
                <p className="text-green-500 text-center mt-4">
                  Transfer Successful.
                </p>
              )}
              {status === "Error" && (
                <p className="text-red-500 text-center mt-4">
                  {errorMsg} Transfer Failed!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
