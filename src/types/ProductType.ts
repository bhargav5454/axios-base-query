// Response type for adding a product
export type TAddProductResponse = {
  message: string;
  data: TProduct;
};

// Response type for getting products
export type TGetProductsResponse = {
  message: string;
  data: TProduct[];
};

// Response type for deleting product

export type TdeleteProductResponse = {
  message: string;
  data: TProduct;
};

export type TupdateProductResponse = {
  message: string;
  data: TProduct;
};

// Existing product form value type
export type TProductFormValue = {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
};

// Single product type
export type TProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
};

export type TdeleteProductFormValue = {
  id: number;
};
