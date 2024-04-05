import { getRides } from "@/lib/actions/rides.action";
import { fetchUser } from "@/lib/actions/users.action";
import { helpers } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { Card, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const rides = await getRides();

  return (
    <>
      <main className="py-8">
        <section className="space-y-6">
          <div >
            <h1 className="title">Upcoming <span className="text-primary">Expedition Rides</span></h1>
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
                <Card isPressable className="border-primary  border-l-8 rounded-none h-[200px] w-full">
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
