"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
import { userService } from "../_services/userService";
type PublicPage = "Login" | "Register";
const schema = yup
  .object({
    username: yup.string().min(1).required(),
    password: yup.string()
    .min(8)
    .matches(/[a-z]/, '${path} must contain at least one lowercase character')
    .matches(/[A-Z]/, '${path} must contain at least one uppercase character')
    .matches(/\d/, '${path} must contain at least one number')
    .required(),
  })
  .required();
type LoginOrRegisterForm = yup.InferType<typeof schema>;
export default function LoginOrRegister({ page }: { readonly page: PublicPage }) {
  const { login, register } = userService();
  const router = useRouter();
  const {
    register: registerFrom,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginOrRegisterForm>({
    resolver: yupResolver<LoginOrRegisterForm>(schema),
  });

  const fields = {
    username: registerFrom("username"),
    password: registerFrom("password"),
  };

  async function onSubmit({ username, password }: LoginOrRegisterForm) {
    console.log({ username, password });
    try {
      if (page === "Login") {
        const { data } = await login(username, password);
        if (!isEmpty(data.access_token) ) {
            localStorage.setItem("token", data.access_token);
            router.push("/todo");
        }
        
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <div className="flex items-center gap-x-3">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <span className="text-red-500">{errors.username?.message}</span>
          </div>

          <div className="mt-2">
            <input
              id="username"
              {...fields.username}
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-x-3">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <span className="text-red-500">{errors.password?.message}</span>
          </div>
          <div className="mt-2">
            <input
              id="password"
              {...fields.password}
              type="password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting && `${page}....`}
            {!isSubmitting && page}
          </button>
        </div>
      </form>
      {page === "Login" && (
        <div>
          <div className="flex w-full justify-center">
            <span className="alt arq ayb">Or</span>
          </div>
          <div>
            <button
              onClick={() => router.push("/register")}
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
