import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/axios";
import {
  TloginFormValues,
  TLoginResponse,
  TSignupFormValues,
  TSignupResponse,
} from "@/types/AuthType";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TloginFormValues>({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        data,
      }),
    }),
    signup: builder.mutation<TSignupResponse, TSignupFormValues>({
      query: (data) => ({
        url: "user/create",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
