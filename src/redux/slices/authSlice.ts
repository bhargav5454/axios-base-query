import { TLoginResponse } from "@/types/AuthType";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

interface AuthState {
  user: TLoginResponse | null;
  authData: {
    token: string | null;
    accessToken: string | null;
  };
}

const initialState: AuthState = {
  user: null,
  authData: {
    token: null,
    accessToken: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.authData.token = null;
      state.authData.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,  
      (state, action) => {
        state.user = action.payload;
        state.authData.token = action.payload.token;
        state.authData.accessToken = action.payload.data.id;
      }
    );
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
