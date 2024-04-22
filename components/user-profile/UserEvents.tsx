import { getEventsByIds } from "@/lib/actions/rides.action";
import React from "react";
import RideCard from "../common/cards/RideCard";

interface UserEventsProps {
  userEventsIds: { joined_at: any; ride_id: string }[];
}

const UserEvents: React.FC<UserEventsProps> = async ({ userEventsIds }) => {
  const events = await getEventsByIds(userEventsIds.map((e) => e.ride_id));
  const enrolled = events[0]
    ? events.filter((e) => e?.status === "active")
    : [];
  const completed = events[0]
    ? events.filter((e) => e?.status === "completed")
    : [];

  return (
    <section className="w-full space-y-8">
      <div>
        <h1 className="subtitle">Enrolled Events</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3">
          {enrolled[0] ? (
            enrolled.map((event) => (
              <RideCard
                ride={event!}
                key={event!.uuid}
                options={{ from: "profile", type: "enrolled" }}
              />
            ))
          ) : (
            <p className="paragraph">No events enrolled yet!</p>
          )}
        </div>
      </div>
      <div>
        <h1 className="subtitle">Completed Events</h1>
        {completed[0] ? (
          completed.map((event) => (
            <RideCard
              ride={event!}
              key={event!.uuid}
              options={{ from: "profile", type: "completed" }}
            />
          ))
        ) : (
          <p className="paragraph">No events enrolled yet!</p>
        )}
      </div>
    </section>
  );
};

export default UserEvents;
