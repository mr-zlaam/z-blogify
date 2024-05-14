interface AuthorTypes {
  _id: string;
  displayName: string;
}

export interface UserRegisterTypes {
  username: string;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserLoginTypes {
  email: string;
  password: string;
}
