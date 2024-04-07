import AnnouncementsTabs from "@/components/AnnouncementsTabs";
import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";

const Page = () => {
  return (
    <main className="py-8">
      <Card className="max-w-[900px] mx-auto !rounded-b-none">
        <CardBody className="p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={"announcements-hero-image"}
            className="w-full object-cover object-center h-[200px] lg:h-[250px] !rounded-b-none"
            src="/announcements.webp"
          />

          <div className="px-2 space-y-4">
            <h1 className="title">Announcements</h1>

            <AnnouncementsTabs />
          </div>
        </CardBody>
      </Card>
    </main>
  );
};

export default Page;
