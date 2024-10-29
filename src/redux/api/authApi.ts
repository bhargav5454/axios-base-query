import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/axios";
import {
  TloginFormValues,
  TLoginResponse,
  TSignupFormValues,
  TSignupResponse,
} from "@/types/AuthType";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TloginFormValues>({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const signupApi = createApi({
  reducerPath: "signupApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    signup: builder.mutation<TSignupResponse, TSignupFormValues>({
      query: (data) => ({
        url: "user/create",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useSignupMutation } = signupApi;

export const { useLoginMutation } = loginApi;
