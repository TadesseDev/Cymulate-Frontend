/** @format */

import axios from "axios";
import { UserDto } from "../redux/dto/user.dto";
import { AttemptDto } from "../redux/dto/stempt.dto";

const baseURL = import.meta.env.VITE_API_URL;
// Create an axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Timeout for requests
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
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

const createAttemptApi = async (uri: string, attempt: AttemptDto) => {
  const response = await axiosInstance.post(uri, attempt);
  return response.data;
};

const fetchAttemptsApi = async (uri: string) => {
  const response = await axiosInstance.get(uri);
  return response.data;
};

const loginUserApi = async (
  uri: string,
  { email, password }: { email: string; password: string }
) => {
  const response = await axiosInstance.post(uri, { email, password });
  return response.data;
};

export { fetchUsersApi, createUserApi, loginUserApi, createAttemptApi, fetchAttemptsApi };
