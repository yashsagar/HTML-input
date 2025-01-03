import { useState } from "react";
import { validate } from "../validation/validation";
import { Link } from "react-router-dom";
import { useUserAuth } from "../store/userAuth";
import { useShallow } from "zustand/react/shallow";

const Login = () => {
  const [inputData, setInputData] = useState(initialState);
  const { login, islogin, isCheckingAuth } = useUserAuth(
    useShallow((store) => ({
      login: store.login,
      islogin: store.islogin,
      isCheckingAuth: store.isCheckingAuth,
    }))
  );

  function initialState() {
    return {
      email: "",
      password: "",
    };
  }

  const handelInputData = (event) => {
    setInputData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validatedData = await validate({ schema: "login", data: inputData });
    if (validatedData.isValid) {
      delete validatedData.isValid;
      login(validatedData);
    } else {
      console.log("validation error", validatedData);
    }
  };

  if (islogin || isCheckingAuth) {
    return <div>Loading</div>;
  }

  return (
    <div className="bg-[linear-gradient(to_right,#ffecd2_0%,#fcb69f70_100%)] p-0.5 min-h-screen">
      <div className="bg-gray-300/80 w-fit mx-auto px-20 pt-10 pb-20 mt-40 rounded-md">
        <p> Login</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handelInputData}
              value={inputData.username}
              className="h-8 p-2 outline-none"
            />
          </div>
          <div className="mt-3 flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handelInputData}
              value={inputData.password}
              className="h-8 p-2 outline-none"
            />
          </div>
          <button className="mt-4 bg-red-400 w-full py-2 rounded-sm">
            Login
          </button>
        </form>
        <p className="pt-4">
          Not registerd?{" "}
          <Link to={"/signup"} className="text-blue-600 cursor-pointer">
            Sign In
          </Link>
        </p>
        <p className="mt-4 text-xs">
          testId : test@gmail.com <br /> testPassword : Test@123{" "}
        </p>
      </div>
    </div>
  );
};
export default Login;
