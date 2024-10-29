import store from "@/redux/store/store";
import axios from "axios";
// Create an instance of Axios with base URL
const api = axios.create({
  baseURL: "http://localhost:8001/v1/",
});

// const getTokens = () => {
//   const state = store.getState();
//   console.log("🚀 ~ getTokens ~ state:", state);
//   return {
//     token: state.auth?.authData.token,
//     accessToken: state.auth?.authData.accessToken,
//   };
// };

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
      // console.log(store.getState());

      // const { token, accessToken } = getTokens();
      // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // api.defaults.headers.common["x-custom-access-id"] = `${accessToken}`;
      const response = await api({ url, method, data });
      return { data: response.data };
    } catch (error: any) {
      return {
        error: { message: error.response?.data?.message || error.message },
      };
    }
  };
