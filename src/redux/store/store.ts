import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../slices/authSlice";
import productReducer from "../slices/productSlice";
import { authApi } from "../api/authApi";
import { productApi } from "../api/productApi";

// Reusable function to create persisted reducers
const createPersistedReducer = (
  key: string,
  reducer: any,
  whitelist: string[] = []
) => {
  const persistConfig = {
    key,
    storage,
    whitelist,
  };
  return persistReducer(persistConfig, reducer);
};

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: createPersistedReducer("auth", authReducer, ["authData"]),
    product: productReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST","persist/PURGE"],
      },
    }).concat(authApi.middleware, productApi.middleware),
});

// Create the persistor
export const persistor = persistStore(store);
export default store;
