export interface IRegisterUser {
  Email: string;
  fullName: string;
  Password: string;
  phone: string;
}
export interface ILoginUser {
  Email: string;
  Password: string;
}
export interface IStoredUser {
  Email: string;
  name: string;
  token: string;
  phone: string;
}
export interface IGetAllUsers {
  _id: string;
  Email: string;
  fullName: string;
  role: string;
  phone: string;
}
export interface IUpdateUser {
  _id: string;
  fullName: string;
  Email: string;
  phone: string;
}
