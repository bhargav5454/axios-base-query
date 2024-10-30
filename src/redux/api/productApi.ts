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
    getProducts: builder.query<TGetProductsResponse, void>({
      query: () => ({
        url: "product/getall",
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
      invalidatesTags: ["Product"],
      onQueryStarted: async (data, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          productApi.util.updateQueryData("getProducts", undefined, (draft) => {
            console.log("🚀 ~ productApi.util.updateQueryData ~ draft:", draft);
            if (Array.isArray(draft)) {
              draft.splice(
                draft.findIndex((prod) => prod.id === data.id),
                1
              );
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    updateProduct: builder.mutation<TupdateProductResponse, TProduct>({
      query: (data) => ({
        url: `product/update/${data.id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
      onQueryStarted: async (data, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          productApi.util.updateQueryData("getProducts", undefined, (draft) => {
            if (Array.isArray(draft)) {
              const productIndex = draft.findIndex(
                (prod) => prod.id === data.id
              );
              if (productIndex !== -1) {
                draft[productIndex] = { ...draft[productIndex], ...data };
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo(); // Rollback on error
          console.error("Error updating product:", error);
        }
      },
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
