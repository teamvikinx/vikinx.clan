import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

interface TextCardProps {
  item: { title: string; content: string };
  className?: string
}

const TextCard: React.FC<TextCardProps> = ({ item, className }) => {
  return (
    <Card className={`${className} p-4 space-y-2`}>
      <p className="text-secondary font-semibold text-sm lg:text-base">
        {item.title}
      </p>
      <p className="text-xs lg:text-base">{item.content}</p>
    </Card>
  );
};

export default TextCard;
