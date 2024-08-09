"use client";
import * as yup from "yup";
import LoginOrRegister from "@/app/_components/loginOrRegister";
import { AppDispatch } from "@/app/_store/store";
import { useDispatch } from "react-redux";
import React from "react";

export default function Login() {

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <LoginOrRegister page="Login" />
    </div>
  );
}
