import VikinXText from "@/components/common/VikinXText";
import { getStories } from "@/lib/actions/stories.actions";
import { stories } from "@/lib/utils";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "VikinX | Rider Diaries",
  openGraph: {
    title: "VikinX | Rider Diaries",
    url: "https://vikinx.in/profile",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
  twitter: {
    title: "VikinX | Rider Diaries",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
};

const Page = async () => {
  const userStories = await getStories(false);

  return (
    <main className="py-8">
      <section className="space-y-6">
        <div className="text-center">
          <h1 className="title">
            <VikinXText className="mr-2 md:mr-3" /> Stories
            <span className="text-slate-500 block mt-2">The Rider Diaries</span>
          </h1>
          <p className="lg:!w-[700px] mx-auto paragraph">
            Explore ‘Rider Diaries’ for authentic stories from the VikinX
            community. Each entry shares a unique journey, celebrating the
            spirit of adventure that unites us all.
          </p>
        </div>
        <div className="!gap-8 columns-1 md:columns-2 lg:columns-3">
          {[...userStories, ...stories].map((story) => (
            <Card key={story.uuid} className="h-auto break-inside-avoid mb-8">
              <CardBody className="text-justify text-small">
                {story.comment}
              </CardBody>
              <CardFooter className="text-end text-secondary font-semibold block">{story.review_by.name}</CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
