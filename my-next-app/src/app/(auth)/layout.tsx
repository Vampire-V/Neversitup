"use client";
import React from "react";
import { store } from "@/app/_store/store";
import { Provider } from "react-redux";

export default function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
