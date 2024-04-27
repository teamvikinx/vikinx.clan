"use client";

import { helpers } from "@/lib/utils";
import {
  Link,
  Card,
  CardHeader,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface EventCardProps {
  rides: string;
}

const EventCards: React.FC<EventCardProps> = ({ rides }) => {
  const [selectedEvents, setSelectedEvents] = useState<IRide[]>([]);

  const onSelectValueChange = (eventType: any) => {
    const _rides = (JSON.parse(rides) as IRide[]).filter(
      (x) => x.status === eventType.values().next().value?.toLowerCase()
    );

    setSelectedEvents(_rides);
  };

  useEffect(() => {
    const _rides = (JSON.parse(rides) as IRide[]).filter(
      (x) => x.status === "active"
    );

    setSelectedEvents(_rides);
  }, []);

  return (
    <>
      <div>
        <Select
          label="Select Event Type"
          className="max-w-xs"
          onSelectionChange={onSelectValueChange}
          size="sm"
          defaultSelectedKeys={["active"]}
        >
          {[
            { name: "Upcoming", value: "active" },
            { name: "Ongoing", value: "ongoing" },
            { name: "Completed", value: "completed" },
          ].map((x) => (
            <SelectItem key={x.value} value={x.value} className="capitalize">
              {x.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      {selectedEvents.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedEvents.map((ride) => (
            <Link key={ride.uuid} href={`/events/${ride.uuid}`}>
              <Card
                isPressable
                className="border-primary  border-l-8 rounded-none h-[200px] w-full"
              >
                <CardHeader className="absolute z-10 bottom-0 flex-col !items-start backdrop-blur-sm bg-white/500 rounded-none">
                  <div className="flex justify-between items-center w-full">
                    <div className="text-left">
                      <p className="text-tiny text-secondary-200 uppercase font-semibold">
                        {helpers.formatDate(JSON.parse(ride.start_date))}
                      </p>
                      <h4 className="text-white font-medium text-xl">
                        {ride.title}
                      </h4>
                    </div>
                  </div>
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
      ) : (
        <p className="subtitle">No Events Found!</p>
      )}
    </>
  );
};

export default EventCards;
