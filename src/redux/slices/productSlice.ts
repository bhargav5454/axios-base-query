import {
  TProduct,
  TAddProductResponse,
  TGetProductsResponse,
  TdeleteProductResponse,
  TupdateProductResponse,
} from "@/types/ProductType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productApi } from "../api/productApi";

interface ProductState {
  productData: TProduct[];
  message: string | null;
}

const initialState: ProductState = {
  productData: [],
  message: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.addProducts.matchFulfilled,
      (state, action: PayloadAction<TAddProductResponse>) => {
        state.productData.push(action.payload.data);
        state.message = action.payload.message;
      }
    );

    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, action: PayloadAction<TGetProductsResponse>) => {
        state.productData = action.payload.data;
      }
    );
    builder.addMatcher(
      productApi.endpoints.deleteProduct.matchFulfilled,
      (state, action: PayloadAction<TdeleteProductResponse>) => {
        state.productData = state.productData.filter(
          (product) => product.id !== action.payload.data.id
        );
      }
    );
    builder.addMatcher(
      productApi.endpoints.updateProduct.matchFulfilled,
      (state, action: PayloadAction<TupdateProductResponse>) => {
        state.productData = state.productData.map((product) => {
          if (product.id === action.payload.data.id) {
            return action.payload.data;
          }
          return product;
        });
      }
    );
  },
});

export default productSlice.reducer;
