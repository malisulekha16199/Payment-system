import { Heading } from "../Components/Heading";
import { SubHeading } from "../Components/SubHeading";
import { Button } from "../Components/Button";
import { BottomWarn } from "../Components/BottomWarn";
import { InputBox } from "../Components/InputBox";
import { Email, Password } from "../Data/Data";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const SignIn = () => {
  const [email, setEmail] = useRecoilState(Email);
  const [pwd, setPwd] = useRecoilState(Password);
  const navigate = useNavigate();
  const [signInStatus, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (signInStatus) {
      const timer = setTimeout(() => {
        setStatus("");
        setErrorMsg(""); // Clear error message if you want
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [signInStatus]);

  async function onBtnClick() {
    try {
      if (!email || !pwd) {
        setErrorMsg("All fields are required.");
        setStatus("Error");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          email: email,
          password: pwd,
        }
      );

      localStorage.setItem("token", response.data.token);
      // Decoding the JWT token
      const decoded = jwtDecode(response.data.token);
      localStorage.setItem("fName", decoded.userfname);
      localStorage.setItem("userID", decoded.userID);
      navigate("/dashboard");
      if (response.status != 200) {
        setStatus("Error");
      }
    } catch (error) {
      if (error.response) {
        // Backend provided an error response, show the message
        setErrorMsg(
          error.response.data.message || "Signup failed. Please try again."
        );
      } else {
        // General error handling
        setErrorMsg(
          "An error occurred. Please check your inputs or try again later."
        );
      }
      setStatus("Error");
    } finally {
      setEmail(""), setPwd("");
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="sulekha@gmail.com"
            label={"Email"}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMsg("");
            }}
          />
          <div className="relative">
            <InputBox
              type={showPassword ? "text" : "password"}
              placeholder="123@Abc"
              label={"Password"}
              onChange={(e) => {
                setPwd(e.target.value);
                setErrorMsg("");
              }}
            />
            <span
              className="absolute right-3 top-11 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </span>
          </div>
          {/* Display error message */}
          {signInStatus === "Error" && (
            <p className="text-red-500 text-center mt-4">{errorMsg}</p>
          )}
          <div>
            <Button label={"Sign in"} onClick={onBtnClick} />
          </div>
          <BottomWarn
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/sign-up"}
          />
        </div>
      </div>
    </div>
  );
};
