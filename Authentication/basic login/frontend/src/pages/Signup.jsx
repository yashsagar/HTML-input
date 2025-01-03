import { useState } from "react";
import { Link } from "react-router-dom";
import { validate } from "../validation/validation";
import { useUserAuth } from "../store/userAuth";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [inputdata, setInputData] = useState(initialState);
  const { signup, isSigningUp } = useUserAuth(
    useShallow((store) => ({
      signup: store.signup,
      isSigningUp: store.isSigningUp,
    }))
  );
  const navigate = useNavigate();
  function initialState() {
    return {
      name: "",
      email: "",
      password: "",
    };
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { isValid, ...validatedData } = await validate({
      schema: "signup",
      data: inputdata,
    });
    if (isValid) {
      const data = await signup(validatedData);
      if (data.success) {
        navigate("/");
      }
    } else {
      console.log(validatedData);
    }
  };
  const handelInputData = (event) => {
    setInputData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  if (isSigningUp) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[linear-gradient(to_right,#ffecd2_0%,#fcb69f70_100%)] p-0.5 min-h-screen">
      <div className="bg-gray-300/80 w-fit mx-auto px-20 pt-10 pb-20 mt-40 rounded-md">
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="h-8 p-2 outline-none"
              onChange={handelInputData}
            />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="h-8 p-2 outline-none"
              onChange={handelInputData}
            />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="h-8 p-2 outline-none"
              onChange={handelInputData}
            />
          </div>
          <button className=" bg-red-400 w-full py-2 rounded-sm mt-6 cursor-pointer">
            Sign up
          </button>
        </form>
        <p className="mt-4">
          Already member
          <Link to={"/"} className="text-blue-600 cursor-pointer pl-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;
