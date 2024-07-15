"use client";

import { Card, CardContent, CardHeader } from "../ui/card";

interface UserNameCardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
}

export const UserNameCardWrapper = ({
  children,
  headerLabel
}: UserNameCardWrapperProps) => {
  return (
    <Card className="w-[400px]">
      <CardHeader>{headerLabel}</CardHeader>
      <CardContent>{children}</CardContent>

    </Card>
  );
};
