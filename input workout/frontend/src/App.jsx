import { useRef } from "react";
import { useState } from "react";
import * as Yup from "yup";

function App() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isVisited, setIsVisited] = useState(
    generateInitialStateForInputFields
  );
  const [errorMessage, setErrorMessage] = useState(null);

  function generateInitialStateForInputFields() {
    return {
      avatar: false,
      course: false,
      designation: false,
      gender: false,
      password: false,
      username: false,
    };
  }

  const handleVisitedField = (event) => {
    const { name } = event.target;
    setIsVisited((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const formSchem = Yup.object({
    username: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must be complex"
      ),
    avatar: Yup.mixed()
      .required("Image is required")
      .test(
        "file-format",
        "Only JPG and PNG photos allowed",
        (value) => value && ["image/jpg", "image/png"].includes(value.type)
      ),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["male", "female"], "Invalid gender data"),
    course: Yup.mixed().test(
      "is-array-or-string",
      "Course must be a string or an array of strings",
      (value) => {
        if (Array.isArray(value)) {
          return (
            value.length > 0 &&
            value.every(
              (item) => typeof item === "string" && item.trim() !== ""
            )
          );
        }
        return typeof value === "string" && value.trim() !== "";
      }
    ),
    designation: Yup.string().required("Select the course"),
  });

  const handelSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => {
      if (key === "course") {
        if (!Array.isArray(data[key])) {
          data[key] = [value];
        } else {
          data[key].push(value);
        }
        return;
      }

      data[key] = value;
    });
  };

  const handleError = (data) => {
    formSchem
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        console.log(validatedData);
        // fetch("http://localhost:3000/form", {
        //   method: "POST",
        //   body: formData,
        // });
      })
      .catch((err) => {
        const errorMessage = err.inner.reduce((acc, current) => {
          acc[current.path] = current.message;
          return acc;
        }, {});
        setErrorMessage(errorMessage);
        console.log(errorMessage);
      });
  };

  return (
    <form
      className="grid grid-cols-[1fr_1fr] gap-4 p-10 max-w-[600px]"
      onSubmit={handelSubmit}
    >
      <div className="space-x-4 contents">
        <label htmlFor="name" className="text-right">
          User Name
        </label>
        <input
          type="text"
          id="name"
          name="username"
          className="border px-4 py-1"
          onBlur={handleVisitedField}
        />
      </div>
      <div className="space-x-4 contents">
        <label htmlFor="password" className="text-right">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border px-4 py-1"
          onBlur={handleVisitedField}
        />
      </div>
      <div className="space-x-4 contents">
        <label htmlFor="avatar" className="text-right">
          Profile Photo
        </label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          ref={fileInputRef}
          onChange={(event) => {
            setImage(URL.createObjectURL(event.target.files[0]));
          }}
          onBlur={handleVisitedField}
        />
      </div>

      {image && (
        <div className="contents">
          <div className="relative flex justify-end">
            <img
              src={image}
              alt="uploaded image"
              className="size-[80px] object-cover "
            />
            <div
              className="absolute right-[1px] top-1 size-5 flex justify-center items-center pb-[5px] bg-slate-300 rounded-full cursor-pointer"
              onClick={() => {
                fileInputRef.current.value = "";
                setImage(null);
              }}
            >
              x
            </div>
          </div>
          <span></span>
        </div>
      )}

      <div className="space-x-4 contents">
        <label htmlFor="name" className="text-right">
          Gender
        </label>
        <div className="flex items-center gap-1">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            className="cursor-pointer"
            onBlur={handleVisitedField}
          />
          <label htmlFor="male" className="cursor-pointer">
            Male
          </label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            className="ml-3 cursor-pointer"
            onBlur={handleVisitedField}
          />
          <label htmlFor="female" className="cursor-pointer">
            Female
          </label>
        </div>
      </div>

      <div className="space-x-4 contents">
        <label className=" flex items-center justify-end"> Course </label>
        <div className="flex items-center gap-2 space-x-3">
          <div className="flex items-center inputchecked:bg-green-400 rounded-full select-none border">
            <input
              id="mba"
              type="checkbox"
              value="mba"
              name="course"
              className={`appearance-none `}
              onBlur={handleVisitedField}
            />
            <label
              htmlFor="mba"
              className="cursor-pointer px-3 py-1 w-full h-full"
            >
              MBA
            </label>
          </div>

          <div className="flex items-center gap-1 border rounded-full px-3 py-1 inputchecked:bg-green-400 cursor-pointer">
            <input
              id="bbm"
              type="checkbox"
              value="bbm"
              name="course"
              className=" appearance-none "
              onBlur={handleVisitedField}
            />
            <label htmlFor="bbm" className="cursor-pointer">
              BBM
            </label>
          </div>

          <div className="flex items-center gap-1 border rounded-full px-3 py-1 inputchecked:bg-green-400 cursor-pointer">
            <input
              id="bcom"
              type="checkbox"
              value="bcom"
              name="course"
              className="appearance-none"
              onBlur={handleVisitedField}
            />
            <label htmlFor="bcom" className="cursor-pointer">
              B.COM
            </label>
          </div>
        </div>
      </div>

      <div className="space-x-4 contents">
        <label className="text-right"> Designation </label>
        <select
          className="border px-4 py-1"
          name="designation"
          onBlur={handleVisitedField}
        >
          <option value="">Select One</option>
          <option value="hr">HR</option>
          <option value="manager">Manager</option>
          <option value="sales">Sales</option>
        </select>
      </div>

      <button
        type="submit"
        className="mx-auto col-span-2 w-fit px-4 py-1 rounded-md mt-4 bg-green-300 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}

export default App;
