"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { triggerTransition } from "@/app/template";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export const TransitionLink = ({
  children,
  href,
  className,
  ...props
}: TransitionLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    triggerTransition(href);
  };

  return (
    <Link {...props} href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};
