import { Button, Divider, Image, Link } from "@nextui-org/react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";
import NewsLetter from "../forms/NewsLetter";
import VikinXText from "../common/VikinXText";

const Footer = () => {
  return (
    <footer className="bg-[#181818]">
      <div className="container mx-auto px-4 pb-8 md:px-6 lg:px-8 ">
        <div className="grid justify-center items-center lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start lg:ml-4">
              <Image src={"/vikinx-logo.webp"} width={200} alt="vikinx-logo" />
            </div>
            <p className="md:!w-[300px] mb-6 paragraph">
              <VikinXText /> is not just a name; it’s a promise of a new dawn in
              riding and brotherhood.
            </p>
            <div className="space-x-4 lg:justify-self-end">
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
            </div>
          </div>
          <div className="justify-self-center text-center lg:text-left mt-8 lg:mt-0 lg:justify-self-end">
            <div>
              <Link className="block text-slate-500" href="/">
                Home
              </Link>
              <Link className="block text-slate-500" href="/about">
                About
              </Link>
              <Link className="block text-slate-500" href="/events">
                Events
              </Link>
              <Link className="block text-slate-500" href="/gallery">
                Gallery
              </Link>
              <Link className="block text-slate-500" href="/articles">
                Articles
              </Link>
              <Link className="block text-slate-500" href="/your-story">
                Rider Diaries
              </Link>
              <Link className="block text-slate-500" href="/contact">
                Contact
              </Link>
              <Link className="block text-slate-500" href="/announcements">
                Announcements
              </Link>
              <Link className="block text-slate-500" href="/your-story">
                Your Story
              </Link>
            </div>
          </div>
        </div>
        <Divider className="my-8" />
        <NewsLetter />
      </div>
      <div className="bg-[#1f1f1f] p-6 text-tiny text-center lg:text-left space-y-2 lg:space-y-0 lg:flex lg:justify-between lg:items-center">
        <p>
          VIKIN<span className="text-primary font-bold">X</span> ©{" "}
          {new Date().getFullYear()} ALL RIGHTS RESERVED.
        </p>
        <div className="space-x-4">
          <Link
            className="text-tiny text-slate-500"
            href="/terms-and-conditions"
          >
            TERMS AND CONDITIONS
          </Link>
          <span>|</span>
          <Link className="text-tiny text-slate-500" href="/privacy-policy">
            PRIVACY POLICY
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
