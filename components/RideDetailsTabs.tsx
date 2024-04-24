"use client";
import {
  Tabs,
  Tab,
  Button,
  Avatar,
  Divider,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ScrollShadow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import axios from "axios";
import { constants, helpers } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VikinXText from "./common/VikinXText";
import QuickEnrollForm from "./forms/QuickEnrollForm";
// import Confetti from "./ui/Confetti";

interface RideDetailsTabsProps {
  description: string;
  rideId: string;
  ridersJoined: {
    joined_at: any;
    user_id: string;
    name: string;
    profile_picture: string;
  }[];
  user: {
    user_id: string;
    status: boolean;
    onboarding: boolean;
    state: string;
    name: string;
    profile_picture: string;
    mobile: string;
    emergency_number: string;
  };
  rules: string;
}

const RideDetailsTabs: React.FC<RideDetailsTabsProps> = ({
  description,
  rideId,
  ridersJoined,
  user,
  rules,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [riderIds, setRiderIds] = useState<string[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: quickEnrollModalIsOpen,
    onOpen: quickEnrollModalOnOpen,
    onOpenChange: quickEnrollModalOnOpenChange,
  } = useDisclosure();

  const enroll = async () => {
    if (!user.user_id) {
      router.push(
        `/sign-in?redirect_url=${process.env.NEXT_PUBLIC_API_URL}/events/${rideId}`
      );
      return;
    }

    if (!user.mobile && !user.emergency_number) {
      quickEnrollModalOnOpen();
      // router.push(`/onboarding?enroll=true&eventId=${rideId}`);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<{ message: string }>("/api/rides", {
        joined_at: Date.now(),
        user_id: user.user_id,
        name: user.name,
        profile_picture: user.profile_picture,
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

  useEffect(() => {
    const ids = ridersJoined.map((rider) => rider.user_id);
    setRiderIds(ids);
  }, []);

  return (
    <>
      <div className="text-center">
        {(!user.mobile && !user.emergency_number) ||
        constants.allowedStates.includes(user.state.toLowerCase()) ||
        !user.user_id ? (
          <>
            {riderIds.includes(user.user_id) || show ? (
              <p className="text-success bg-gray-800 p-4 rounded">
                Already Enrolled!
              </p>
            ) : (
              <>
                <Divider />
                <p className="my-2 text-xs">
                  By enrolling, you acknowledge and consent to abide by the
                  established
                  <span
                    onClick={onOpen}
                    className="text-primary underline cursor-pointer ml-1 font-semibold"
                  >
                    guidelines and regulations.
                  </span>
                </p>
                <Button
                  color="primary"
                  variant="flat"
                  className="w-full md:w-auto"
                  isLoading={loading}
                  onClick={enroll}
                >
                  Enroll Now
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <p className="bg-gray-800 p-4 rounded text-left text-small space-y-4">
              <span className="block">Dear {user.name},</span>
              <span className="block">
                Thank you for your interest in our services. We regret to inform
                you that our operations have not yet expanded to your state. We
                understand this may cause inconvenience, and we sincerely
                apologize for any disappointment this may cause.
              </span>
              <span className="block">
                Please rest assured that we are continuously working to broaden
                our reach. We will promptly notify you as soon as our services
                become available in your area.
              </span>
              <span className="block">
                We appreciate your patience and look forward to the opportunity
                to serve you in the future.
              </span>
              <span className="block">
                <span className="block">Warm regards,</span>
                <span className="block">
                  Team <VikinXText />
                </span>
              </span>
            </p>
          </>
        )}
      </div>
      <Tabs variant="underlined" color="primary" aria-label="Tabs radius">
        <Tab key="Ride Details" title="Ride Details" className="px-4">
          {parse(description)}
        </Tab>
        <Tab key="Riders Joined" title="Riders Joined" className="px-4">
          {ridersJoined.map((rider) => (
            <div
              key={rider.user_id}
              className="flex items-center justify-between bg-slate-900 p-2 rounded-md mb-3"
            >
              <Link href={`/profile/${rider.user_id}`}>
                <div className="flex items-center space-x-4">
                  <Avatar src={rider.profile_picture} />
                  <p>{rider.user_id === user.user_id ? "You" : rider.name}</p>
                </div>
              </Link>
              <div>
                <small className="text-xs text-gray-500">
                  <span className="mr-1">Joining Date:</span>
                  {helpers.formatDate(rider.joined_at)}
                </small>
              </div>
            </div>
          ))}
        </Tab>
      </Tabs>
      {/* {show && <Confetti />} */}

      {/* rules regulations modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Guidelines
              </ModalHeader>
              <ScrollShadow className="max-h-[500px]">
                <ModalBody>{parse(rules)}</ModalBody>
              </ScrollShadow>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* rules regulations modal */}

      {/* quick enroll modal */}
      <Modal
        isOpen={quickEnrollModalIsOpen}
        onOpenChange={quickEnrollModalOnOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Just there!
              </ModalHeader>
              <ModalBody>
                <QuickEnrollForm user={user} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* quick enroll modal */}
    </>
  );
};

export default RideDetailsTabs;
