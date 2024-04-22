import VikinXText from "@/components/common/VikinXText";
import ReviewForm from "@/components/forms/ReviewForm";
import { currentUser } from "@clerk/nextjs";
import { Card, CardBody, Divider, Image } from "@nextui-org/react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "VikinX | Your Story",
  openGraph: {
    title: "VikinX | Your Story",
    url: "https://vikinx.in/profile",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
  twitter: {
    title: "VikinX | Your Story",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
};

const Page = async () => {
  const user = await currentUser();

  return (
    <main className="py-8">
      <section>
        <Card className="max-w-[900px] mx-auto">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={"write-story-hero-image"}
            className="w-full object-cover object-center h-[200px] lg:h-[300px] !rounded-b-none grayscale"
            src="/write-story.webp"
          />
          <CardBody className="p-8">
            <div className="lg:grid lg:grid-cols-7 items-center">
              <div className="lg:col-span-3">
                <h1 className="title">Share Your Story with Us!</h1>
                <p className="text-small text-gray-500">
                  Your experiences fuel our journey at <VikinXText />. Share the
                  highlights of your rides and the impact they’ve had on you.
                  Your insights not only contribute to our growth but also
                  encourage the wider Vikinx family to explore new horizons.
                  Let’s ride together and share our stories!
                </p>
              </div>

              <Divider
                orientation="vertical"
                className="justify-self-center hidden lg:flex"
              />

              <div className="mt-6 lg:mt-0 lg:col-span-3">
                <ReviewForm
                  currentUser={{
                    name: `${user!.firstName} ${user!.lastName}`,
                    id: user!.id,
                  }}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </section>
    </main>
  );
};

export default Page;
