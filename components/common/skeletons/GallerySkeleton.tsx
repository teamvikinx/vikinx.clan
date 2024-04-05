import { Skeleton } from "@nextui-org/react";
import React from "react";

const GallerySkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        {[...Array(3)].map((x) => (
          <Skeleton className="rounded-lg" key={x}>
            <div className="h-44 rounded-lg bg-default-300"></div>
          </Skeleton>
        ))}
      </div>
    </>
  );
};

export default GallerySkeleton;
