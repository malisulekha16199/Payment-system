import { Heading } from "../Components/Heading";
import { SubHeading } from "../Components/subHeading";
import { Button } from "../Components/Button";
import { BottomWarn } from "../Components/BottomWarn";
import { InputBox } from "../Components/InputBox";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { FirstName, LastName, Email, Password } from "../Data/Data";
import { jwtDecode } from "jwt-decode";

export const SignUp = () => {
  const [fName, setfName] = useRecoilState(FirstName);
  const [lName, setlName] = useRecoilState(LastName);
  const [email, setEmail] = useRecoilState(Email);
  const [pwd, setPwd] = useRecoilState(Password);
  const navigate = useNavigate();

  async function onBtnClick() {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        email: email,
        firstname: fName,
        lastname: lName,
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
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your credentials to create your account"} />
          <InputBox
            type="text"
            placeholder="sulekha"
            label={"First name"}
            onChange={(e) => {
              var str = e.target.value;
              str = str.charAt(0).toUpperCase() + str.slice(1);
              setfName(str);
            }}
          />
          <InputBox
            type="text"
            placeholder="mali"
            label={"Last Name"}
            onChange={(e) => {
              var str = e.target.value;
              str = str.charAt(0).toUpperCase() + str.slice(1);
              setlName(str);
            }}
          />
          <InputBox
            type="email"
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
            <Button label={"Sign up"} onClick={onBtnClick} />
          </div>
          <BottomWarn
            label={"Already Have an account"}
            buttonText={"Sign in"}
            to={"/sign-in"}
          />
        </div>
      </div>
    </div>
  );
};
