import Stories from "@/components/common/Stories";
import VikinXText from "@/components/common/VikinXText";
import TextCard from "@/components/common/cards/TextCard";
import GlobeFinal from "@/components/ui/GlobeFinal";
import { constants } from "@/lib/utils";
import { Button, Image, Link } from "@nextui-org/react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "VikinX | About",
  openGraph: {
    title: "VikinX | About",
    url: "https://vikinx.in/about",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
  twitter: {
    title: "VikinX | About",
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
    <main className="space-y-28 lg:space-y-48">
      <div className="h-screen flex items-center justify-center">
        <div>
          <section id="mission">
            <h1 className="title text-center">
              Our <span className="text-primary">Mission</span>
            </h1>
            <p className="lg:w-[700px] mx-auto text-justify lg:text-center paragraph">
              Our mission is to empower riders with technology that enhances
              their riding experience, fosters a sense of community, and
              promotes safety. We aim to provide a platform where riders can
              connect, share experiences, and manage their rides effortlessly,
              making every journey a memorable one. Connecting the riders
              across.
            </p>
          </section>
          <section className="relative w-full h-[15rem] lg:h-[35rem] lg:-mt-16">
            <GlobeFinal />
          </section>
        </div>
      </div>

      <section id="vision">
        <h1 className="title text-center">
          Our Vision <span className="text-primary">+</span>
          <span className="text-slate-500"> Values</span>
        </h1>
        <p className="lg:w-[700px] mx-auto text-justify lg:text-center paragraph">
          To revolutionize the biking experience By building a global community
          of riders, we aim to unlock limitless possibilities in the biking
          experience, transforming every ride into an effortless adventure.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {constants.values.map((item, idx) => (
            <TextCard
              key={item.title}
              item={item}
              className={
                idx === 2
                  ? "row-span-2 justify-center lg:text-justify"
                  : "row-span-1 lg:text-justify"
              }
            />
          ))}
        </div>
      </section>

      <section id="join-us">
        <div className="grid lg:grid-cols-3 items-center border border-slate-500 p-6 rounded-md">
          <div>
            <h1 className="title text-center lg:text-left">
              Join <VikinXText />
            </h1>
          </div>
          <div>
            <p className="paragraph text-justify lg:text-left">
              Be part of a legacy in the making. Every ride is a chapter in the
              grand saga of the road. Are you ready to write yours?
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Button
              as={Link}
              href="/sign-up"
              color="primary"
              variant="bordered"
              className="mt-4"
              size="sm"
              target="_blank"
            >
              Sign up Now
            </Button>
            <Button
              as={Link}
              href="/events"
              color="secondary"
              variant="bordered"
              className="mt-4"
              size="sm"
            >
              Check Rides
            </Button>
          </div>
        </div>
      </section>

      <section id="why-we-exist" className="text-center">
        <div className="flex justify-center">
          <span>
            <h1 className="title">
              Our <span className="text-primary">Origin!</span>
            </h1>
            <Image src="/vikinx-bikes.webp" alt="guys-on-bike" width={700} />
          </span>
        </div>
        <div>
          <h3 className="subtitle">
            Quest to explore limitless wonders over bikes!
          </h3>
          <div className="lg:w-[700px] mx-auto text-justify lg:text-center space-y-4 paragraph">
            <p>
              We are VIKINX, an India-based moto tech community/startup, forged
              from the fires of passion and the open road. We’ve tasted the
              freedom of solo adventures and the camaraderie of group rides.
              We've battled the elements, faced the frustrations, and now we're
              here to change the game.
            </p>
            <p>
              The name <VikinXText /> echoes the spirit of those legendary
              warriors who roamed the seas, shared unmatched brotherhood and
              unwavering courage. Just like a Viking, a rider needs bravery to
              conquer the open road, facing the wind and whatever challenges it
              throws your way. It's about carving your own path, leaving your
              mark on the world, mile after glorious mile.
            </p>
            <p>
              So, if you're looking for a community that thrives on adventure
              and companionship, <VikinXText /> is calling your name. Answer the
              call, and join the ride!
            </p>
            <Button
              as={Link}
              color="primary"
              href={"/events"}
              variant="solid"
              radius="sm"
              className="!w-[150px]  font-semibold uppercase"
            >
              Join now
            </Button>
          </div>
        </div>
      </section>

      <section id="vikin-originals">
        <div className="grid justify-center items-center lg:grid-cols-2">
          <Image
            src="/og-short-logo-spotlight.webp"
            alt="og-short-logo-spotlight"
            width={500}
          />
          <div>
            <h1 className="title text-center lg:text-left">
              <span className="text-slate-500">So Whats,</span>
              <span className="block mt-2">
                <VikinXText /> Originals?
              </span>
            </h1>
            <div className="space-y-4">
              <p className="mx-auto text-justify lg:text-justify paragraph">
                VikinX Originals is the pinnacle of distinction within the
                VikinX Community, reserved for the most dedicated riders who
                conquer countless journeys. By earning this coveted status, you
                prove your passion for the ride and commitment to safety.
              </p>
              <p className="mx-auto text-justify lg:text-justify paragraph">
                It’s not merely a title; it’s a symbol of prestige and respect.
                Members awarded this honor enjoy exclusive access to extra
                features, limited-edition merchandise, and VIP Rider privileges
                that put you at the front of the pack.
              </p>
              <p className="mx-auto text-justify lg:text-justify paragraph">
                The path to this elite status will be revealed with our
                application launch. Choose the road to excellence—become a
                VikinX Original. Don’t just ride; lead the way as a true
                original.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Stories />
      </section>
    </main>
  );
};

export default Page;
