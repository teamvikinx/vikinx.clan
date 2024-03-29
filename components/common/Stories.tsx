"use client";
import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { stories } from "@/lib/utils";
import VikinXText from "./VikinXText";

const Stories = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="title">
          <VikinXText className="mr-2 md:mr-3" /> Stories
          <span className="text-slate-500 block mt-2">The Rider Diaries</span>
        </h1>
        <p className="lg:!w-[700px] mx-auto paragraph">
          Explore ‘Rider Diaries’ for authentic stories from the VikinX
          community. Each entry shares a unique journey, celebrating the spirit
          of adventure that unites us all.
        </p>
      </div>
      <InfiniteMovingCards items={stories} direction="right" speed="slow" />
    </>
  );
};

export default Stories;
