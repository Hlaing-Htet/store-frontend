import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

export const getServerSideProps = withPageAuthRequired();

const Profile = ({ user }) => {
  const router = useRouter();
  return (
    <main className=" bg-white border w-1/2 p-4 rounded-lg">
      {user ? (
        <div className=" flex flex-col items-center justify-center gap-5">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button
            onClick={() => router.push("/api/auth/logout")}
            className=" btn btn-sm"
          >
            Log out
          </button>
        </div>
      ) : null}
    </main>
  );
};

export default Profile;
