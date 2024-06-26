import UserAccountProfile from "@/components/user-profile/UserAccountProfile";
import { fetchUser } from "@/lib/actions/users.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
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
    state: userInfo?.state,
    city: userInfo?.city,
    address: userInfo?.address,
    pincode: userInfo?.pincode,
    gender: userInfo?.gender
  };

  return userData as IUser;
}

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const user = await fetchUserData();

  if (user && user.onboarding && !searchParams.edit) {
    redirect("/");
  }

  return (
    <div>
      <span>
        <Link href={"/"} className="flex justify-center">
          <Image
            src={"/vikinx-logo.webp"}
            width={150}
            height={200}
            alt="vikinx-logo"
          />
        </Link>
        <div className="text-center mb-8">
          {searchParams.edit ? (
            <h1 className="title">Edit Profile Details</h1>
          ) : (
            <>
              <h1 className="title">Onboarding</h1>
              <p className="subtitle">Let your jounery begin!</p>
            </>
          )}
        </div>
        <UserAccountProfile userData={user} edit={!!searchParams.edit} />
      </span>
    </div>
  );
};

export default Page;
