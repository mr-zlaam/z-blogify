export interface UserRegisterTypes {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserLoginTypes {
  email: string;
  password: string;
}

export interface UserDataTypes {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
