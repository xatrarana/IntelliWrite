import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AuthorCard } from "./author-card";
import { db } from "@/lib/db";


interface BlogCardWrapperProps {
  children: React.ReactNode | React.JSX.Element;
  authorId: string;
  
}

export const BlogCardWrapper = async ({
  children,
  authorId,
}: BlogCardWrapperProps) => {


  const author = await db.user.findUnique({
    where: {
      id: authorId,
    },
  })
  return (
    <Card className="w-full">
      <CardHeader>
        <AuthorCard authorAvatra={author?.image as string} authorUsername={author?.username as string}/>
      </CardHeader>
      
      <CardContent>{children}</CardContent>
    </Card>
  );
};