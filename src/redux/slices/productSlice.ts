import {
  TaddProductResponse,
    TproductListData,
} from "@/types/ProductType";
import { createSlice } from "@reduxjs/toolkit";
import { productApi } from "../api/productApi";

interface Product {
  productData: TaddProductResponse | null | TproductListData;
}

const initialState: Product = {
  productData: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.addProducts.matchFulfilled,
      (state, action) => {
        state.productData = action.payload;
      }
    );
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        state.productData = action.payload;
      }
    );
  },
});

export default productSlice.reducer;