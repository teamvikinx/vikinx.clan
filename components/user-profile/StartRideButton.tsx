"use client";

import { startRide } from "@/lib/actions/users.action";
import { helpers } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

interface StartRideButtonInterface {
  rideId: string;
  userId: string;
}

const StartRideButton: React.FC<StartRideButtonInterface> = ({
  rideId,
  userId,
}) => {
  const [loading, setLoading] = useState(false);

  const onStartRide = async () => {
    try {
      await startRide({ ride_id: rideId, user_id: userId });
      helpers.toastify("Event started sucessfully!", "success");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      helpers.toastify(
        "Something went wrong while starting the event, Please try again!",
        "error"
      );
    }
  };

  return (
    <>
      <Button
        color="primary"
        size="sm"
        className="w-full"
        onClick={onStartRide}
        isLoading={loading}
      >
        Start Ride
      </Button>
    </>
  );
};

export default StartRideButton;
