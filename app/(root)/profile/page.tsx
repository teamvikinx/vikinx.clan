import UserAccountProfile from "@/components/forms/UserAccountProfile";
import { fetchUser } from "@/lib/actions/users.action";
import { currentUser } from "@clerk/nextjs";
import { Button, Link } from "@nextui-org/react";
import { Edit2Icon } from "lucide-react";
import React from "react";

async function fetchUserData() {
  const user = await currentUser();
  let userInfo;

  if (user) {
    userInfo = await fetchUser(user.id);
  }

  const userData = {
    name: userInfo?.name || `${user?.firstName} ${user?.lastName}`,
    aka: userInfo?.aka || "",
    mobile: userInfo?.mobile || "",
    emergency_number: userInfo?.emergency_number || "",
    email: userInfo?.email || user?.emailAddresses[0].emailAddress,
    bio: userInfo?.bio || "",
    profile_picture: userInfo?.profile_picture || user?.imageUrl,
    bikes: userInfo?.bikes || [],
    dob: userInfo?.dob || user?.birthday,
    user_id: userInfo?.user_id || user?.id,
    socials: userInfo?.socials || {},
    blood_group: userInfo?.blood_group || "",
    rides_joined: userInfo?.rides_joined || [],
    status: userInfo?.status,
    onboarding: userInfo?.onboarding,
    state: userInfo?.state || "",
  };

  return userData as IUser;
}

const Page = async () => {
  const user = await fetchUserData();

  return (
    <main className="space-y-8 mb-12">
      <div className="text-center">
        <h1 className="title">Your Profile</h1>
      </div>
      <UserAccountProfile userData={user} edit={true} />
    </main>
  );
};

export default Page;
