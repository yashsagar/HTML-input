import { useRef, useState } from "react";
import * as Yup from "yup";

function App() {
  const [isVisited, setIsVisited] = useState(createInitialObject);
  const [inputField, setInputField] = useState(createInitialObject);
  const [errorState, setErrorState] = useState(createInitialObject);
  const [selectedImage, setSelectImage] = useState(null);
  const fileElement = useRef(null);

  const timeout = useRef(null);

  function createInitialObject() {
    return {
      username: "",
      password: "",
      avatar: "",
      gender: "",
      course: "",
      designation: "",
    };
  }

  // console.log(inputField, errorState);

  const schema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .matches(/^[A-Za-z]*$/, "Name must in charecter")
      .min(3, "Username must be atlist 3 character"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "password must be complex"
      ),
    avatar: Yup.mixed()
      .required("user photo is required")
      .test(
        "JPG-or-PNG",
        "Only JPG and PNG photo allowed",
        (value) =>
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      ),
    gender: Yup.string().required("gender is required"),
    course: Yup.array().of(Yup.string()).min(1, "course is required"),
    designation: Yup.string().required("designation is required"),
  });

  function debounce(func, delay = 300) {
    return (...args) => {
      console.log("test", timeout, delay);
      const context = this;

      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  const debounceVariant = debounce(validateData);

  function validateData(data) {
    console.log("validation triggered");
    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        setErrorState(null);
      })
      .catch((err) => {
        const errorObject = err.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrorState(errorObject);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit triggered");
    validateData(inputField);
    if (!errorState) {
      const formData = new FormData();
      Object.keys(inputField).forEach((value) => {
        formData.set(value, inputField[value]);
      });
      console.log("fetch data");
    }
  };

  const handleSelectedImage = (event) => {
    setInputField((prevState) => ({
      ...prevState,
      avatar: event.target.files[0],
    }));
    validateData(inputField);
    setSelectImage(URL.createObjectURL(event.target.files[0]));
  };

  const clearSelectedImage = () => {
    setSelectImage(null);
    fileElement.current.value = null;
  };

  const handleBlur = (event) => {
    setIsVisited((prevState) => ({
      ...prevState,
      [event.target.name]: true,
    }));
  };

  const handleInput = (event) => {
    setInputField((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    validateData(inputField);
  };

  const handleCheckbox = (event) => {
    let currentState = inputField[event.target.name];

    const isArray = Array.isArray(currentState);

    if (!isArray) {
      currentState = currentState ? [currentState] : [];
    }

    if (event.target.checked) {
      currentState.push(event.target.value);
    } else {
      currentState.forEach((item, index) => {
        if (item === event.target.value) {
          currentState.splice(index, 1);
        }
      });
    }

    setInputField((prveState) => ({
      ...prveState,
      [event.target.name]: currentState,
    }));
  };

  return (
    <form className="grid grid-cols-[1fr_3fr] max-w-[500px] mx-auto mt-20 gap-y-8 gap-x-2">
      <div className="contents ">
        <label htmlFor="username" className="self-center">
          User Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="username"
            name="username"
            className="border px-2 py-1 w-full"
            onBlur={handleBlur}
            onChange={handleInput}
            value={inputField.username}
          />
          {isVisited.username && errorState.username && (
            <div className="absolute -bottom-6 text-red-300">
              {errorState.username}
            </div>
          )}
        </div>
      </div>
      <div className="contents">
        <label htmlFor="password" className="self-center">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            autoComplete="false"
            id="password"
            name="password"
            className="border px-2 py-1 w-full"
            onBlur={handleBlur}
            onChange={handleInput}
            value={inputField.password}
          />
          {isVisited.password && errorState.password && (
            <div className="absolute -bottom-6 text-red-300">
              {errorState.password}
            </div>
          )}
        </div>
      </div>
      <div className="contents">
        <label htmlFor="avatar">Upload the Photo</label>
        <div className="relative">
          <input
            type="file"
            ref={fileElement}
            id="avatar"
            name="avatar"
            className=" self-center"
            onChange={handleSelectedImage}
            onBlur={handleBlur}
          />
          {isVisited.avatar && errorState.avatar && (
            <div className="absolute -bottom-2 text-red-300">
              {errorState.avatar}
            </div>
          )}
        </div>
      </div>

      {selectedImage && !errorState.avatar && (
        <div className="col-span-2 w-fit relative">
          <img
            src={selectedImage}
            alt="uploaded image"
            className="size-28 bg-cover"
          />
          <div
            className="absolute size-5 flex justify-center items-center bg-slate-300 rounded-full right-0 top-0 pb-1 cursor-pointer"
            onClick={clearSelectedImage}
          >
            x
          </div>
        </div>
      )}

      <div className="contents">
        <label>Gender</label>
        <div className="flex gap-4 items-center">
          <div className="relative w-full flex gap-4">
            <div className=" space-x-1">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onBlur={handleBlur}
                onChange={handleInput}
                {...(inputField.gender === "male" && { checked: true })}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className=" space-x-1">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onBlur={handleBlur}
                onChange={handleInput}
                {...(inputField.gender === "female" && { checked: true })}
              />
              <label htmlFor="female">Female</label>
            </div>
            {isVisited.gender && errorState.gender && (
              <div className="absolute -bottom-6 text-red-300 ">
                {errorState.gender}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="contents">
        <label>Course </label>
        <div className="flex gap-4 items-center select-none py-1">
          <div>
            <input
              type="checkbox"
              name="course"
              value="bbm"
              id="bbm"
              className="appearance-none peer"
              onBlur={handleBlur}
              onChange={handleCheckbox}
              {...(inputField.gender === "bbm" && { checked: true })}
            />
            <label
              htmlFor="bbm"
              className="peer-checked:bg-green-300 px-3 py-1 rounded-full border cursor-pointer"
            >
              BBM
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="course"
              value="bcom"
              id="bcom"
              className="appearance-none peer"
              onBlur={handleBlur}
              onChange={handleCheckbox}
              {...(inputField.gender === "bcom" && { checked: true })}
            />
            <label
              htmlFor="bcom"
              className="peer-checked:bg-green-300 px-3 py-1 rounded-full border cursor-pointer"
            >
              B.COM
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="course"
              value="mcom"
              id="mcom"
              className="appearance-none peer"
              onBlur={handleBlur}
              onChange={handleCheckbox}
              {...(inputField.gender === "mcom" && { checked: true })}
            />
            <label
              htmlFor="mcom"
              className="peer-checked:bg-green-300 px-3 py-1 rounded-full border cursor-pointer"
            >
              M.COM
            </label>
          </div>
        </div>
      </div>
      <div className="contents">
        <label className="self-center">Designation</label>
        <select
          name="designation"
          className="border px-2 py-1"
          onBlur={handleBlur}
          onChange={handleInput}
          value={inputField.designation}
        >
          <option value="">Select Designation</option>
          <option value="hr"> HR</option>
          <option value="admin"> Admin</option>
          <option value="user"> User</option>
        </select>
      </div>

      <button
        type="submit"
        className="col-span-2 bg-slate-400 w-fit mx-auto px-8 py-1 rounded-md cursor-pointer"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}

export default App;
