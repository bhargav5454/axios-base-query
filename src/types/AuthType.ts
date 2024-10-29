export type TloginFormValues = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  token: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
};

export type TSignupFormValues = {
  name: string;
  email: string;
  password: string;
};

export type TSignupResponse = {
  id: string;
  name: string;
  email: string;
  password: string;
};
