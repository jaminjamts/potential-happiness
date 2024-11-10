"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();

  return (
    <main>
      <Link href="/signup">sign up</Link>
    </main>
  );
}
