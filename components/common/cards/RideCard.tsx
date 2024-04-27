import StartRideButton from "@/components/user-profile/StartRideButton";
import { startRide } from "@/lib/actions/users.action";
import { helpers } from "@/lib/utils";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import moment from "moment";
import Link from "next/link";
import React from "react";

interface RideCardProps {
  ride: IRide;
  userId?: string;
  options?: {
    from: string;
    type: string[];
  };
}

const RideCard: React.FC<RideCardProps> = async ({
  ride,
  userId,
  options = { from: "none", type: [] },
}) => {
  const showStartEvent = () => {
    const start = moment(new Date(JSON.parse(ride.start_date)))
      .hour(5)
      .minute(0);
    const end = moment(new Date(JSON.parse(ride.start_date)))
      .hour(8)
      .minute(0);
    return moment().isBetween(start, end);
  };

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
      shadow="lg"
      key={ride.uuid}
    >
      <CardHeader>
        <div>
          <Link href={`/events/${ride.uuid}`}>
            <p
              className={`text-secondary ${
                options.from === "none" ? "text-base" : "text-sm"
              } lg:text-lg font-semibold`}
            >
              {ride.title}
            </p>
          </Link>
          <p className=" text-tiny line-clamp-2">{ride.summary}</p>
        </div>
      </CardHeader>
      <Link href={`/events/${ride.uuid}`}>
        <Image alt={ride.title} className="object-cover" src={ride.thumbnail} />
      </Link>
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        {options.from === "none" && (
          <p className="text-tiny md:text-sm text-white/80">
            <span className="mr-1">Expedition Start Date:</span>
            {helpers.formatDate(JSON.parse(ride.start_date))}
          </p>
        )}
        {options.from === "none" ? (
          <Button
            as={Link}
            href={`/events/${ride.uuid}`}
            color="primary"
            size="sm"
          >
            Join Now
          </Button>
        ) : ride.status === 'ongoing' ? (
          <p className="text-tiny md:text-sm text-white/80 mx-auto">Ongoing</p>
        ) : showStartEvent() ? (
          <StartRideButton rideId={ride.uuid} userId={userId!} />
        ) : (
          <p className="text-tiny md:text-sm text-white/80 mx-auto">
            <span className="mr-1">Expedition Start Date:</span>
            {helpers.formatDate(JSON.parse(ride.start_date))}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default RideCard;
