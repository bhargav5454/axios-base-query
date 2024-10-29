import { axiosBaseQuery } from "@/lib/axios";
import { TaddProductResponse, TproductFormValue, TproductListData } from "@/types/ProductType";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query<TproductListData, void>({
      query: () => ({
        url: "product/getall",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    addProducts: builder.mutation<TaddProductResponse, TproductFormValue>({
      query: (data) => ({
        url: "product/create",
        method: "POST",
        data,
      }),
    }),
  }),
});

// Export hooks with the correct names
export const { useGetProductsQuery, useAddProductsMutation } = productApi;
