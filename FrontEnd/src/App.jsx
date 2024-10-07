import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { RecoilRoot } from "recoil";
import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/SignIn";
import { DashBoard } from "./Pages/DashBoard";
import { SendMoney } from "./Pages/SendMoney";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/send-money" element={<SendMoney />} />
            <Route path="/*" element={<h1>Not Found Component</h1>} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
