"use client";

import { UserProfile, useAuth } from "@clerk/nextjs";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
  ScrollShadow,
} from "@nextui-org/react";
import {
  Edit3Icon,
  EyeIcon,
  EyeOffIcon,
  LogOutIcon,
  Settings2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { helpers } from "@/lib/utils";

interface UserProfileActionsProps {
  user: IUser;
}

const UserProfileActions: React.FC<UserProfileActionsProps> = ({ user }) => {
  const { signOut } = useAuth();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [hiddenDetails, setHiddenDetails] = useState(user.hide_details);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    signOut();
    router.push("/");
  };

  const togglePersonalDetailsVisibility = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post<{ message: string }>(
        "/api/users/hide-personal-details",
        {
          hide_details: !!!user?.hide_details,
          user_id: user.user_id,
        }
      );

      if (data && data.message) {
        setHiddenDetails(!!!user?.hide_details);
        helpers.toastify(data.message, "success");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      helpers.toastify("Something went wrong!");
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <h2 className="subtitle">Actions</h2>
          <div className="mb-6 grid md:grid-cols-2 gap-4">
            <Button
              onClick={() => router.push(`/onboarding?edit=${true}`)}
              size="sm"
              color="secondary"
              variant="flat"
            >
              <Edit3Icon size={16} /> Edit Details
            </Button>
            <Button
              isLoading={loading}
              onClick={togglePersonalDetailsVisibility}
              size="sm"
              color="secondary"
              variant="flat"
            >
              {hiddenDetails ? (
                <>
                  <EyeIcon size={16} /> Show Personal Details
                </>
              ) : (
                <>
                  <EyeOffIcon size={16} /> Hide Personal Details
                </>
              )}
            </Button>
          </div>
          <div className="mb-6 grid md:grid-cols-2 gap-4">
            <Button
              onClick={() => onOpen()}
              size="sm"
              color="secondary"
              variant="flat"
            >
              <Settings2 size={16} /> Other Details
            </Button>
            <Button onClick={logout} size="sm" color="primary" variant="flat">
              <LogOutIcon size={16} /> Signout
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* other details */}
      <Modal size={"5xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="px-0 lg:pl-8">
                <ScrollShadow className="h-[500px] lg:h-full w-fit">
                  <UserProfile
                    appearance={{
                      elements: {
                        profileSection__danger: "hidden",
                        navbar: "hidden",
                        navbarMobileMenuRow: "hidden",
                      },
                    }}
                  />
                </ScrollShadow>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* other details */}
    </>
  );
};

export default UserProfileActions;
