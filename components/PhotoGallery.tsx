"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import GallerySkeleton from "./common/skeletons/GallerySkeleton";

const PhotoGallery = () => {
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState<GalleryImages[]>([]);
  const [loading, setLoading] = useState(false);

  const getGalleryImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/gallery`,
        { next: { revalidate: 3600 } }
      );

      const data = await res.json();

      if (data.data) {
        const updatedData = data.data.map((image: CloudinaryResponse) => ({
          src: image.secure_url,
          width: image.width,
          height: image.height,
          assetId: image.asset_id,
          publicId: image.public_id,
        }));

        setImages(updatedData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGalleryImages();
  }, []);
  

  return (
    <>
      {loading ? (
        <GallerySkeleton />
      ) : (
        <>
          <PhotoAlbum
            layout="columns"
            photos={images}
            targetRowHeight={150}
            onClick={({ index: current }: { index: any }) => setIndex(current)}
          />

          <Lightbox
            className="relaive z-[99999]"
            index={index}
            slides={images}
            open={index >= 0}
            close={() => setIndex(-1)}
          />
        </>
      )}
    </>
  );
};

export default PhotoGallery;
