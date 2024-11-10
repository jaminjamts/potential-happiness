"use client";

import { BACKEND_ENDPOINT } from "@/components/constants";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [newUserData, setNewUserData] = useState({});

  const newUserInputData = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({ ...prev, [name]: value }));
  };
  const fetchNewUserData = async () => {
    if (!newUserData.name) {
      return alert("please enter username");
    } else if (!newUserData.email) {
      return alert("please enter email");
    } else if (!newUserData.password) {
      return alert("passwordoo oruulna uu");
    }
    if (newUserData.password !== newUserData.repassword) {
      return alert("batalgaajuulah password buruu baina");
    }
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/signup`, options);
      const data = await response.json();
      if (data.success == true) {
        alert("amjilttai burtgel uuslee");
        router.push("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-screen w-screen bg-white flex items-center">
      <div className="h-screen w-1/2 justify-center flex flex-col gap-4 bg-cyan-500 items-center">
        <h3 className="text-2xl font-semibold text-slate-900 text-center">
          Create Money Tracker account
        </h3>
        <p className="text-base text-slate-700 text-center ">
          Sign up below to create your Wallet account
        </p>
        <div className="flex flex-col items-center gap-4 w-1/2 justify-center">
          <input
            className="p-2 rounded-md border border-slate-400 h-12 w-full"
            type="text"
            name="name"
            placeholder="Username"
            onChange={newUserInputData}
          />
          <input
            className="p-2 rounded-md border border-slate-400 h-12  w-full"
            type="email"
            name="email"
            placeholder="email"
            onChange={newUserInputData}
          />
          <input
            className="p-2 rounded-md border border-slate-400 h-12  w-full"
            type="password"
            name="password"
            placeholder="Password"
            onChange={newUserInputData}
          />
          <input
            className="p-2 rounded-md border border-slate-400 h-12  w-full"
            type="password"
            name="repassword"
            placeholder="Re-Password"
            onChange={newUserInputData}
          />
          <button
            onClick={fetchNewUserData}
            className="flex h-12 bg-white rounded-md items-center w-full justify-center"
          >
            Submit
          </button>
        </div>
        <div className="flex justify-around">
          <p>Already have account ?</p>
          <Link href={"/"}>
            <button>Sign in</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
