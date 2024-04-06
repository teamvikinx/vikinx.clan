import { getRides } from "@/lib/actions/rides.action";
import { helpers } from "@/lib/utils";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";
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
      <main className="py-8">
        <section className="space-y-6">
          <div>
            <h1 className="title">
              Upcoming <span className="text-primary">Expedition Rides</span>
            </h1>
            <p className="text-sm lg:text-lg">
              Embark on VikinX Expeditions, where every throttle twist narrates
              a tale of adventure and camaraderie. Join us to traverse the
              uncharted, with the wind as your guide and the horizon as your
              limit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rides.map((ride) => (
              <Link key={ride.uuid} href={`/events/${ride.uuid}`}>
                <Card
                  isPressable
                  className="border-primary  border-l-8 rounded-none h-[200px] w-full"
                >
                  <CardHeader className="absolute z-10 bottom-0 flex-col !items-start backdrop-blur-sm bg-white/500 rounded-none">
                    <p className="text-tiny text-secondary-200 uppercase font-semibold">
                      {helpers.formatDate(JSON.parse(ride.start_date))}
                    </p>
                    <h4 className="text-white font-medium text-xl">
                      {ride.title}
                    </h4>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover rounded-none "
                    src={ride.thumbnail}
                  />
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
