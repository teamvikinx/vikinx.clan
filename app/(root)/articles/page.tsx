import { Image } from "@nextui-org/react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "VikinX | Articles",
  openGraph: {
    title: "VikinX | Articles",
    url: "https://vikinx.in/articles",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
  twitter: {
    title: "VikinX | Articles",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
};

const Page = () => {
  return (
    <main className="h-[80vh] w-full flex justify-center items-center mx-0">
      <section className="text-center">
        <Image
          src="/Short Logo - Zoomed.webp"
          width={250}
          alt="vikinx-originals-short-logo"
        />
        <div className="-mt-12">
          <h1 className="title text-white">Articles</h1>
          <h1 className="subtitle text-gray-500">Coming Soon</h1>
        </div>
      </section>
    </main>
  );
};

export default Page;
