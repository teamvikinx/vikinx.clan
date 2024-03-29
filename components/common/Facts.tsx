"use client";
import { facts } from "@/lib/utils";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { Shuffle } from "lucide-react";
import React, { useEffect, useState } from "react";

let interval: any;

const Facts = () => {
  const [fact, setFact] = useState<{
    fact: string;
    source: string;
    index: number;
  }>({ ...facts[0], index: 1 });

  const shuffleFacts = () => {
    setFact({
      ...facts[Math.floor(Math.random() * facts.length)],
      index: Math.floor(Math.random() * facts.length),
    });
  };

  useEffect(() => {
    interval = setInterval(() => {
      shuffleFacts();
    }, 10000);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="title">
          Did You <span className="text-primary">Know?</span>
        </h1>
      </div>
      <div className="lg:w-[700px] mx-auto">
        <Card className="paragraph p-8 lg:p-10">
          <div className="h-[200px] lg:h-[150px] text-justify ">
            {fact.fact}
          </div>
          <div className="mb-4 flex justify-between items-center text-tiny">
            <span>Source: {fact.source}</span>
            <span>
              {fact.index + 1} / {facts.length}
            </span>
          </div>
          <Button variant="flat" color="primary" onClick={shuffleFacts}>
            <Shuffle />
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Facts;
