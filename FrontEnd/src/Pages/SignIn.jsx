import { Heading } from "../Components/Heading";
import { SubHeading } from "../Components/subHeading";
import { Button } from "../Components/Button";
import { BottomWarn } from "../Components/BottomWarn";
import { InputBox } from "../Components/InputBox";
import { Email, Password } from "../Data/Data";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const SignIn = () => {
  const [email, setEmail] = useRecoilState(Email);
  const [pwd, setPwd] = useRecoilState(Password);
  const navigate = useNavigate();

  async function onBtnClick() {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      {
        email: email,
        password: pwd,
      }
    );
    localStorage.setItem("token", response.data.token);
    try {
      // Decoding the JWT token
      const decoded = jwtDecode(response.data.token);
      console.log(decoded); // Output the decoded token (payload)
      localStorage.setItem("fName", decoded.userfname);
      localStorage.setItem("userID", decoded.userID);
      navigate("/dashboard");
    } catch (error) {
      console.error("Invalid token", error);
      return null;
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
            }}
          />
          <InputBox
            type="password"
            placeholder="123@Abc"
            label={"Password"}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
          <div className="pt-4">
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
