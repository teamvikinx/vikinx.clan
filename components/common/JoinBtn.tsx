"use client";
import { User } from "@clerk/nextjs/server";
import { Button, ButtonVariantProps, Link } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import React from "react";

interface JoinBtnProps {
  user: User | null;
  buttonTitle: string;
  link?: string;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "lg" | "md";
}

const JoinBtn: React.FC<JoinBtnProps> = ({
  user,
  buttonTitle,
  link = "sign-up",
  variant = "solid",
  color = "primary",
  size = "md",
}) => {
  const params = useSearchParams();

  return (
    <>
      {Boolean(params.get("social")) ? (
        <Button
          as={Link}
          color={color}
          href={user ? "/events" : link}
          variant={variant}
          radius="sm"
          size={size}
          className="!w-[150px]  font-semibold uppercase"
          target="_blank"
          download
        >
          {buttonTitle}
        </Button>
      ) : (
        <Button
          as={Link}
          color={color}
          href={user ? "/events" : link}
          variant={variant}
          radius="sm"
          size={size}
          className="!w-[150px]  font-semibold uppercase"
          target="_blank"
        >
          {buttonTitle}
        </Button>
      )}
    </>
  );
};

export default JoinBtn;
