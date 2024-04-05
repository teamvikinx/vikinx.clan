import { helpers } from "@/lib/utils";
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface RideCardProps {
  ride: IRide;
}

const RideCard: React.FC<RideCardProps> = ({ ride }) => {
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
            <p className="text-secondary lg:text-lg font-semibold">
              {ride.title}
            </p>
          </Link>
          <p className=" text-tiny line-clamp-2">{ride.summary}</p>
        </div>
      </CardHeader>
      <Link href={`/events/${ride.uuid}`}>
        <Image alt={ride.title} className="object-cover" src={ride.thumbnail} />
      </Link>
      <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-4 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny md:text-sm text-white/80">
          Expedition Start Date:{" "}
          {helpers.formatDate(JSON.parse(ride.start_date))}
        </p>
      </CardFooter>
    </Card>
  );
};

export default RideCard;
