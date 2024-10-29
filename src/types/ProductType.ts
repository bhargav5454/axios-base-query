export type TproductFormValue = {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: string;
};

export type TaddProductResponse = {
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    createdBy: string;
    updatedAt: string;
    createdAt: string;
  };
};

export type TproductListData = {
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
