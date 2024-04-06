import VikinXText from "@/components/common/VikinXText";
import React from "react";
import "yet-another-react-lightbox/styles.css";
import PhotoGallery from "@/components/ui/PhotoGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VikinX | Gallery",
  openGraph: {
    title: "VikinX | Gallery",
    url: "https://vikinx.in/gallery",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
  twitter: {
    title: "VikinX | Gallery",
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
    <main className="py-16">
      <section>
        <h1 className="title text-center mb-8">
          <VikinXText /> Gallery
        </h1>

        <PhotoGallery />
      </section>
    </main>
  );
};

export default Page;
