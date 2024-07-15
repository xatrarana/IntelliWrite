import React, { Suspense } from "react";
import EditorBox from "./rich-text-box";
import { auth } from "@/auth";

function Loader() {
  return <span className="loading loading-spinner loading-lg"></span>;
}
const StoryWrapper = async() => {
  const session = await auth()
  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col gap-y-5">
      <Suspense fallback={<Loader />}>
        <EditorBox authorId={session?.user.id as string} />
      </Suspense>
    </div>
  );
};

export default StoryWrapper;
