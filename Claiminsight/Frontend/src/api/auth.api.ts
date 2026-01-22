import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const signupUser = async (data: SignupPayload) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};
