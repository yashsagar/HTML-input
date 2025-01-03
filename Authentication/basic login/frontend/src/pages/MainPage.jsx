import { useState } from "react";
import { useUserAuth } from "../store/userAuth";

const MainPage = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const logout = useUserAuth((store) => store.logout);

  const handelDropDown = () => {
    setIsDropDown((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="absolute top-2 right-2">
        <div
          className=" size-8 bg-slate-300 rounded-full flex justify-center items-center cursor-pointer select-none active:bg-slate-400"
          onClick={handelDropDown}
        >
          Y
        </div>
        {isDropDown && (
          <div className="absolute right-2 top-9 bg-slate-400 px-3 py-2 space-y-2 rounded-sm select-none ">
            <div
              className="bg-slate-300 px-2 py-1 rounded-sm cursor-pointer active:bg-slate-300/80"
              onClick={handleLogout}
            >
              Logout
            </div>
            <div className="w-fit whitespace-nowrap bg-slate-300 px-2 py-1 rounded-sm cursor-pointer active:bg-slate-300/80">
              Delete User
            </div>
          </div>
        )}
      </div>
      main page
    </>
  );
};
export default MainPage;
