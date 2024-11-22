import { useRef } from "react";
import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const handelSubmit = (event) => {
    event.preventDefault();
    const formData = {};
    const data = Array.from(event.target);
    data.forEach((item) => {
      if (item.type === "submit") return;
      if (item.name === "avatar") {
        formData[item.name] = item.files[0];
        return;
      }
      if (!Reflect.has(formData, item.name)) {
        formData[item.name] = item.value;
      } else {
        if (!Array.isArray(formData[item.name]) && item.name === "course") {
          formData[item.name] = [formData[item.name]];
        }
        item.checked && formData[item.name].push(item.value);
      }
    });

    console.log(formData);

    fetch("http://localhost:3000/form", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
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
            console.log(image);
          }}
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
                console.log(fileInputRef.current.value);
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
            />
            <label htmlFor="bcom" className="cursor-pointer">
              B.COM
            </label>
          </div>
        </div>
      </div>

      <div className="space-x-4 contents">
        <label className="text-right"> Designation </label>
        <select className="border px-4 py-1" name="designation">
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
