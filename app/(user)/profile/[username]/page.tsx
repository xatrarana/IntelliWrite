import React from "react";
import ShowBlogSideBar from "../_show_blog";
import SideBarComp from "../_sidebar";
import { db } from "@/lib/db";

const UserProfilePage = ({ params }: { params: { username: string } }) => {

  const { username } = params;

  return (
    <main className="no-scrollbar grid grid-cols-12 h-full   p-2 gap-2">
      <SideBarComp userId={username} />
      <div className="mt-5 no-scrollbar col-span-8">
        <div className="no-scrollbar">
          <ShowBlogSideBar username={username} />
        </div>
      </div>
    </main>
  );
};

export default UserProfilePage;
