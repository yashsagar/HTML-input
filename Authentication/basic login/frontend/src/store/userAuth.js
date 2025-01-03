import { create } from "zustand";
import toast from "react-hot-toast";
import { devtools } from "zustand/middleware";

export const useUserAuth = create(
  devtools((set) => ({
    user: null,
    islogin: false,
    islogout: false,
    isSigningUp: false,
    isCheckingAuth: false,
    login: async (credential) => {
      set({ islogin: true });
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        set({ islogin: false, user: data.data.email });
      } catch (error) {
        set({ islogin: false });
        toast.error(error.message);
      }
    },
    signup: async (credential) => {
      set({ isSigningUp: true });
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        set({ user: data.data.email, isSigningUp: false });
        toast.success(data.message);
        return data;
        // toast.success("Account created successflly");
      } catch (error) {
        set({ isSigningUp: false });
        toast.error(error.message);
        return null;
      }
    },
    logout: async () => {
      set({ isCheckingAuth: true });
      try {
        const response = await fetch("/api/auth/logout");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        set({ isCheckingAuth: false, user: null });
        toast.success(data.message);
        //   toast.success("logged out successfully");
      } catch (error) {
        set({ isCheckingAuth: false });
        toast.error(error.message);
      }
    },
    authCheck: async () => {
      set({ isCheckingAuth: true });
      try {
        const response = await fetch("/api/auth/authCheck");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        set({ user: data.data.email, isCheckingAuth: false });
      } catch (error) {
        set({ isCheckingAuth: false, user: null });
        console.log(`Error in auth check ${error.message}`);
      }
    },
  }))
);
