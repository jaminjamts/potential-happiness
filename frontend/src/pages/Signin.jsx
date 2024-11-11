"use client";
import { BACKEND_ENDPOINT } from "@/components/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Signin() {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const inputUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUserData = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/signin`, options);
      const data = await response.json();
      const user = data.user;
      sessionStorage.setItem("userID", user[0].id);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <main className="h-screen w-screen bg-white flex items-center">
      <div className="h-screen w-screen md:w-1/2 justify-center flex flex-col bg-cyan-500 items-center gap-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-slate-900 text-center font-semibold text-2xl">
            Welcome Back
          </h3>
          <p className="text-slate-900 text-center">
            Welcome back, Please enter your details
          </p>
        </div>
        <div className="flex flex-col gap-2  w-1/2">
          <input
            className="rounded-xl px-4 py-1 h-12 w-full"
            onChange={inputUserData}
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="rounded-xl px-4 py-1 h-12 w-full"
            onChange={inputUserData}
            type="password"
            name="password"
            placeholder="Password "
          />
          <button
            className="bg-white rounded-2xl py-2 h-12 w-full"
            onClick={fetchUserData}
          >
            Log in
          </button>
        </div>
        <div className="flex gap-2">
          <p>Don't have account</p>
          <Link className="text-slate-900" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
