"use client";
import VikinXText from "@/components/common/VikinXText";
import { images } from "@/lib/data/gallery-images";
import React, { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const slides = images.map(({ original, width, height }) => ({
  src: original,
  width,
  height,
}));

const Page = () => {
  const [index, setIndex] = useState(-1);

  return (
    <main className="py-16">
      <section>
        <h1 className="title text-center mb-8">
            <VikinXText /> Gallery
        </h1>
        <PhotoAlbum
          layout="columns"
          photos={slides}
          targetRowHeight={150}
          onClick={({ index: current }: { index: any }) => setIndex(current)}
        />

        <Lightbox
          className="relaive z-[99999]"
          index={index}
          slides={slides}
          open={index >= 0}
          close={() => setIndex(-1)}
        />
      </section>
    </main>
  );
};

export default Page;
