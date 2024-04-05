import ContactForm from "@/components/forms/ContactForm";
import { fetchUser } from "@/lib/actions/users.action";
import { currentUser } from "@clerk/nextjs";
import { Button, Card, Chip, Image } from "@nextui-org/react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

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
              src="/contact.jpg"
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
            <div className="space-x-4 text-center">
              <Button
                href=""
                className="rounded-full"
                size="sm"
                variant="flat"
                color="secondary"
              >
                <Instagram size={14} />
              </Button>
              <Button
                href=""
                className="rounded-full"
                size="sm"
                variant="flat"
                color="secondary"
              >
                <Twitter size={14} />
              </Button>
              <Button
                href=""
                className="rounded-full"
                size="sm"
                variant="flat"
                color="secondary"
              >
                <Facebook size={14} />
              </Button>
              <span className="inline-block mt-4 md:mt-0">
                <Chip size="md" color="secondary" variant="flat">
                  team@vikinx.in
                </Chip>
              </span>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Page;
