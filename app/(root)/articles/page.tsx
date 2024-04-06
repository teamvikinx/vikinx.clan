"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { Image } from "@nextui-org/react";
import React from "react";

const Page = () => {
  const { width } = useWindowDimensions();
  return width > 768 ? (
    <main className="h-[80vh] w-full flex justify-center items-center mx-0">
      <section className="text-center">
        <Image
          src="/Short Logo - Zoomed.png"
          width={250}
          alt="vikinx-originals-short-logo"
        />
        <div className="-mt-12">
          <h1 className="title text-white">Articles</h1>
          <h1 className="subtitle text-gray-500">Coming Soon</h1>
        </div>
      </section>
    </main>
  ) : (
    <AuroraBackground>
      <main className="h-[80vh] w-full flex justify-center items-center">
        <section className="text-center">
          <Image
            src="/Short Logo - Zoomed.png"
            width={250}
            alt="vikinx-originals-short-logo"
          />
          <div className="-mt-12">
            <h1 className="text-5xl font-semibold md:title text-white">Articles</h1>
            <h1 className="subtitle text-gray-500">Coming Soon</h1>
          </div>
        </section>
      </main>
    </AuroraBackground>
  );
};

export default Page;
