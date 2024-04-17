import Socials from "@/components/common/Socials";
import ContactForm from "@/components/forms/ContactForm";
import { fetchUser } from "@/lib/actions/users.action";
import { socials } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { Button, Card, Chip, Image, Link } from "@nextui-org/react";
import { Facebook, Instagram, MailIcon, Twitter } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "VikinX | Contact",
  openGraph: {
    title: "VikinX | Contact",
    url: "https://vikinx.in/contact",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
  twitter: {
    title: "VikinX | Contact",
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
    name:
      userInfo?.name || user?.firstName
        ? `${user?.firstName} ${user?.lastName}`
        : "",
    mobile: userInfo?.mobile || "",
    email: userInfo?.email || user?.emailAddresses[0].emailAddress,
  };

  return userData as IUser;
}

const Page = async () => {
  const userDetails = await fetchUserData();

  return (
    <main>
      <section className="py-8">
        <Card className="grid lg:grid-cols-3 lg:gap-4 items-center">
          <div className="hidden lg:flex">
            <Image
              src="/contact.webp"
              alt="dominar-400"
              className="w-full grayscale rounded-r-none"
            />
          </div>
          <div className="lg:col-span-2 p-4 lg:p-8">
            <div className="text-center mb-6">
              <h1 className="title">Get in touch</h1>
              <p>
                Hi{userDetails.name ? " " + userDetails.name.split(" ")[0] : ""}
                , We are here for you! How can we help?
              </p>
            </div>
            <ContactForm userData={userDetails} />
            <div className="flex justify-center items-center">
              <Socials {...socials} />
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Page;
