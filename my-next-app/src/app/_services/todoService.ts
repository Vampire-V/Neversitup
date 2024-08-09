import { AxiosResponse } from "axios";
import { instance } from "./fetchClient";
import { IUser } from "./userService";

export interface ITodo {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by?: Pick<IUser, "id" | "username">;
  no?: number;
  completed?: boolean;
}
export interface ITodoResponse<T> {
  isSuccess: boolean;
  data: T;
}
export interface ITodoService {
  add: (
    body: Pick<ITodo, "title" | "description">
  ) => Promise<AxiosResponse<ITodoResponse<ITodo>, any>>;
  update: (
    id: string,
    body: Pick<ITodo, "title" | "description">
  ) => Promise<AxiosResponse<ITodoResponse<ITodo>, any>>;
  remove: (id: string) => Promise<AxiosResponse<ITodoResponse<ITodo>, any>>;
  getAll: () => Promise<AxiosResponse<ITodoResponse<ITodo[]>, any>>;
  getAllByUser: () => Promise<AxiosResponse<ITodoResponse<ITodo[]>, any>>;
  getById: (id: string) => Promise<AxiosResponse<ITodoResponse<ITodo>, any>>;
}

const add = async (body: Pick<ITodo, "title" | "description">) =>
  await instance.post<ITodoResponse<ITodo>, any>("/todo", body);
const update = async (id: string, body: Pick<ITodo, "title" | "description">) =>
  await instance.patch<ITodoResponse<ITodo>, any>(`/todo/${id}`, body);
const remove = async (id: string) =>
  await instance.delete<ITodoResponse<ITodo>, any>(`/todo/${id}`);
const getAll = async () => await instance.get<ITodoResponse<ITodo[]>, any>(`/todo/all`);
const getAllByUser = async () => await instance.get<ITodoResponse<ITodo[]>, any>(`/todo`);
const getById = async (id: string) => await instance.get<ITodoResponse<ITodo>, any>(`/todo/${id}`);

function todoService(): ITodoService {
  return {
    add,
    update,
    remove,
    getAll,
    getAllByUser,
    getById,
  };
}

export { todoService };
