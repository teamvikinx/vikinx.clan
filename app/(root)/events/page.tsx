import EventCards from "@/components/common/cards/EventCards";
import { getRides } from "@/lib/actions/rides.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "VikinX | Events",
  openGraph: {
    title: "VikinX | Events",
    url: "https://vikinx.in/events",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
  twitter: {
    title: "VikinX | Events",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
};

const Page = async () => {
  const rides = await getRides();

  return (
    <>
      <main className="py-8 space-y-16 lg:space-y-32">
        <section className="space-y-6">
          <div>
            <h1 className="title">
              <span className="text-primary">Expedition</span> Events
            </h1>
            <p className="text-sm lg:text-lg">
              Embark on VikinX Expeditions, where every throttle twist narrates
              a tale of adventure and camaraderie. Join us to traverse the
              uncharted, with the wind as your guide and the horizon as your
              limit.
            </p>
          </div>

          <div className="text-small text-secondary">
            Note: Click on ride cards to enroll and view ride details!
          </div>

          <EventCards rides={JSON.stringify(rides)} />
        </section>
      </main>
    </>
  );
};

export default Page;
