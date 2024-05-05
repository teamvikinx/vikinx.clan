import Facts from "@/components/common/Facts";
import RideCard from "@/components/common/cards/RideCard";
import Stories from "@/components/common/Stories";
import VikinXText from "@/components/common/VikinXText";
import { PulseBeams } from "@/components/ui/PulseBeam";
import { getTotalActiveUsersCount } from "@/lib/actions/users.action";
import { constants } from "@/lib/utils";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import TextCard from "@/components/common/cards/TextCard";
import { getFeaturedRides } from "@/lib/actions/rides.action";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs";
import JoinBtn from "@/components/common/JoinBtn";

export default async function Home() {
  const user = await currentUser();
  const totalUsersRegistered = await getTotalActiveUsersCount();
  const featuredRides = await getFeaturedRides();

  return (
    <main className="space-y-28 lg:space-y-48">
      <section>
        <div
          className="relative w-full h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/home-bg.webp')" }}
        >
          <div className="absolute w-full h-full p-5 text-white bg-black bg-opacity-70 text-xl flex flex-col items-center justify-center overflow-hidden">
            <div className="space-y-6 text-center">
              <h1 className="text-center text-6xl md:text-7xl lg:text-8xl text-white font-semibold">
                <span className="text-primary">Uniting Riders</span>, Redefining
                Journeys
              </h1>
              <p className="text-sm lg:text-lg lg:w-[900px] mx-auto text-justify lg:text-center">
                Fueled by the soul of a rider, <VikinXText /> is a community of
                riders who love boundless adventure. Connect, conquer, and
                celebrate the rider’s spirit with us. Ride fearlessly. Explore
                Endlessly.
                <span className="text-secondary font-semibold block">
                  Join the <VikinXText /> revolution and transform your solo
                  journeys into legendary squad sagas!
                </span>
              </p>
              <JoinBtn user={user} buttonTitle="Let’s Go" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="lg:grid lg:grid-cols-3 grid-flow-row gap-6 items-center">
          {/* FOR SMALL SCREENS */}
          <div className="md:hidden block">
            <h1 className="title mb-4 text-center">
              Why <VikinXText />?
            </h1>
            <div className="relative">
              <Image
                className="grayscale object-cover"
                src="/why-us.webp"
                alt="why-us-image"
                width={400}
              />
              <div className="bg-black/50 absolute top-0 left-0 w-full h-full z-10" />
              <div className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <p className="text-justify paragraph">
                  We are all about providing with you riding experiences filled
                  with soul-stirring explorations that connect you with the open
                  roads and riders who live for it. You'll return home forever
                  changed with memories and new inspiration, all sparked by
                  riding alongside passionate riders. Here’s what your next
                  adventure holds with us:
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              {constants.whyUsPoints.map((item, idx) => (
                <TextCard
                  key={item.title}
                  item={item}
                  className={
                    idx === constants.whyUsPoints.length - 1
                      ? "col-span-full"
                      : "mt-0"
                  }
                />
              ))}
            </div>
          </div>
          {/* FOR SMALL SCREENS */}

          {/* FOR LARGE SCREENS */}
          <Image
            className="grayscale object-cover hidden  md:block"
            src="/why-us.webp"
            alt="why-us-image"
            width={400}
          />
          <div className="col-span-2 space-y-6 hidden md:block">
            <h1 className="title">
              Why <VikinXText className="mr-2" />?
            </h1>
            <p className="text-justify paragraph">
              We are all about providing with you riding experiences filled with
              soul-stirring explorations that connect you with the open roads
              and riders who live for it. You'll return home forever changed
              with memories and new inspiration, all sparked by riding alongside
              passionate riders. Here’s what your next adventure holds with us:
            </p>
            <div className="grid grid-rows-2 grid-cols-3 gap-6 mt-6">
              {constants.whyUsPoints.map((item, idx) => (
                <TextCard
                  key={item.title}
                  item={item}
                  className={
                    idx === 2
                      ? "row-span-full justify-center text-justify"
                      : "mt-0 text-justify"
                  }
                />
              ))}
            </div>
            <div className="text-center lg:text-left">
              <Button
                as={Link}
                href="/about"
                variant="bordered"
                color="primary"
                className="font-semibold"
              >
                Know More
              </Button>
            </div>
          </div>

          {/* FOR LARGE SCREENS */}
        </div>
      </section>
      <section>
        <div className="relative z-30">
          <h1 className="title text-center">
            <VikinXText className="mr-2 md:mr-3" />
            Expeditions
            <span className="text-slate-500 block mt-2">
              The Redefined Riding Experience
            </span>
          </h1>
          <p className="mx-auto text-center lg:!w-[700px] paragraph">
            Join VikinX Expeditions. Here, every trip narrates the tale of an
            adventure where riders like you conquer uncharted territories
            shoulder-to-shoulder, pushing past the horizon. With us, you are
            your only limit.
          </p>
        </div>
        <PulseBeams />
      </section>

      {featuredRides.length ? (
        <section className="!-mt-16 relative z-20 md:!mt-32">
          <h1 className="title text-center">
            Upcoming Expeditions
            <span className="text-slate-500 block mt-2">
              Be Part Of The Adventure!
            </span>
          </h1>
          <Suspense fallback={<p>Loading Featured Rides...</p>}>
            <div
              className={`grid md:grid-cols-2 lg:grid-cols-${featuredRides.length} justify-center gap-6`}
            >
              {featuredRides.map((ride) => (
                <RideCard ride={ride} key={ride.uuid} />
              ))}
            </div>
          </Suspense>
        </section>
      ) : (
        <></>
      )}

      <section>
        <Suspense fallback={<p>Loading Stories...</p>}>
          <Stories />
        </Suspense>
      </section>

      <section>
        <Suspense fallback={<p>Loading Facts...</p>}>
          <Facts />
        </Suspense>
      </section>

      <section>
        <div className="text-center">
          <h1 className="title">
            For Riders <span className="text-primary"> By Riders</span>
          </h1>
          <p className="lg:!w-[700px] mx-auto paragraph">
            Join, and be part of a legacy in the making. Every ride is a chapter
            in the grand saga of the road. Are you ready to write yours? We are
            taking first 100 users as
            <span className="font-semibold">
              <VikinXText /> Originals.
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="mt-8 lg:mt-0">
            <div className="text-center">
              <div className="flex justify-center">
                <Image
                  src="/vikinx-short-og.webp"
                  width={250}
                  alt="vikinx-originals-short-logo"
                />
              </div>
              <h1 className="title text-slate-500">
                {totalUsersRegistered < 20 ? 25 : totalUsersRegistered} / 100
              </h1>
              <h3 className="subtitle">Orginals Collected</h3>
              <JoinBtn user={user} buttonTitle="Join Us now" />
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              className="grayscale"
              src="/vikinx-guy.webp"
              alt="vikinx-merch-guy"
              width={400}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
