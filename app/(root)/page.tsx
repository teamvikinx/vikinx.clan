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

export default async function Home() {
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
              <p className="text-sm lg:text-lg lg:w-[900px] mx-auto">
                Crafted with the soul of a rider, <VikinXText /> is your compass
                to the uncharted. We’re not just about the ride; we’re about
                revolutionizing the ride. Connect, conquer, and celebrate the
                rider’s spirit with us.{" "}
                <span className="text-secondary font-semibold">
                  Ride Bold. Tour Vast. Explore Endless.{" "}
                </span>
                Join the <VikinXText /> revolution—where every journey is a
                story waiting to be told.
              </p>
              <Button
                as={Link}
                color="primary"
                href="/sign-up"
                variant="solid"
                radius="sm"
                className="!w-[150px]  font-semibold uppercase"
              >
                Join Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="lg:grid lg:grid-cols-3 grid-flow-row gap-6 items-center">
          <div>
            <h1 className="title mb-4 lg:hidden block">
              Why <VikinXText />?
            </h1>
            <Image
              className="grayscale"
              src="/why-us.webp"
              alt="why-us-image"
              width={400}
            />
          </div>
          <div className="col-span-2 space-y-6">
            <h1 className="title hidden lg:block">
              Why <VikinXText className="mr-2" />?
            </h1>
            <p className="text-justify paragraph">
              Embark on a journey where the road never ends, and the adventure
              is eternal. Join <VikinXText />, and become part of a movement
              that’s more than just riding—it’s about embracing the spirit of
              the open road and the brotherhood that comes with it. Here’s why
              you should throttle up and join us.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {constants.whyUsPoints.map((item) => (
                <TextCard key={item.title} item={item} />
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
        </div>
      </section>
      <section>
        <div>
          <h1 className="title text-center">
            <VikinXText className="mr-2 md:mr-3" />
            Expeditions{" "}
            <span className="text-slate-500 block mt-2">
              The Ultimate Riding Saga
            </span>
          </h1>
          <p className="mx-auto text-center lg:!w-[700px] paragraph">
            Embark on <VikinXText /> Expeditions, where every throttle twist
            narrates a tale of adventure and camaraderie. Join us to traverse
            the uncharted, with the wind as your guide and the horizon as your
            limit.
          </p>
        </div>
        <PulseBeams />
      </section>

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
            taking first 100 users as{" "}
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
              <Button
                as={Link}
                href="/sign-up"
                color="primary"
                variant="flat"
                className="mt-4"
              >
                Sign up Now
              </Button>
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
