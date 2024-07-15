import { auth } from "@/auth";

import { FeedWrapper } from "@/components/home/feed/feed-wrapper";
import HomeWrapper from "@/components/home/home-wrapper";
import { HorizontalBar } from "@/components/home/horizontal-bar";

import { RecommendationWrapper } from "@/components/home/recommendation/recommendation-wrapper";
import ParticleDesgin from "@/components/design/design";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import UnAuthenticatedLayout from "@/components/layout/UnAuthenticatedLayout";
import { db } from "@/lib/db";


export default async function Home() {
  const session = await auth();
  const blogs = await db.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
  return (
    <>
      {session && (
        <AuthenticatedLayout>
          <HomeWrapper>
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-x-5 ">
            <div className="col-span-2">
              <div className="">
                <HorizontalBar />
              </div>

              <div className="mt-5">
                <FeedWrapper blogs={blogs} />
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex flex-col gap-y-5">
                <h1 className="text-2xl font-semibold">Recommended topics</h1>
                <RecommendationWrapper />
                <p className="text-green-500">see more topics</p>
              </div>
            </div>
          </div>
        </HomeWrapper>
        </AuthenticatedLayout>
      )}

      {
        !session && (
          <UnAuthenticatedLayout/>
           
        )
      }
    </>



  
  );
}
