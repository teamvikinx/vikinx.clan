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
            <p className="lg:w-[700px] mx-auto text-center paragraph">
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
        <p className="lg:w-[700px] mx-auto text-center paragraph">
          To revolutionize the biking experience by creating a global community
          of riders who share a passion for the open road, and to make every
          ride an effortless adventure.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {constants.values.map((item, idx) => (
            <TextCard
              key={item.title}
              item={item}
              className={idx === 2 ? "row-span-2 justify-center" : "row-span-1"}
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
            <p className="paragraph text-center lg:text-left">
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
            >
              Sign up Now
            </Button>
            <Button
              as={Link}
              href="/ride"
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
              Why We <span className="text-primary">Exist!</span>
            </h1>
            <Image src="/vikinx-bikes.jpg" alt="guys-on-bike" width={700} />
          </span>
        </div>
        <div>
          <h3 className="subtitle">
            Discover the Joy of Effortless Riding with <VikinXText />!
          </h3>
          <div className="lg:w-[700px] mx-auto text-center space-y-4 paragraph">
            <p>
              Are you a solo rider seeking the thrill of the open road, yet
              yearning for the camaraderie and safety of a group ride? Or
              perhaps you're part of a riding group, finding it challenging to
              manage your rides and keep up with the latest moto updates and
              tips? Your quest ends here!
            </p>
            <p>
              We are <VikinXText />, an India-based moto tech startup, born out
              of our own experiences and passion for biking. We understand the
              exhilaration of solo rides, the fun and safety of group rides, and
              the challenges that come with both. We've been there, faced those
              issues, and are now committed to making your life easier as a
              rider. With VikinX, every ride is a breeze, be it on a Sunday
              morning or a Monday evening. We're here to transform your riding
              experience, making it more enjoyable, safer, and absolutely
              effortless. So gear up, rev your engines, and join us on this
              exciting journey. Welcome to VikinX, where every ride is an
              adventure waiting to unfold!
            </p>
          </div>
        </div>
      </section>

      <section id="vikin-originals">
        <div className="grid justify-center items-center lg:grid-cols-2">
          <Image
            src="/og-short-logo-spotlight.png"
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
            <p className="lg:w-[700px] mx-auto text-center lg:text-justify paragraph">
              VikinX Originals represents the pinnacle of distinction within the
              VikinX Community. It’s not merely a title; it’s a symbol of
              prestige and respect. Members awarded this honor enjoy exclusive
              benefits, privileges, and early access to our newest features. The
              path to achieving this esteemed status will be unveiled with our
              application’s launch. Embrace the spirit of excellence—become a
              VikinX Original. Don’t just ride; lead the way as a true original.
            </p>
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
