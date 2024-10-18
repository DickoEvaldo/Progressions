import { create } from "zustand";

type Store = {
  name: string;
  email: string;
  password: string;
  program: string;
  interest: string;
  token: string;
  setRegister: (
    new_name: string,
    new_email: string,
    new_password: string
  ) => void;
};

export const userStore = create<Store>((set) => ({
  name: "",
  email: "",
  password: "",
  program: "compa1",
  interest: "compa1",
  token: "",
  setRegister: (new_name: string, new_email: string, new_password: string) => {
    set({
      name: new_name,
      email: new_email,
      password: new_password,
    });
  },
  setToken: (new_token: string) => {
    set({
      token: new_token,
    });
  },
}));
