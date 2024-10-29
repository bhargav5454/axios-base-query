import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { loginApi, signupApi } from "../api/authApi";

// Dynamic persist configurations
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["authData"], 
};


const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  [loginApi.reducerPath]: loginApi.reducer,
  [signupApi.reducerPath]: signupApi.reducer,
});

// Configure store with dynamic persistence
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], 
      },
    }).concat(loginApi.middleware, signupApi.middleware),
});

export const persistor = persistStore(store);
export default store;
