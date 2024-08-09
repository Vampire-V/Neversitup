"use client";

import LoginOrRegister from "@/app/_components/loginOrRegister";

export default function Register() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <LoginOrRegister page="Register" />
    </div>
  );
}
