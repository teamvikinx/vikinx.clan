import { Skeleton } from "@nextui-org/react";
import React from "react";

const CardFullSkeleton = () => {
  return (
    <>
      <Skeleton className="rounded-lg mt-6">
        <div className="h-16 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg mt-6">
        <div className="h-16 rounded-lg bg-default-300"></div>
      </Skeleton>
    </>
  );
};

export default CardFullSkeleton;
