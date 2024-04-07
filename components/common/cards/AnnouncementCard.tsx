import { helpers } from "@/lib/utils";
import { Button, Divider } from "@nextui-org/react";
import { BookOpenCheck } from "lucide-react";
import React from "react";

interface AnnouncementCardProps {
  announcment: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcment }) => {
  return (
    <div className="grid grid-cols-12 my-6 items-center bg-slate-900 border border-slate-700 p-4 rounded">
      <p className="text-gray-400 text-xs col-span-12 lg:col-span-1 mb-2">
        {helpers.formatDateForDisplay(
          new Date(JSON.parse(announcment.announced_at))
        )}
      </p>
      <Divider
        orientation="vertical"
        className="justify-self-center hidden lg:flex"
      />
      <div className="col-span-12 lg:col-span-10">
        <h4 className="font-semibold mb-2">{announcment.title}</h4>
        <p className="text-xs text-gray-400">{announcment.message}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
