import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useRouter } from "next/router";

const UserMenuItem = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  //if not login
  if (!user) {
    return (
      <div>
        <Link href="/api/auth/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  }
  //if logged in
  return (
    <div
      onClick={() => router.push("/profile")}
      className=" cursor-pointer flex items-center gap-2"
    >
      <img
        className=" rounded-full w-6 h-6"
        src={user.picture}
        alt={user.name}
      />
      <h3>{user.name}</h3>
    </div>
  );
};

export default UserMenuItem;
