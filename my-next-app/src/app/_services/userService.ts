import { AxiosResponse } from "axios";
import { instance } from "./fetchClient";

export interface IUser {
  id: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}
export interface ILoginResponse {username: string, access_token: string}
export interface IRegisterResponse {isSuccess: boolean, data: IUser}
export interface IUserService {
  login: (username: string, password: string) => Promise<AxiosResponse<ILoginResponse,any>>;
  register: (username: string, password: string) => Promise<AxiosResponse<IRegisterResponse,any>>;
}

const login = async (username: string, password: string) => await instance.post<ILoginResponse>('/auth/login', { username, password });
const register = async (username: string, password: string) => await instance.post<IRegisterResponse>('/users', { username, password });

function userService(): IUserService {
  return {
    login,
    register,
  };
}

export { userService };
