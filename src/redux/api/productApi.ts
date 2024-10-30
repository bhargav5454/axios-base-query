import { axiosBaseQuery } from "@/lib/axios";
import {
  TAddProductResponse,
  TdeleteProductFormValue,
  TdeleteProductResponse,
  TGetProductsResponse,
  TProduct,
  TProductFormValue,
  TupdateProductResponse,
} from "@/types/ProductType";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<TGetProductsResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
          url: `product/getall?page=${page}&limit=${limit}`,
          method: "GET",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      }),
      providesTags: ["Product"],
  }),
  
    addProducts: builder.mutation<TAddProductResponse, TProductFormValue>({
      query: (data) => ({
        url: "product/creates",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<
      TdeleteProductResponse,
      TdeleteProductFormValue
    >({
      query: (data) => ({
        url: `product/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation<TupdateProductResponse, TProduct>({
      query: (data) => ({
        url: `product/update/${data.id}`,
        method: "PUT",
        data,
      }),
    }),
  }),
});

// Export hooks with the correct names
export const {
  useGetProductsQuery,
  useAddProductsMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
