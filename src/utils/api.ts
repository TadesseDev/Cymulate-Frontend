/** @format */

import axios from "axios";
import { UserDto } from "../redux/dto/user.dto";

const baseURL = import.meta.env.VITE_API_URL;
// Create an axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Timeout for requests
  headers: {
    Authorization: localStorage.getItem("access_token"),
  },
});

const fetchUsersApi = async (uri: string) => {
  const response = await axiosInstance.get(uri);
  return response.data;
};

const createUserApi = async (uri: string, user: UserDto) => {
  const response = await axiosInstance.post(uri, user);
  return response.data;
};

const loginUserApi = async (
  uri: string,
  { email, password }: { email: string; password: string }
) => {
  const response = await axiosInstance.post(uri, { email, password });
  return response.data;
};

export { fetchUsersApi, createUserApi, loginUserApi };
