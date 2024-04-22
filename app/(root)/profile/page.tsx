import UserProfile from "@/components/user-profile/UserProfile";
import { fetchUser } from "@/lib/actions/users.action";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "VikinX | User Profile",
  openGraph: {
    title: "VikinX | User Profile",
    url: "https://vikinx.in/profile",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
  twitter: {
    title: "VikinX | User Profile",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
};

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
    bikes: userInfo?.bikes || [],
    dob: userInfo?.dob || user?.birthday,
    user_id: userInfo?.user_id || user?.id,
    socials: userInfo?.socials || {},
    blood_group: userInfo?.blood_group || "",
    rides_joined: userInfo?.rides_joined || [],
    status: userInfo?.status,
    onboarding: userInfo?.onboarding,
    state: userInfo?.state || "",
    profile_picture: user?.hasImage ? user.imageUrl : user?.firstName,
    hide_details: userInfo?.hide_details,
    is_original: userInfo?.is_original,
    city: userInfo?.city,
    address: userInfo?.address,
    pincode: userInfo?.pincode,
    gender: userInfo?.gender
  };

  return userData as IUser;
}

const Page = async () => {
  const user = await fetchUserData();

  if(!user.onboarding) {
    redirect('/onboarding');
    return
  }

  return (
    <main className="py-8 space-y-8">
      <UserProfile user={user} />
    </main>
  );
};

export default Page;
