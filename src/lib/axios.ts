import axios from "axios";
// Create an instance of Axios with base URL
const api = axios.create({
  baseURL: "http://localhost:8001/v1/",
});

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
