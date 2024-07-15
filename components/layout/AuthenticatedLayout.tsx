import React from "react";
import { NavBar } from "../navbar/nav";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <NavBar createBlogButtonVissible/>
      </header>
      <main className="mt-5 p-2">{children}</main>
    </>
  );
};

export default AuthenticatedLayout;
