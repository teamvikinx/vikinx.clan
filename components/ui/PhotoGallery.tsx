"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import GallerySkeleton from "../common/skeletons/GallerySkeleton";

const PhotoGallery = () => {
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState<GalleryImages[]>([]);
  const [loading, setLoading] = useState(false);

  const getGalleryImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: CloudinaryResponse[] }>(
        "/api/gallery"
      );

      if (response.data && response.data.data) {
        const updatedData = response.data.data.map((image) => ({
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
