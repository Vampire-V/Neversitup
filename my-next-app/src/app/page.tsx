"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    // Redirect to /login
    router.replace("/login");
  }, [router]);
  return <></>;
}
