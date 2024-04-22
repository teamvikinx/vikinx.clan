"use client";

import { helpers } from "@/lib/utils";
import { Tabs, Tab, ScrollShadow, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AnnouncementCard from "./common/cards/AnnouncementCard";
import CardFullSkeleton from "./common/skeletons/CardFullSkeleton";
import { Search } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";

const AnnouncementsTabs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementsFiltered, setAnnouncementsFiltered] = useState<
    Announcement[]
  >([]);
  const [activeTab, setActiveTab] = useState<React.Key>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const getAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/announcements`,
        {
          cache: "no-cache",
        }
      );

      const data = await res.json();

      setAnnouncements(data.data);
      setAnnouncementsFiltered(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      helpers.toastify(
        "Something went wrong while fetching announcements, Please try again later.",
        "error"
      );
    }
  };

  const filterAnnouncements = (key: React.Key) => {
    setActiveTab(key);
    setSearchTerm("");
    if (key === "all") {
      setAnnouncementsFiltered(announcements);
    } else {
      setAnnouncementsFiltered(announcements.filter((x) => x.type === key));
    }
  };

  const onSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setAnnouncementsFiltered(
        announcements.filter((x) => {
          if (activeTab === "all") {
            return x.title
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase());
          } else {
            return (
              x.title
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase()) &&
              x.type === activeTab
            );
          }
        })
      );
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <>
      <div className="searchbar">
        <Input
          type="text"
          placeholder="Type to search by title..."
          onValueChange={onSearch}
          value={searchTerm}
          startContent={
            <div className="pointer-events-none flex items-center">
              <Search size={16} />
            </div>
          }
        />
      </div>
      <Tabs
        variant="underlined"
        color="primary"
        aria-label="Tabs radius"
        onSelectionChange={filterAnnouncements}
      >
        <Tab key="all" title="All" className="px-4 !mt-0">
          {loading ? (
            <CardFullSkeleton />
          ) : (
            <ScrollShadow className="h-[400px] pr-2 lg:pr-4 scroll-smooth snap-y ">
              {announcementsFiltered.map((x) => (
                <div className="snap-center" key={x.announcement_id}>
                  <AnnouncementCard announcment={x} />
                </div>
              ))}
            </ScrollShadow>
          )}
        </Tab>
        <Tab key="news" title="News" className="px-4 !mt-0">
          {loading ? (
            <CardFullSkeleton />
          ) : (
            <ScrollShadow className="h-[400px] pr-2 lg:pr-4 scroll-smooth snap-y ">
              {announcementsFiltered.map((x) => (
                <div className="snap-center" key={x.announcement_id}>
                  <AnnouncementCard announcment={x} />
                </div>
              ))}
            </ScrollShadow>
          )}
        </Tab>
        <Tab key="event" title="Events" className="px-4 !mt-0">
          {loading ? (
            <CardFullSkeleton />
          ) : (
            <ScrollShadow className="h-[400px] pr-2 lg:pr-4 scroll-smooth snap-y ">
              {announcementsFiltered.map((x) => (
                <div className="snap-center" key={x.announcement_id}>
                  <AnnouncementCard announcment={x} />
                </div>
              ))}
            </ScrollShadow>
          )}
        </Tab>
      </Tabs>
    </>
  );
};

export default AnnouncementsTabs;
