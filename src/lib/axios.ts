import store from "@/redux/store/store";
import axios from "axios";
// Create an instance of Axios with base URL
const api = axios.create({
  baseURL: "http://localhost:8001/v1/",
});

// Retrieve the token string from localStorage
let token: string | undefined;
let accessToken: string | undefined;
// Retrieve the token string from localStorage
const tokenString = localStorage.getItem("persist:auth");
if (tokenString) {
  const parsedToken = JSON.parse(tokenString);
  // Check if `authData` exists and parse it
  const authData = parsedToken.authData
    ? JSON.parse(parsedToken.authData)
    : null;
  if (authData) {
    token = authData.token;
    accessToken = authData.accessToken;
  }
}

api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
api.defaults.headers.common["x-custom-access-id"] = `${accessToken}`;

export const axiosBaseQuery =
  () =>
  async ({
    url,
    method,
    data,
  }: {
    url: string;
    method: string;
    data?: any;
  }) => {
    try {
      const response = await api({ url, method, data });
      return { data: response.data };
    } catch (error: any) {
      return {
        error: { message: error.response?.data?.message || error.message },
      };
    }
  };
