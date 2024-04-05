"use client";
import { Tabs, Tab, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Confetti from "react-confetti";
import axios from "axios";
import { helpers } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useWindowDimensions from "@/hooks/use-window-dimensions";

interface RideDetailsTabsProps {
  description: string;
  rideId: string;
  ridersJoined: string[];
  user: {
    user_id: string;
    status: boolean;
    onboarding: boolean;
    state: string;
  };
}

const RideDetailsTabs: React.FC<RideDetailsTabsProps> = ({
  description,
  rideId,
  ridersJoined,
  user,
}) => {
  const router = useRouter();
  const { height, width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const enroll = async () => {
    if (!user.user_id) {
      router.push("/sign-in");
      return;
    }

    if (!user.onboarding) {
      router.push("/onboarding");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<{ message: string }>("/api/rides", {
        joined_at: Date.now(),
        user_id: user.user_id,
        ride_id: rideId,
      });

      if (response.data.message) {
        setShow(true);
        helpers.toastify(response.data.message, "success");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      helpers.toastify("Something went wrong, Please try again!", "error");
    }
  };

//   useEffect(() => {
//     if (show) {
//       setTimeout(() => {
//         setShow(false);
//       }, 3000);
//     }
//   }, [show]);
  return (
    <>
      <div className="text-center">
        {ridersJoined.includes(user.user_id) ? (
          <p className="text-success bg-gray-800 p-4 rounded">
            Already Enrolled!
          </p>
        ) : (
          <Button
            color="primary"
            variant="flat"
            className="w-full md:w-auto"
            isLoading={loading}
            onClick={enroll}
          >
            Enroll Now
          </Button>
        )}
      </div>
      <Tabs variant="underlined" color="primary" aria-label="Tabs radius">
        <Tab key="Ride Details" title="Ride Details" className="px-4">
          {parse(description)}
        </Tab>
        <Tab key="Riders Joined" title="Riders Joined" className="px-4">
          <p>Test</p>
        </Tab>
      </Tabs>
      <Confetti run={show} numberOfPieces={500} recycle={false} width={width} height={height} />
    </>
  );
};

export default RideDetailsTabs;
