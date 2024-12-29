/** @format */

import axios from "axios";
import { Cat } from "../redux/type/dataSlice";

const baseURL = import.meta.env.VITE_API_URL;
// Create an axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Timeout for requests
});

const fetchCats = async (uri: string) => {
  const response = await axiosInstance.get(uri);
  return response.data; // Return the response data
};

const createCatApi = async (uri: string, cat: Cat) => {
  const response = await axiosInstance.post(uri, cat);
  return response.data; // Return the response data
};

export { fetchCats, createCatApi };
