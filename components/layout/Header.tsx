"use client";

import { constants } from "@/lib/utils";
import React, { useState } from "react";
import Image from "next/image";
import { CircleUser, RadioTower, User2 } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Header = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="z-[99999]">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image
            src={"/vikinx-logo.png"}
            width={100}
            height={200}
            alt="vikinx-logo"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {constants.navLinks.map((item) => {
          const isSelected =
            (pathname.includes(item.path) && item.path.length > 1) ||
            pathname === item.path;
          return (
            <NavbarItem
              key={item.title}
              className="data-[active=true]:text-primary-500 data-[active=true]:font-bold"
            >
              <Link color="foreground" href={item.path}>
                {item.title}
                {isSelected && (
                  <motion.div className="absolute -bottom-[1px] left-0 right-0 h-[1px]">
                    <svg width="37" height="8" viewBox="0 0 37 8" fill="none">
                      <motion.path
                        d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
                        stroke="#ff3131"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{
                          strokeDasharray: 84.20591735839844,
                          strokeDashoffset: 84.20591735839844,
                        }}
                        animate={{
                          strokeDashoffset: 0,
                        }}
                        transition={{
                          duration: 1,
                        }}
                      />
                    </svg>
                  </motion.div>
                )}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <SignedOut>
          <NavbarItem>
            <Button as={Link} color="secondary" href="/sign-in" variant="bordered">
              Sign In
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="secondary" href="/sign-up" variant="solid">
              Sign Up
            </Button>
          </NavbarItem>
        </SignedOut>
        <SignedIn>
          <span className="flex  items-center ml-6 space-x-4">
            <Button
              size={"sm"}
              color="secondary"
              variant="flat"
              as={Link}
              href={"/announcements"}
            >
              <RadioTower size={18} />
            </Button>
            <UserButton afterSignOutUrl="/" />
          </span>
        </SignedIn>
      </NavbarContent>
      <NavbarMenu className="py-8">
        {constants.navLinks.map((item, index) => (
          <NavbarMenuItem key={`${item.title}-${index}`}>
            <Link
              color={"foreground"}
              className="w-full"
              href={item.path}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;