import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { users, filter } from "../Data/Data";
export function Users() {
  const [usersList, setUsersList] = useRecoilState(users);
  const [filterTxt, setFilter] = useRecoilState(filter);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filterTxt, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsersList(response.data.users);
      })
      .catch(() => {
        navigate("/sign-in");
      });
  }, [filterTxt]);

  return (
    <>
      {" "}
      <div className="font-bold mt-6 text-lg"></div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {" "}
        {usersList.map((user) => {
          return <User key={user._id} user={user}></User>;
        })}
      </div>
    </>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {user.firstname[0].toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col justify-center h-ful">
            <div>
              {user.firstname} {user.lastname}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
          <Button
            onClick={(e) => {
              navigate(
                "/send-money?id=" + user._id + "&name=" + user.firstname
              );
            }}
            label={"Send Money"}
          />
        </div>
      </div>
    </>
  );
}
