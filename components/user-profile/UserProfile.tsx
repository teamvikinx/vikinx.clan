import { Card, CardBody, Avatar, Badge, Chip, Image } from "@nextui-org/react";
import React from "react";
import Socials from "../common/Socials";
import UserProfileActions from "./UserProfileActions";
import { helpers } from "@/lib/utils";
import UserEvents from "./UserEvents";

interface UserProfileProps {
  user: IUser;
  viewProfile?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  viewProfile = false,
}) => {
  return (
    <section className="max-w-[900px] mx-auto space-y-8">
      <Card>
        <CardBody className="lg:p-6">
          <div className="grid lg:grid-cols-3">
            <div className="justify-self-center self-center py-6 lg:py-0">
              {user.is_original ? (
                <Badge
                  content={
                    <Image
                      src="/vikinx-short-og.webp"
                      width={40}
                      alt="vikinx-og-short-logo"
                      className="py-1"
                    />
                  }
                >
                  <Avatar
                    src={user.profile_picture}
                    className="w-32 h-32 border border-white"
                  />
                </Badge>
              ) : (
                <Avatar
                  src={user.profile_picture}
                  className="w-32 h-32 border border-white"
                />
              )}
            </div>
            <div className="lg:col-span-2 space-y-2 text-center lg:text-start">
              {/* username */}
              <h1 className="text-2xl md:text-3xl font-semibold">
                {user.name}
                {user.aka && (
                  <span className="text-gray-500 text-lg md:text-xl lg:text-2xl font-medium block lg:inline ml-1">
                    (AKA {user.aka})
                  </span>
                )}
              </h1>
              {/* username */}

              <div className="space-y-2 md:space-y-0 md:space-x-2">
                {/* city */}
                <small className="text-gray-500 block md:inline-block">
                  {user.city}, {user.state}
                </small>
                {/* city */}
                <span className="hidden md:inline-block text-xs text-gray-500">
                  |
                </span>
                {/* joining date */}
                <small className="text-gray-500 block md:inline-block">
                  Member Since {helpers.formatDate(user.joined_at)}
                </small>
                {/* joining date */}
              </div>

              {/* bio */}
              <p className="text-sm text-justify">{user.bio}</p>
              {/* bio */}

              {/* bikes */}
              <div className="space-x-2 space-y-2 lg:space-y-0">
                {user.bikes?.map((bike) => (
                  <Chip size="sm" key={bike.name} color="primary" variant="dot">
                    {bike.name} {bike.pet_name && `(AKA ${bike.pet_name})`}
                  </Chip>
                ))}
              </div>
              {/* bikes */}

              {/* socials */}
              <Socials {...user.socials} />
              {/* socials */}
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardBody className="text-start">
            <h2 className="subtitle">Personal Details</h2>
            <div className="text-sm space-y-1">
              {!viewProfile || !user.hide_details ? (
                <>
                  <p>
                    <span className="font-semibold text-gray-500 mr-1">
                      Email:
                    </span>
                    {user.email}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-500 mr-1">
                      Mobile:
                    </span>
                    {user.mobile}
                  </p>
                </>
              ) : (
                <></>
              )}
              <p>
                <span className="font-semibold text-gray-500 mr-1">
                  Emergency Mobile:
                </span>
                {user.emergency_number}
              </p>
              <p>
                <span className="font-semibold text-gray-500 mr-1">State:</span>
                {user.state}
              </p>
              <p>
                <span className="font-semibold text-gray-500 mr-1">
                  Blood Group:
                </span>
                {user.blood_group}
              </p>
            </div>
          </CardBody>
        </Card>

        {!viewProfile && <UserProfileActions user={user} />}
      </div>
      <UserEvents userEventsIds={user.rides_joined} userId={user.user_id} />
    </section>
  );
};

export default UserProfile;
