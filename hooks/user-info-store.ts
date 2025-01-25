import { create } from "zustand";
import { getCookie } from "cookies-next";

interface Login {
  loginStatus: boolean;
  username: string;
  DOB: string;
  phoneNumber: string;
  email: string;
  cookies: string;
  setLogin: (status: boolean) => void;
  setUsername: (username: string) => void;
  setDOB: (dob: string) => void;
  setPhoneNumber: (phoneNum: string) => void;
  setEmail: (email: string) => void;
  setCookiesStore: (status: boolean) => void;
}

export const useLogin = create<Login>((set) => ({
  loginStatus: false,
  username: "",
  DOB: "",
  phoneNumber: "",
  email: "",
  cookies: "",
  setLogin: (status) => set(() => ({ loginStatus: status })),
  setUsername: (username) => set(() => ({ username: username })),
  setDOB: (dob) => set(() => ({ DOB: dob })),
  setPhoneNumber: (phoneNum) => set(() => ({ phoneNumber: phoneNum })),
  setEmail: (email) => set(() => ({ email: email })),
  setCookiesStore: async (status) => {
    const cookies = getCookie("_token") as string | undefined;
    if (cookies) {
      set(() => ({ cookies: cookies, loginStatus: true }));
    } else {
      set(() => ({ loginStatus: false }));
    }
  },
}));
