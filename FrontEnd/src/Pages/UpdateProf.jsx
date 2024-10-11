import { InputBox } from "../Components/InputBox";
import { Appbar } from "../Components/AppBar";
import { useEffect, useState } from "react";
import { Button } from "../Components/Button";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fName } from "../Data/Data";

export function UpdateProf() {
  const [frstName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [signInStatus, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [FName, setFName] = useRecoilState(fName);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/Profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFname(res.data.firstname); // Setting the first name correctly
        setLname(res.data.lastname); // Setting the last name correctly
        setEmail(res.data.email); // Setting the email correctly
        setPwd(res.data.password); // Setting the password correctly (though this is typically not returned for security reasons)
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  }, []);

  useEffect(() => {
    if (signInStatus) {
      const timer = setTimeout(() => {
        setStatus("");
        setErrorMsg(""); // Clear error message if you want
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [signInStatus]);

  async function handleClick() {
    try {
      if (!frstName || !lName || !pwd) {
        setErrorMsg("All fields are required.");
        setStatus("Error");
        return;
      }

      const response = await axios.put(
        "http://localhost:3000/api/v1/user/updateProfile",
        { firstname: frstName, lastname: lName, password: pwd },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        setErrorMsg(response.data.message);
        setStatus("Success");
        localStorage.setItem("fName", frstName);
        setFName(frstName);
      }
    } catch (error) {
      if (error.response) {
        // Backend provided an error response, show the message
        setErrorMsg(error.response.data.message || "Profile update failed.");
      } else {
        // General error handling
        setErrorMsg(
          "An error occurred. Please check your inputs or try again later."
        );
      }
      setStatus("Error");
    }
  }

  return (
    <>
      <Appbar />
      {/* Back Button with React Icon */}
      <button
        className=" top-15 left-4 flex items-center text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
        onClick={() => navigate(-1)} // Go to previous page
      >
        <BiArrowBack className="w-6 h-8 mr-0" /> {/* Back icon */}
        Back
      </button>
      <div className="font-width-100 text-xl px-4 py-2">Update Profile</div>
      <div className="px-20 mx-20">
        <div>
          {/* First Name */}
          <InputBox
            value={frstName} // Showing the first name
            type="text"
            placeholder="First name"
            label="First Name"
            onChange={(e) => {
              var str = e.target.value;
              str = str.charAt(0).toUpperCase() + str.slice(1);
              setFname(str);
              setErrorMsg("");
            }}
          />
          {/* Last Name */}
          <InputBox
            value={lName} // Showing the last name
            type="text"
            placeholder="Last name"
            label="Last Name"
            onChange={(e) => {
              var str = e.target.value;
              str = str.charAt(0).toUpperCase() + str.slice(1);
              setLname(str);
              setErrorMsg("");
            }}
          />
          {/* Email */}
          <InputBox
            value={email} // Showing the email
            type="text"
            placeholder="Email"
            label="Email"
            disabled={true}
          />
          {/* Password */}
          <div className="relative w-50">
            <InputBox
              value={pwd} // Showing the password (secured)
              type={showPassword ? "text" : "password"} // Securing the password field
              placeholder="Password"
              label="Password"
              onChange={(e) => {
                setPwd(e.target.value);
                setErrorMsg("");
              }}
            />
            <span
              className="absolute right-3 top-12 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </span>
          </div>
          {/* Button to Save */}
          <Button onClick={handleClick} label="Save" />
          {signInStatus === "Success" && (
            <p className="text-green-500 mt-4">{errorMsg}</p>
          )}
          {signInStatus === "Error" && (
            <p className="text-red-500 mt-4">{errorMsg} Update Failed! </p>
          )}
        </div>
      </div>
    </>
  );
}
