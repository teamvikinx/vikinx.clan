import { getRideById } from "@/lib/actions/rides.action";
import { helpers } from "@/lib/utils";
import {
  Card,
  CardBody,
  Image,
  Link,
} from "@nextui-org/react";
import { CalendarFold, RouteIcon, SquareArrowOutUpRight } from "lucide-react";
import React from "react";
import RideDetailsTabs from "@/components/common/RideDetailsTabs";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/users.action";

async function fetchUserData() {
  const user = await currentUser();
  let userInfo;

  if (user) {
    userInfo = await fetchUser(user.id);
  }

  const userData = {
    user_id: userInfo?.user_id || user?.id,
    status: userInfo?.status || false,
    onboarding: userInfo?.onboarding || false,
    state: userInfo?.state || "",
  };

  return userData as IUser;
}

const Page = async ({ params }: { params: { [key: string]: string } }) => {
  const ride = await getRideById(params.id);
  const user = await fetchUserData();

  return (
    <main className="py-8">
      <Card className="max-w-[900px] mx-auto !rounded-b-none">
        <CardBody className="p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={ride.title}
            className="w-full object-cover object-center h-[200px] lg:h-[250px] !rounded-b-none"
            src={ride.thumbnail}
          />

          <div className="px-2 space-y-4">
            <h1 className="title flex">
              {ride.title}
              <span className="ml-2">
                <Link href={ride.route} target="_blank">
                  <SquareArrowOutUpRight className="text-primary" size={20} />
                </Link>
              </span>
            </h1>

            <div className="flex items-center space-x-4 text-small font-semibold">
              <p className="flex items-center ">
                <CalendarFold size={20} className="mr-2 text-primary" />
                {helpers.formatDate(JSON.parse(ride.start_date))}
              </p>
              <span className="text-gray-500">|</span>
              <p className="flex items-center ">
                <RouteIcon size={20} className="mr-2 text-primary" />
                {ride.average_kilometers} KM
              </p>
            </div>
            <p>{ride.summary}</p>
            <RideDetailsTabs
              description={ride.description}
              rideId={params.id}
              user={user}
              ridersJoined={ride.users_joined.map((user) => user.user_id)}
            />
          </div>
        </CardBody>
      </Card>
    </main>
  );
};

export default Page;
