import React from "react";
import { twMerge } from "tailwind-merge";
import { Container } from "./Grid";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Section = ({ className, children }: Props) => {
  return <Container className={twMerge("", className)}>{children}</Container>;
};

export default Section;
