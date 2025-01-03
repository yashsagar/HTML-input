import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useUserAuth } from "./store/userAuth";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

//page import
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";

function App() {
  const { user, authCheck } = useUserAuth(
    useShallow((store) => ({ user: store.user, authCheck: store.authCheck }))
  );

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  const routes = createRoutesFromElements(
    <Route>
      <Route path="/" element={!user ? <Login /> : <MainPage />} />
      <Route path="/signup" element={!user ? <Signup /> : <MainPage />} />
    </Route>
  );
  const Router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={Router}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
